# Technical Implementation Specification

## 1. Architecture Overview
> **Reasoning**: The overall architecture must support the complex interactions between different parts of the system while maintaining simplicity in deployment and development. It needs to handle various user roles, real-time updates, and potential future scaling.

### 1.1 Modular Monolith Structure
> **Reasoning**: A modular monolith provides the perfect balance for this project: simpler deployment and development compared to microservices, while maintaining clean separation of concerns. This approach allows for future migration to microservices if needed, while avoiding premature optimization.
- **Core Modules**:
  - Authentication & Authorization
  - Contract Management
  - Area Management
  - Maintenance Scheduling
  - Activity Logging
  - Resource Management
  - Map Integration

### 1.2 Technology Stack
> **Reasoning**: The chosen stack optimizes for developer productivity, type safety, and modern web capabilities. Next.js 13+ with App Router provides excellent routing, server components, and built-in optimizations. TypeScript ensures code reliability, PostgreSQL provides robust relational database capabilities with excellent scalability, Redis provides high-performance caching and real-time capabilities, and NextAuth.js with JWT provides secure, flexible authentication.
- **Frontend**: 
  - Next.js 13+ with App Router
  - React Server Components
  - TypeScript
- **Backend**: 
  - Node.js with TypeScript
  - NextAuth.js for authentication
  - Redis for caching and real-time data
- **Database**: 
  - PostgreSQL for persistent storage
  - Redis for caching layer
- **API Documentation**: Swagger/OpenAPI
- **Authentication & Authorization**: 
  - NextAuth.js with JWT
  - Role-based access control (RBAC)
  - Middleware for route protection
  - Redis for session management
- **Testing**: Jest

## 2. Module Specifications
> **Reasoning**: Breaking down the system into these specific modules follows the Single Responsibility Principle and creates clear boundaries between different business domains. This separation makes the system easier to maintain, test, and potentially distribute as microservices later.

### 2.1 Authentication & Authorization Module
> **Reasoning**: Security is paramount for a business system handling sensitive contract and client data. NextAuth.js provides a robust, maintainable authentication solution that integrates well with Next.js App Router. The combination of middleware-based route protection and RBAC ensures comprehensive security across the application.

#### 2.1.1 Authentication Implementation
- **NextAuth.js Integration**:
  - JWT-based session handling
  - Secure token management
  - Built-in CSRF protection
  - Customizable session lifecycle

#### 2.1.2 Route Protection
- **Middleware-based Security**:
  - Protected API routes
  - Protected page routes
  - Role-based route access
  - Custom authentication checks

#### 2.1.3 Authorization Structure
- **Role-based Access Control (RBAC)**:
  - Manager Role:
    - Full access to all features
    - Contract management
    - Resource allocation
    - System configuration
  - Employee Role:
    - Activity logging
    - Task viewing and updates
    - Schedule access
    - Limited resource management
  - Client Role:
    - View-only access to own contracts
    - Area viewing
    - Maintenance history access

#### 2.1.4 Session Management
- Secure session storage
- Token refresh mechanism
- Session timeout handling
- Multi-device session management

### 2.1.5 App Router Structure
> **Reasoning**: Next.js App Router provides a file-system based routing structure that supports both static and dynamic routes, with built-in support for layouts, loading states, and error handling. This creates a more maintainable and performant application structure.

#### Route Organization
- **/app**
  - **/auth**: Authentication-related pages
    - sign-in
    - sign-out
    - error
  - **/dashboard**: Main application dashboard
    - **/contracts**: Contract management
    - **/areas**: Area management
    - **/maintenance**: Maintenance scheduling
    - **/resources**: Resource management
  - **/api**: API routes
    - /auth/[...nextauth]
    - /contracts
    - /areas
    - /maintenance
    - /resources

#### Features
- **Layouts**: Shared UI between routes
- **Loading States**: Instant loading states
- **Error Handling**: Centralized error boundaries
- **Server Components**: Default server-side rendering
- **Client Components**: Interactive UI components
- **Middleware**: Route protection and authentication
- **Dynamic Routes**: Parameter-based routing
- **Parallel Routes**: Simultaneous route loading

### 2.2 Contract Management Module
> **Reasoning**: Using a base Contract class with specialized implementations follows the Open-Closed Principle, allowing for different contract types while sharing common functionality. This approach makes it easy to add new contract types in the future.
- **Domain Models**:
  - Contract (base class)
  - ResidentialContract
  - CommercialContract
  - GovernmentContract
- **Features**:
  - Contract CRUD operations
  - Contract-Area associations
  - Client information management
  - Contract status tracking

### 2.3 Area Management Module
> **Reasoning**: Separating area management from contracts allows for flexible assignment of areas to different contracts and independent tracking of maintenance activities. The integration with Ordnance Survey maps provides accurate visualization and planning capabilities.
- **Domain Models**:
  - Area
  - MaintenanceType
  - AreaMap (Ordnance Survey integration)
- **Features**:
  - Area definition and mapping
  - Maintenance type association
  - Map upload and visualization
  - Area status tracking

### 2.4 Maintenance Scheduling Module
> **Reasoning**: The scheduling system needs to handle complex recurring patterns and resource allocation. Using separate domain models for Schedule, Task, and RecurringPattern provides flexibility in handling different maintenance frequencies and patterns.
- **Domain Models**:
  - Schedule
  - MaintenanceTask
  - RecurringPattern
- **Features**:
  - Schedule creation and management
  - Recurring task management
  - Task assignment
  - Schedule optimization

### 2.5 Activity Logging Module
- **Domain Models**:
  - ActivityLog
  - MaintenanceRecord
- **Features**:
  - Activity recording
  - History tracking
  - Report generation
  - Task completion verification

### 2.6 Resource Management Module
- **Domain Models**:
  - Resource
  - Equipment
  - WorkerAssignment
- **Features**:
  - Resource allocation
  - Cost tracking
  - Equipment management
  - Worker assignment

### 2.7 Map Integration Module
- **Features**:
  - Ordnance Survey map integration
  - Area visualization
  - Interactive map features
  - Map data storage and caching

### 2.8 Caching Module
> **Reasoning**: Implementing Redis caching improves application performance, reduces database load, and enables real-time features. The caching strategy is designed to be scalable and maintainable while ensuring data consistency.

#### 2.8.1 Cache Categories
- **Domain Models**:
  - CacheManager
  - CacheStrategy
  - CacheKey
  - CacheConfig

#### 2.8.2 Features
- **Session Management**:
  - User session storage
  - JWT token caching
  - Rate limiting data
  - Session state management

- **Data Caching**:
  - Query result caching
  - API response caching
  - Frequently accessed data
  - Static data caching

- **Real-time Features**:
  - Live maintenance updates
  - Worker location tracking
  - Equipment status updates
  - Real-time notifications

#### 2.8.3 Cache Strategies
- **Time-based Invalidation**:
  - TTL configuration
  - Automatic expiration
  - Refresh mechanisms
  - Cache warming

- **Event-based Invalidation**:
  - Data change events
  - Manual invalidation
  - Bulk cache clearing
  - Selective updates

#### 2.8.4 Performance Optimizations
- **Memory Management**:
  - Memory limits
  - Eviction policies
  - Cache size monitoring
  - Cleanup routines

- **Distribution**:
  - Cache sharding
  - Replication
  - Failover handling
  - Cluster management

## 3. Data Layer
> **Reasoning**: The data layer combines PostgreSQL for persistent storage with Redis for caching to optimize performance and scalability. This hybrid approach provides the robustness and scalability of PostgreSQL with the high-performance capabilities of Redis.

### 3.1 Database Schema
> **Reasoning**: The database schema is designed to support the domain model while maintaining data integrity through proper relationships. PostgreSQL provides robust relational database capabilities, excellent performance, and strong data integrity guarantees, making it an ideal choice for our application's needs.

### 3.2 Cache Schema
> **Reasoning**: The cache schema is structured to optimize read performance and support real-time features while maintaining data consistency with the primary database.

#### Cache Keys
```typescript
// Session Cache
sessions:{userId}
rateLimit:{endpoint}:{ip}
userTokens:{userId}

// API Cache
api:contracts:{queryParams}
api:areas:{areaId}
api:maintenance:{scheduleId}

// Real-time Cache
realtime:workers:{workerId}
realtime:equipment:{equipmentId}
realtime:schedules:active
```

#### Cache TTLs
```typescript
const TTL = {
  SESSION: 24 * 60 * 60,     // 24 hours
  API_RESPONSE: 5 * 60,      // 5 minutes
  REAL_TIME: 30,            // 30 seconds
  STATIC_DATA: 60 * 60      // 1 hour
}
```
### 3.1 Core Tables
- Users
- Roles
- Contracts
- Areas
- MaintenanceTypes
- Schedules
- ActivityLogs
- Resources
- Equipment
- Maps

### 3.2 Relationship Tables
- ContractAreas
- AreaMaintenanceTypes
- WorkerAssignments
- EquipmentAssignments

## 4. API Structure
> **Reasoning**: RESTful API design provides a standardized, predictable interface that's easy to consume. Version control of APIs ensures backward compatibility as the system evolves. Swagger documentation makes it easy for frontend developers to understand and use the APIs.
- RESTful API design
- OpenAPI/Swagger documentation
- Versioned endpoints
- Rate limiting and security measures

## 4.1 Middleware Architecture
> **Reasoning**: Next.js App Router's built-in middleware system provides powerful, flexible request/response processing with better integration compared to Express. This approach simplifies deployment, reduces dependencies, and maintains consistency with the Next.js ecosystem.

### 4.1.1 Core Middleware Structure
- **Location**: `/app/middleware.ts`
- **Execution**: Runs before matching routes
- **Scope**: Applies to all routes by default

### 4.1.2 Middleware Categories

#### Authentication Middleware
```typescript
// app/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Auth check
  const token = await getToken({ req: request })
  
  // Protected routes pattern
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')
  
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ]
}
```

#### API Middleware
```typescript
// app/api/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimit, corsCheck, validateContentType } from '../lib/middleware'

export async function middleware(request: NextRequest) {
  // API-specific middleware chain
  const rateLimitResult = await rateLimit(request)
  if (rateLimitResult) return rateLimitResult
  
  const corsResult = corsCheck(request)
  if (corsResult) return corsResult
  
  const contentTypeResult = validateContentType(request)
  if (contentTypeResult) return contentTypeResult

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}
```

### 4.1.3 Custom Middleware Functions

#### Rate Limiting
```typescript
// lib/middleware/rateLimit.ts
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

export async function rateLimit(request: NextRequest) {
  const redis = new Redis({
    url: process.env.REDIS_URL!,
    token: process.env.REDIS_TOKEN!
  })

  const ip = request.ip ?? 'anonymous'
  const key = `ratelimit:${ip}`
  const limit = 100 // requests
  const window = 60 * 60 // 1 hour

  const current = await redis.incr(key)
  if (current === 1) {
    await redis.expire(key, window)
  }

  if (current > limit) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  return null
}
```

#### Role-Based Access Control
```typescript
// lib/middleware/rbac.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function rbacMiddleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname
  
  // Role-based route mapping
  const roleRoutes = {
    ADMIN: ['/admin', '/dashboard'],
    MANAGER: ['/dashboard'],
    FIELD_WORKER: ['/tasks', '/schedule'],
    CUSTOMER: ['/contracts', '/service-history']
  }

  if (!token?.role || !canAccess(token.role, path, roleRoutes)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    )
  }

  return null
}
```

### 4.1.4 Error Handling Middleware
```typescript
// lib/middleware/errorHandler.ts
import { NextRequest, NextResponse } from 'next/server'
import { logger } from '../utils/logger'

export function errorHandler(error: Error, request: NextRequest) {
  logger.error({
    message: error.message,
    stack: error.stack,
    path: request.nextUrl.pathname,
    method: request.method
  })

  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  )
}
```

### 4.1.5 Middleware Integration
```typescript
// app/api/[...path]/route.ts
import { createRouteHandler } from 'next-api-handler'
import { 
  rateLimit, 
  rbacMiddleware, 
  errorHandler,
  validateRequest 
} from '../../../lib/middleware'

export const dynamic = 'force-dynamic'

export const { GET, POST, PUT, DELETE } = createRouteHandler({
  middleware: [
    rateLimit,
    rbacMiddleware,
    validateRequest
  ],
  onError: errorHandler
})
```

### 4.1.6 Benefits Over Express
- Native TypeScript support
- Built-in edge runtime support
- Integrated with Next.js caching
- Better deployment optimization
- Simplified configuration
- Automatic middleware chaining
- Built-in response helpers
- Static analysis support

## 5. Security Implementation
> **Reasoning**: Security must be comprehensive and layered. The combination of HTTPS, JWT, input validation, and protection against common web vulnerabilities (XSS, CSRF) provides defense in depth. Rate limiting prevents abuse, while encryption protects sensitive data.

### 5.1 Security Measures
- HTTPS enforcement
- JWT authentication
- Input validation
- XSS protection
- CSRF protection
- Rate limiting
- Data encryption

### 5.2 Error Handling & Security
> **Reasoning**: Proper error handling is crucial for security to prevent information leakage and maintain system stability.
- **Security-focused Error Handling**:
  - Sanitized error messages for clients
  - Detailed internal logging
  - Security event logging
  - Attack attempt detection
  - Automatic blocking of suspicious activity
  - Audit trail maintenance

## 6. Testing Strategy
> **Reasoning**: Comprehensive testing at all levels ensures system reliability. Unit tests verify individual components, integration tests verify module interactions, E2E tests verify complete user journeys, and performance tests ensure the system meets performance requirements.
- Unit tests (Jest)
- Integration tests
- E2E tests
- API tests
- Component tests
- Performance tests

## 7. Deployment & CI/CD
> **Reasoning**: A robust deployment pipeline with multiple environments ensures reliable releases. Automated testing in the pipeline catches issues early, while separate environments allow proper testing and staging before production deployment.
- Development environment
- Staging environment
- Production environment
- Automated testing
- Deployment pipelines

## 8. Error Handling & Logging
> **Reasoning**: A centralized approach to error handling and logging ensures consistent error management across the application, improves debugging, and provides better monitoring capabilities. Winston offers flexible logging with multiple transport options and customizable formatting.

### 8.1 Central Error Handling
- **ErrorHandler Class**:
  - Standardized error response format
  - Custom error types and codes
  - Error classification (user, system, external)
  - Error severity levels
  - Automatic error reporting
  - Integration with monitoring systems

### 8.2 Winston Logging Implementation
- **Logger Configuration**:
  - Multiple log levels (error, warn, info, debug)
  - Structured JSON logging format
  - Timestamp and correlation ID
  - Environment-specific logging
  - Log rotation and archival
  - Performance metrics logging

### 8.3 Monitoring & Metrics
- Error tracking and alerting
- Performance monitoring
- User activity logging
- System health metrics
- Resource utilization tracking
- API endpoint monitoring

## 9. Development Standards & Best Practices
> **Reasoning**: Consistent development standards and best practices ensure code quality, maintainability, and team productivity. These standards help prevent common issues and make the codebase more robust and easier to maintain.

### 9.1 Code Quality & Style
- **TypeScript Usage**:
  - Strict type checking enabled
  - Interface-first design
  - Proper type declarations for all components
  - Generic types where appropriate
  - Avoid 'any' type unless absolutely necessary

- **Code Formatting**:
  - Prettier for automatic code formatting
  - ESLint for code quality rules
  - Custom ESLint rules for project-specific standards
  - Pre-commit hooks for automatic formatting

- **Documentation**:
  - JSDoc comments for public APIs
  - Markdown documentation for complex logic
  - README files for all major directories
  - Architecture Decision Records (ADRs)
  - API documentation with Swagger/OpenAPI

### 9.2 Development Workflow
- **Version Control**:
  - Git branching strategy (trunk-based development)
  - Meaningful commit messages following conventional commits
  - Pull request templates
  - Code review guidelines
  - Branch protection rules

- **Environment Management**:
  - `.env` files for environment variables
  - Environment-specific configurations
  - Secure credential management
  - Configuration validation at startup

### 9.3 Coding Patterns
- **Asynchronous Code**:
  - Use async/await over promises
  - Proper error handling in async functions
  - Request cancellation patterns
  - Loading states management

- **Component Design**:
  - Functional components
  - Custom hooks for shared logic
  - Proper prop typing
  - Memoization where beneficial

### 9.4 Accessibility & UI
- **Accessibility Standards**:
  - WCAG 2.1 compliance
  - Semantic HTML
  - ARIA attributes where needed
  - Keyboard navigation support
  - Screen reader compatibility

- **Responsive Design**:
  - Mobile-first approach
  - Fluid typography
  - Responsive images
  - Breakpoint standardization
  - Layout consistency

### 9.5 Performance
- **Optimization Practices**:
  - Code splitting
  - Image optimization
  - Bundle size monitoring
  - Performance metrics tracking
  - Lazy loading implementation

## 10. Future Considerations
> **Reasoning**: Planning for future growth and changes is essential. Having clear paths for microservices migration, scaling strategies, and database optimization ensures the system can evolve with the business needs.
- Microservices migration path
- Scaling strategies
- Database optimization
- Feature expansion plans

---

*This document will be updated as technical decisions and implementations evolve.*
