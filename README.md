# DevTask Board - Full-Stack Project Management App

A modern, full-stack project management application (mini Trello/Linear) built with React, Node.js, Express, PostgreSQL, and Prisma.

## Features

✨ **Core Features:**
- User authentication with JWT and bcrypt password hashing
- Create, edit, and delete projects
- Kanban board with drag-and-drop tasks
- Task management with priority levels and due dates
- Responsive dark-themed UI
- Real-time toast notifications
- Protected routes and secure API endpoints

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **React Beautiful DnD** - Drag and drop library
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **date-fns** - Date utilities

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma ORM** - Database ORM and migrations
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables


## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all user projects (protected)
- `POST /api/projects` - Create new project (protected)
- `GET /api/projects/:id` - Get project by ID (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Tasks
- `GET /api/tasks/project/:projectId` - Get tasks for project (protected)
- `POST /api/tasks/project/:projectId` - Create task (protected)
- `PUT /api/tasks/:taskId` - Update task (protected)
- `DELETE /api/tasks/:taskId` - Delete task (protected)

## Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)

### Step 1: Setup Backend

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your PostgreSQL credentials:
```
DATABASE_URL=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/devtask_board
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
NODE_ENV=development
```

5. Setup PostgreSQL database:
```bash
# Create database
createdb devtask_board

# Or use psql
psql -U postgres
# In psql shell:
# CREATE DATABASE devtask_board;
```

6. Run Prisma migrations:
```bash
npm run prisma:migrate
```

7. Start the backend server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Step 2: Setup Frontend

1. In a new terminal, navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 3: Access the Application

1. Open your browser and go to `http://localhost:5173`
2. Create a new account or login
3. Start creating projects and managing tasks!

## Usage Guide

### Creating a Project
1. Click the "New Project" button on the dashboard
2. Enter project title, description, and select a color
3. Click "Create Project"

### Opening a Project
1. Click "Open Board" on any project card
2. You'll see the Kanban board with TODO, IN PROGRESS, and DONE columns

### Creating Tasks
1. Click "+ Add Task" button in the Kanban board header
2. Fill in task details (title, description, priority, due date, status)
3. Click "Create Task"

### Moving Tasks
1. Drag any task card to move it between columns
2. The task status will update automatically
3. View the success notification

### Deleting Tasks/Projects
1. Click the "Delete" button on a task or project
2. Confirm the deletion

## Environment Variables

### Server (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/devtask_board
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (uses backend proxy)
No .env file needed - configured in vite.config.js to proxy /api requests to http://localhost:5000

## Development Commands

### Backend
```bash
cd server
npm run dev          # Start development server with nodemon
npm run start        # Start production server
npm run prisma:migrate  # Run database migrations
npm run prisma:generate # Generate Prisma client
npm run prisma:seed  # Seed database
```

### Frontend
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Features in Detail

### Authentication
- Secure password hashing with bcryptjs (10 salt rounds)
- JWT tokens with 7-day expiration
- Protected API routes with middleware
- Token stored in localStorage
- Automatic token inclusion in API requests

### State Management
- Zustand store for authentication state
- Local storage for persistent authentication
- React Router for navigation
- Automatic redirect to login for protected routes

### Drag and Drop
- React Beautiful DnD for smooth drag and drop
- Automatic status update when dropping tasks
- Visual feedback during dragging
- Error handling with revert on failure

### UI/UX
- Dark-themed modern design
- Responsive grid layout
- Loading states for async operations
- Toast notifications for user feedback
- Modal dialogs for forms
- Color-coded project tags and priority badges
- Relative date display for tasks (e.g., "in 2 days")

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- CORS configuration
- Input validation on both frontend and backend
- User ownership verification for resources

## Error Handling

- Comprehensive error messages
- User-friendly error notifications
- Automatic error logging
- Graceful error recovery
- Form validation feedback

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists
- Try: `createdb devtask_board`

### Port Already in Use
- Change PORT in server .env file
- Or kill the process using the port:
  - macOS/Linux: `lsof -i :5000` then `kill -9 <PID>`
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

### Prisma Client Error
- Run: `npm run prisma:generate`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### CORS Error
- Verify vite.config.js proxy is configured
- Ensure backend server is running on correct port
- Check API_BASE_URL in api/client.js

### Token Expiration
- Tokens expire after 7 days
- User will be redirected to login
- Log in again to get a new token

## Future Enhancements

- Task comments and activity log
- Team collaboration and project sharing
- Task filtering and search
- Advanced board views (calendar, timeline)
- Task templates
- Notifications and reminders
- Dark/light theme toggle
- Mobile app with React Native
- File attachments for tasks
- Integration with other tools (Slack, GitHub, etc.)

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Happy Task Managing! 🚀**
