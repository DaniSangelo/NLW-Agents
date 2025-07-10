# NLW Agents - Frontend Application

[![React](https://img.shields.io/badge/React-19+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0+-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1+-cyan.svg)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.82+-orange.svg)](https://tanstack.com/query)
[![React Router](https://img.shields.io/badge/React%20Router-7.6+-red.svg)](https://reactrouter.com/)

A modern React application built with TypeScript and Vite during the NLW Agents event by Rocketseat. This frontend provides a beautiful and responsive user interface for room management and real-time interactions.

## 🚀 Technologies

### Core Framework
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful and consistent icons
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Utility for merging Tailwind classes

### State Management & Data Fetching
- **TanStack Query** - Powerful data fetching and caching
- **React Router DOM** - Client-side routing

### Development Tools
- **Biome** - Fast formatter and linter
- **Ultracite** - Development environment setup

## 📁 Project Structure

```
front/
├── src/
│   ├── pages/
│   │   ├── create-room.tsx    # Room creation page
│   │   └── room.tsx           # Room details page
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── app.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── components.json            # UI components configuration
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Dependencies
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🎨 Features

### Pages
- **Create Room** (`/`) - Main page for creating and viewing rooms
- **Room Details** (`/room/:roomId`) - Individual room page

### UI Components
- **Responsive Design** - Mobile-first approach
- **Modern Styling** - Clean and intuitive interface
- **Loading States** - User-friendly loading indicators
- **Navigation** - Smooth client-side routing

### Data Management
- **Real-time Data Fetching** - TanStack Query for efficient API calls
- **Caching** - Intelligent data caching and background updates
- **Error Handling** - Graceful error states

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🏗️ Architecture Patterns

### Component Architecture
- **Functional Components** with React hooks
- **Type-safe props** with TypeScript
- **Clean component separation**

### Routing
- **Client-side routing** with React Router
- **Dynamic routes** for room details
- **Navigation guards** for invalid routes

### Data Fetching
- **TanStack Query** for server state management
- **Optimistic updates** for better UX
- **Background refetching** for data freshness

### Styling Approach
- **Utility-first CSS** with Tailwind
- **Component variants** with CVA
- **Responsive design** patterns

## 📚 Key Dependencies

### Core Dependencies
- `react` - React library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `@tanstack/react-query` - Data fetching and caching

### UI & Styling
- `tailwindcss` - CSS framework
- `@tailwindcss/vite` - Vite integration
- `lucide-react` - Icon library
- `class-variance-authority` - Component variants
- `tailwind-merge` - Class merging utility

### Development Dependencies
- `@types/react` - React type definitions
- `@types/react-dom` - React DOM type definitions
- `@vitejs/plugin-react` - Vite React plugin
- `typescript` - TypeScript compiler
- `vite` - Build tool
- `@biomejs/biome` - Code formatting and linting
- `ultracite` - Development environment

## 🎯 Application Features

### Room Management
- **View all rooms** with real-time data
- **Navigate to room details** with dynamic routing
- **Loading states** for better user experience

### User Experience
- **Responsive design** for all devices
- **Fast navigation** with client-side routing
- **Clean interface** with modern styling
- **Intuitive interactions** with proper feedback

## 🔗 API Integration

The frontend integrates with the backend API:

- **Base URL**: `http://localhost:3333`
- **Endpoints**:
  - `GET /rooms` - Fetch all rooms
  - `GET /health` - Health check

### Data Fetching Example
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['get-rooms'],
  queryFn: async () => {
    const response = await fetch('http://localhost:3333/rooms')
    return response.json()
  }
})
```

## 🚀 Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure your hosting service for SPA routing

## 🎨 UI/UX Design

### Design Principles
- **Clean and minimal** interface
- **Consistent spacing** and typography
- **Accessible** color contrast
- **Mobile-first** responsive design

### Color Scheme
- Modern color palette
- Proper contrast ratios
- Consistent theming

### Typography
- Clean, readable fonts
- Proper hierarchy
- Responsive text sizing

## 🔧 Configuration Files

### Vite Configuration
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Tailwind Configuration
- Utility-first approach
- Custom color palette
- Responsive breakpoints
- Component variants

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

Special thanks to **Rocketseat** for organizing the amazing **NLW Agents** event that made this project possible. The event provided an excellent learning experience and the opportunity to build this modern frontend application using cutting-edge technologies and best practices.

---

Built during NLW Agents by Rocketseat 