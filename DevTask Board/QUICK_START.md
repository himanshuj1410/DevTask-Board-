# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js v16+ installed
- PostgreSQL installed and running

### Step 1: Setup PostgreSQL Database

```bash
# Create the database
createdb devtask_board
```

### Step 2: Setup Backend Server

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your PostgreSQL credentials
# DATABASE_URL=postgresql://user:password@localhost:5432/devtask_board
# JWT_SECRET=your_secret_key_here

# Run migrations
npm run prisma:migrate

# Start the server
npm run dev
```

✅ Server running on http://localhost:5000

### Step 3: Setup Frontend (in another terminal)

```bash
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend running on http://localhost:5173

### Step 4: Access the App

Open your browser and navigate to: **http://localhost:5173**

### Step 5: Create an Account and Start Using!

1. Click "Sign up" on the login page
2. Create your account
3. Create your first project
4. Start managing tasks with drag and drop!

---

## 📝 Test Credentials (Optional)

If you want to test with existing data, modify `server/prisma/seed.js` and run:
```bash
cd server
npm run prisma:seed
```

---

## 🆘 Common Issues

### Issue: "Can't connect to database"
- Make sure PostgreSQL is running
- Check DATABASE_URL in server/.env
- Verify the database was created: `psql -l`

### Issue: "Port 5000 or 5173 already in use"
- Change PORT in server/.env
- Vite will automatically use the next available port

### Issue: Prisma client error
```bash
cd server
npm run prisma:generate
```

---

## 📚 Key Files

- **Backend**: `server/src/server.js` - Main Express server
- **Frontend**: `client/src/App.jsx` - Main React app
- **Database**: `server/prisma/schema.prisma` - Database schema
- **Styling**: `client/tailwind.config.js` - Tailwind configuration

---

**Need help?** Check the main README.md for detailed documentation!
