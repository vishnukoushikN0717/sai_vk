#!/bin/bash

echo "Starting SAILUUU App..."

echo "Starting Backend Server..."
cd backend && npm install && npm start &
BACKEND_PID=$!

echo "Starting Frontend..."
cd sailuuu-app && npm run dev &
FRONTEND_PID=$!

echo "SAILUUU App is starting! Please wait a moment..."
echo ""
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo ""
echo "IMPORTANT: Before using the video message feature, configure your email settings in backend/.env"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
