require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const { sendVideoEmail } = require('./emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Store scheduled messages in memory (in a real app, use a database)
const scheduledMessages = [];

// Schedule checking for messages to send every minute
cron.schedule('* * * * *', async () => {
  console.log('Checking for messages to send...');
  const now = new Date();
  
  for (let i = 0; i < scheduledMessages.length; i++) {
    const message = scheduledMessages[i];
    
    if (!message.delivered && new Date(message.scheduledDate) <= now) {
      console.log(`Sending message: ${message.id}`);
      
      try {
        await sendVideoEmail({
          to: message.recipientEmail,
          subject: message.subject,
          text: message.message,
          videoPath: message.videoPath
        });
        
        // Mark as delivered
        scheduledMessages[i].delivered = true;
        console.log(`Message ${message.id} delivered successfully`);
      } catch (error) {
        console.error(`Error sending message ${message.id}:`, error);
      }
    }
  }
});

// Routes
app.post('/api/schedule', upload.single('video'), (req, res) => {
  try {
    const { recipientEmail, scheduledDate, subject, message } = req.body;
    
    if (!req.file || !recipientEmail || !scheduledDate || !subject) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newMessage = {
      id: Date.now().toString(),
      recipientEmail,
      scheduledDate,
      subject,
      message: message || '',
      videoPath: req.file.path,
      created: new Date().toISOString(),
      delivered: false
    };
    
    scheduledMessages.push(newMessage);
    
    res.status(201).json({
      id: newMessage.id,
      recipientEmail: newMessage.recipientEmail,
      scheduledDate: newMessage.scheduledDate,
      subject: newMessage.subject,
      message: newMessage.message,
      created: newMessage.created,
      delivered: newMessage.delivered
    });
  } catch (error) {
    console.error('Error scheduling message:', error);
    res.status(500).json({ error: 'Failed to schedule message' });
  }
});

app.get('/api/messages', (req, res) => {
  // Return messages without the videoPath for security
  const messages = scheduledMessages.map(({ videoPath, ...rest }) => rest);
  res.json(messages);
});

app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params;
  const index = scheduledMessages.findIndex(msg => msg.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  // Delete the video file
  const videoPath = scheduledMessages[index].videoPath;
  if (fs.existsSync(videoPath)) {
    fs.unlinkSync(videoPath);
  }
  
  // Remove from array
  scheduledMessages.splice(index, 1);
  
  res.json({ message: 'Message deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
