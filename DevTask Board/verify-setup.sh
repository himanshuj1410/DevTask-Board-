#!/bin/bash

# DevTask Board - Setup Verification Script
# This script helps verify that everything is set up correctly

echo "🔍 DevTask Board - Setup Verification"
echo "========================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "  Node.js version: $NODE_VERSION"
else
    echo "  ❌ Node.js not found. Please install Node.js v16 or higher."
    exit 1
fi

# Check npm
echo ""
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "  npm version: $NPM_VERSION"
else
    echo "  ❌ npm not found."
    exit 1
fi

# Check PostgreSQL
echo ""
echo "✓ Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    echo "  ✅ PostgreSQL installed"
    echo "  Run 'createdb devtask_board' to create the database"
else
    echo "  ⚠️  PostgreSQL not found. Please install PostgreSQL."
fi

# Check server dependencies
echo ""
echo "✓ Checking server setup..."
if [ -d "server/node_modules" ]; then
    echo "  ✅ Server dependencies installed"
else
    echo "  ⚠️  Server dependencies not installed. Run 'cd server && npm install'"
fi

if [ -f "server/.env" ]; then
    echo "  ✅ Server .env file exists"
else
    echo "  ⚠️  Server .env file not found. Run 'cd server && cp .env.example .env'"
fi

# Check client dependencies
echo ""
echo "✓ Checking client setup..."
if [ -d "client/node_modules" ]; then
    echo "  ✅ Client dependencies installed"
else
    echo "  ⚠️  Client dependencies not installed. Run 'cd client && npm install'"
fi

echo ""
echo "========================================"
echo "✅ Verification complete!"
echo ""
echo "Next steps:"
echo "1. Create PostgreSQL database: createdb devtask_board"
echo "2. Configure server/.env with your database credentials"
echo "3. Run migrations: cd server && npm run prisma:migrate"
echo "4. Start backend: cd server && npm run dev"
echo "5. Start frontend: cd client && npm run dev"
echo "6. Open http://localhost:5173 in your browser"
echo ""
