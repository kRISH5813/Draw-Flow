# Draw-Flow

A real-time collaborative drawing application inspired by Excalidraw, built with modern web technologies for seamless multi-user drawing experiences.

## Features

- **Real-time Collaboration**: Multiple users can draw simultaneously in the same room
- **Shape Tools**: Create squares, rhombuses, circles, and freehand drawings with pencil tool
- **Infinite Canvas**: Unlimited drawing space for your creativity
- **Undo/Redo**: Full history management for your drawings
- **Clear All**: Quick option to clear the entire canvas
- **Room-based Sessions**: Join specific rooms to collaborate with others

## Tech Stack

### Frontend
- **Next.js** - React framework for production
- **React** - UI library
- **shadcn/ui** - Modern UI components

### Backend
- **Express.js** - Web application framework
- **WebSocket** - Real-time bidirectional communication
- **Zod** - TypeScript-first schema validation
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Database & ORM
- **PostgreSQL** - Relational database
- **Prisma** - Next-generation ORM

### Monorepo Management
- **Turborepo** - High-performance build system for JavaScript/TypeScript monorepos

## Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **pnpm** package manager
- **PostgreSQL** database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kRISH5813/Draw-Flow.git
   cd draw-flow
   ```

2. **Install pnpm** (if not already installed)
   ```bash
   npm install -g pnpm
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file inside packages/db directory
   mkdir -p packages/db
   touch packages/db/.env
   ```
   
   Add your database URL to `packages/db/.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/DrawFlow"
   ```

4. **Set up the database**
   ```bash
   # Run database migrations
   npx prisma migrate dev
   
   # Generate Prisma client
   npx prisma generate
   ```

5. **Install dependencies**
   ```bash
   pnpm install
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

The application should now be running! Open your browser and navigate to the development URL to start drawing.

## Project Structure

```
draw-flow/
├── apps/
│   ├── drawflow-frontend/                 # Next.js frontend application
│   |── websocket-backend/                 # WebSocket server for real-time communication
|   └── http-backend/                      # Express backend with zod validation for API config
├── packages/
│   ├── db/                                # Prisma database configuration
│   ├── backend-common/                    # zod configuration
|   ├── common/                            # jwt configuration
|   ├── lib/                               # tailwind configuration
|   ├── store/                             # redux configuration
|   ├── ui/                                # ui components
|   ├── eslint-config/                     # eslint configuration
|   └── typescript-config/                 # typescript configuration
|── turbo.json                             # Turborepo configuration
└── package.json                           # project configuration
```

## Acknowledgments

- Inspired by [Excalidraw](https://excalidraw.com/)
- Built with modern web technologies and best practices

---

**Happy Drawing!**