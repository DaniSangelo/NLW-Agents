# NLW Agents - Backend Server

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5.4+-yellow.svg)](https://fastify.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17+-blue.svg)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-0.44+-orange.svg)](https://orm.drizzle.team/)
[![Docker](https://img.shields.io/badge/Docker-✓-blue.svg)](https://www.docker.com/)

A modern, type-safe backend API built with Fastify and TypeScript during the NLW Agents event by Rocketseat.

## 🚀 Technologies

### Core Framework
- **Node.js** - JavaScript runtime environment
- **TypeScript** - Type-safe JavaScript development
- **Fastify** - Fast and low overhead web framework
- **Zod** - TypeScript-first schema validation

### Database & ORM
- **PostgreSQL** - Relational database with pgvector extension
- **Drizzle ORM** - TypeScript ORM for database operations
- **Drizzle Kit** - Database migration and management tools

### Development Tools
- **Biome** - Fast formatter and linter
- **Ultracite** - Development environment setup
- **Docker** - Containerization for database

## 📁 Project Structure

```
server/
├── src/
│   ├── db/
│   │   ├── connection.ts      # Database connection
│   │   ├── migrations/        # Database migrations
│   │   ├── schema/
│   │   │   ├── index.ts       # Schema exports
│   │   │   └── room.ts        # Room table schema
│   │   └── seed.ts            # Database seeding
│   ├── http/
│   │   └── routes/
│   │       └── get-rooms.ts   # API routes
│   ├── env.ts                 # Environment validation
│   └── server.ts              # Server entry point
├── docker/
│   └── setup.sql              # Database initialization
├── docker-compose.yml         # Docker configuration
├── drizzle.config.ts          # Drizzle ORM config
└── package.json               # Dependencies
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the server directory:
   ```env
   DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
   PORT=3333
   ```

3. **Start the database with Docker:**
   ```bash
   docker-compose up -d
   ```

4. **Run database migrations:**
   ```bash
   npx drizzle-kit migrate
   ```

5. **Seed the database (optional):**
   ```bash
   npm run db:seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will be available at `http://localhost:3333`

## 🗄️ Database

### Features
- **PostgreSQL 17** with pgvector extension for vector operations
- **Drizzle ORM** for type-safe database operations
- **Automatic migrations** with Drizzle Kit
- **Database seeding** for development data

### Schema
The application includes a `rooms` table with the following structure:
- `id` (UUID) - Primary key
- `name` (Text) - Room name
- `description` (Text) - Room description
- `createdAt` (Timestamp) - Creation timestamp

## 🔧 Development Commands

```bash
npm run dev              # Start development server with hot reload
npm run start            # Start production server
npm run db:seed          # Seed database with sample data
npx drizzle-kit studio   # Open Drizzle Studio for database management
npx drizzle-kit generate # Generate new migrations
npx drizzle-kit migrate  # Apply pending migrations
```

## 🏗️ Architecture Patterns

### API Design
- **RESTful API** with Fastify framework
- **Type-safe endpoints** using Zod validation
- **CORS enabled** for frontend integration
- **Health check endpoint** for monitoring

### Database Patterns
- **Type-safe ORM** with Drizzle
- **Migration-based schema changes**
- **Environment-based configuration**
- **Containerized database** for consistency

### Code Organization
- **Modular route structure**
- **Centralized environment validation**
- **Type-safe database operations**
- **Clean separation of concerns**

## 📚 Key Dependencies

### Core Dependencies
- `fastify` - Web framework
- `@fastify/cors` - CORS support
- `fastify-type-provider-zod` - Zod integration
- `drizzle-orm` - Database ORM
- `postgres` - PostgreSQL client
- `zod` - Schema validation

### Development Dependencies
- `@types/node` - Node.js type definitions
- `drizzle-kit` - Database migration tools
- `drizzle-seed` - Database seeding
- `typescript` - TypeScript compiler
- `ultracite` - Development environment
- `@biomejs/biome` - Code formatting and linting

## 🚀 API Endpoints

### Health Check
- `GET /health` - Server health status

### Rooms
- `GET /rooms` - Get all rooms

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3333 |
| `DATABASE_URL` | PostgreSQL connection string | Required |

## 🐳 Docker Configuration

The project includes Docker Compose for easy database setup:

```yaml
services:
  nlw-agents-pg:
    image: pgvector/pgvector:pg17
    environment:
      POSTGRES_USER: docker
      POSTGRES_PASSWORD: docker
      POSTGRES_DB: agents
    ports:
      - "5432:5432"
```

## 🚀 Deployment

### Production Setup
1. Set up PostgreSQL database with pgvector extension
2. Configure environment variables
3. Run database migrations: `npx drizzle-kit migrate`
4. Start the application: `npm run start`

### Environment Variables for Production
```env
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3333
```
## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

Special thanks to **Rocketseat** for organizing the amazing **NLW Agents** event that made this project possible. The event provided an excellent learning experience and the opportunity to build this modern backend application using cutting-edge technologies and best practices.

---

Built during NLW Agents by Rocketseat 