# Development Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git
- VS Code (recommended) with extensions:
  - Draw.io Integration
  - ESLint
  - Prettier
  - TypeScript and JavaScript tools
  - pgAdmin or DBeaver (PostgreSQL client)

## Initial Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd rmo-landscaping
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your local configuration
```

4. Start the development environment:
```bash
docker-compose up -d
```

5. Initialize the database:
```bash
npm run db:migrate
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

## Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `release/*` - Release preparation
- `hotfix/*` - Production hotfixes

### Code Standards
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write tests for all new features
- Follow the domain-driven design pattern
- Document all public APIs
- Use conventional commits

### Testing
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Run all tests
npm run test:all
```

### Database Management
```bash
# Create a new migration
npm run db:migration:create

# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:rollback
```

### Redis Commands
```bash
# Access Redis CLI
docker exec -it rmo-redis redis-cli

# Monitor Redis
docker exec -it rmo-redis redis-cli monitor
```

### Useful Scripts
- `npm run lint` - Check code style
- `npm run format` - Format code
- `npm run build` - Build for production
- `npm run storybook` - Run component documentation
- `npm run api-docs` - Generate API documentation

## Directory Structure

### Source Code (`/src`)
```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── (auth)/           # Auth-related pages
│   ├── contracts/        # Contract management pages
│   ├── dashboard/        # Dashboard pages
│   ├── scheduling/       # Scheduling pages
│   └── resources/        # Resource management pages
├── components/           # React components
│   ├── common/          # Shared components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   └── modules/         # Module-specific components
├── lib/                 # Core libraries
│   ├── auth/           # Authentication
│   ├── cache/          # Cache management
│   ├── database/       # Database utilities
│   └── api/            # API utilities
├── models/             # Domain models
├── services/           # Business logic
└── utils/             # Helper functions
```

### Testing (`/tests`)
```
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
└── e2e/              # End-to-end tests
```

## Common Tasks

### Adding a New Feature
1. Create a feature branch
2. Update domain models if needed
3. Add new components and services
4. Write tests
5. Update documentation
6. Create pull request

### Debugging
- Use Chrome DevTools for frontend
- Use VS Code debugger for backend
- Check logs in Docker containers
- Use Redis monitoring for cache issues

### Performance Monitoring
- Use Next.js Analytics
- Monitor Redis with RedisInsight
- Check API response times
- Review database query performance

## Troubleshooting

### Common Issues
1. Redis Connection
```bash
# Check Redis container
docker ps | grep redis
# Check Redis logs
docker logs rmo-redis
```

2. Database Issues
```bash
# Check PostgreSQL Database
ls -l prisma/dev.db
# Check migrations
npm run db:migrations:list
```

3. Next.js Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Getting Help
- Check the project wiki
- Review existing issues
- Contact the tech lead
- Use the development chat channel
