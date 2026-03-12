#!/bin/bash

# DevTask Board - Start Script
# This script starts both backend and frontend servers

echo "🚀 Starting DevTask Board..."
echo ""

# Check if both servers are already running
BACKEND_PORT=5000
FRONTEND_PORT=5173

# Try to start backend in background
echo "Starting backend server..."
cd server
npm run dev &
BACKEND_PID=$!
cd ..

sleep 2

# Try to start frontend in background
echo "Starting frontend server..."
cd client
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servers started!"
echo ""
echo "Backend:  http://localhost:$BACKEND_PORT"
echo "Frontend: http://localhost:$FRONTEND_PORT"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
