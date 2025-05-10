# SAILUUU Backend

This is the backend service for the SAILUUU app, handling video message scheduling and email delivery.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the email settings:
     - `EMAIL_SERVICE`: Your email service (e.g., gmail)
     - `EMAIL_USER`: Your email address
     - `EMAIL_PASS`: Your email app password (for Gmail, you need to create an app password)
     - `FRONTEND_URL`: URL of your frontend app

   For Gmail:
   - Go to your Google Account > Security
   - Enable 2-Step Verification
   - Create an App Password (select "Mail" and "Other")
   - Use the generated password in your .env file

3. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /api/schedule` - Schedule a new video message
  - Requires multipart/form-data with:
    - `video` (file): The video file
    - `recipientEmail` (string): Recipient's email address
    - `scheduledDate` (string): ISO date string for delivery
    - `subject` (string): Email subject
    - `message` (string, optional): Additional message text

- `GET /api/messages` - Get all scheduled messages

- `DELETE /api/messages/:id` - Delete a scheduled message
