@echo off
echo Starting SAILUUU App...

echo Starting Backend Server...
start cmd /k "cd backend && npm install && npm start"

echo Starting Frontend...
start cmd /k "cd sailuuu-app && npm run dev"

echo SAILUUU App is starting! Please wait a moment...
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo IMPORTANT: Before using the video message feature, configure your email settings in backend/.env
