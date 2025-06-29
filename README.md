# RMO Landscaping Platform

## Project Structure

```
rmo-landscaping/
├── docs/                     # Documentation
│   ├── architecture/        # Architecture documentation
│   │   ├── diagrams/       # Architecture diagrams (draw.io)
│   │   ├── infrastructure/ # Infrastructure and deployment docs
│   │   └── security/       # Security architecture docs
│   └── requirements/       # Business requirements and specs
├── src/                    # Source code
│   ├── app/               # Next.js application
│   ├── api/               # API routes
│   ├── components/        # React components
│   ├── lib/              # Shared libraries
│   ├── models/           # Data models
│   ├── services/         # Business logic services
│   └── utils/            # Utility functions
└── tools/                # Development tools and utilities
    └── user-stories/     # User story board application
```

## Documentation Structure

### Architecture (/docs/architecture/)
- `system-architecture.md` - Overall system architecture
- `api-documentation.md` - API documentation and standards
- `database-erd.md` - Database entity relationship diagrams

#### Diagrams (/docs/architecture/diagrams/)
- `component-diagram.drawio` - System component diagram
- `data-flow-diagram.drawio` - Data flow diagram
- `database-erd.drawio` - Database ERD diagram
- Sequence diagrams for key flows:
  - `contract-creation.drawio`
  - `maintenance-logging.drawio`
  - `resource-allocation.drawio`

#### Infrastructure (/docs/architecture/infrastructure/)
- `deployment-architecture.md` - Deployment and infrastructure setup
- `caching-strategy.md` - Redis caching strategy
- `cache-implementation.md` - Cache implementation details

#### Security (/docs/architecture/security/)
- `security-architecture.md` - Security measures and implementations

### Requirements (/docs/requirements/)
- `business-requirements.md` - Business goals and requirements
- `project-instructions.md` - Development standards and guidelines

## Tools

### User Story Board (/tools/user-stories/)
Interactive board for tracking user stories and project progress:
- `index.html` - User story board interface
- `styles.css` - Board styling
- `app.js` - Board functionality
- `stories.json` - User story data

## Getting Started

1. Review the documentation in the `docs` folder
2. Set up the development environment following `docs/architecture/infrastructure/deployment-architecture.md`
3. Follow the coding standards in `docs/requirements/project-instructions.md`
4. Use the user story board in `tools/user-stories` to track progress

## Development Tools

- VS Code with Draw.io Integration for diagram editing
- Node.js and npm for development
- Docker for containerization
- Git for version control
