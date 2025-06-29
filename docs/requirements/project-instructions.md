# Project Instructions Guide

## General Principles
- **Adhere to SOLID principles** for all code and architecture.
- **Use the Domain Model Pattern** to organize business logic.
- **Share code** where possible to avoid duplication (use shared modules, utilities, and components).

## Architecture
- **Use a modular monolith architecture**: Organize the codebase into clear, independent modules (e.g., contracts, maintenance, users, scheduling) within a single deployable application.
- **Design modules with clear boundaries and interfaces** to allow for easy extraction to microservices if future scaling or separation is required.

## Development Practices
- **Write tests** for all new code using Jest.
- **Update tests** when modifying existing code.
- **Execute tests** after every change to ensure correctness.
- **Use TypeScript** for type safety and maintainability.
- **Use Next.js** for the web application framework.
- **Use Node.js** as the runtime environment.
- **Use PostgreSQL** as the database.
- **Use Swagger** (OpenAPI) for API documentation and to keep docs in sync with implementation.
- **Use environment variables** for configuration (e.g., database connection, secrets).
- **Apply consistent code formatting** (e.g., Prettier, ESLint).
- **Use Git** for version control and meaningful commit messages.
- **Document public APIs and complex logic** with comments or markdown.
- **Ensure accessibility and responsive design** in the UI.
- **Prefer async/await** for asynchronous code.

## Development Standards
- **TypeScript Practices**:
  - Use strict type checking
  - Follow interface-first design
  - Avoid using 'any' type
  - Implement proper type declarations
  - Use generics where appropriate

- **Code Quality**:
  - Set up Prettier for consistent formatting
  - Configure ESLint with project-specific rules
  - Implement pre-commit hooks
  - Use trunk-based development
  - Follow conventional commit messages

- **Documentation**:
  - Write JSDoc comments for public APIs
  - Maintain README files in all major directories
  - Create Architecture Decision Records (ADRs)
  - Document complex business logic
  - Keep API documentation up-to-date with Swagger

- **Error Handling & Logging**:
  - Use central ErrorHandler class
  - Implement Winston for structured logging
  - Set up proper error classification
  - Enable environment-specific logging
  - Implement log rotation

## Additional Recommendations
- **Role-based access control** for managers, employees, and (optionally) clients
- **Scalable and secure design** to support future growth and protect sensitive data
- **Performance optimization** through code splitting and lazy loading
- **Accessibility compliance** with WCAG 2.1 standards
- **Mobile-first responsive design** approach
- **Regular security audits** and dependency updates
- **Continuous monitoring** of application health and performance

---

*This document is a living reference. Update as project requirements or best practices evolve.*
