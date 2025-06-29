# API Documentation

## Overview
This document describes the REST APIs for the RMO Landscaping platform.

## Base URL
```
Development: http://localhost:3000/api
Production: https://api.rmolandscaping.com
```

## Authentication
All API requests require authentication using JWT tokens.

### Headers
```
Authorization: Bearer <jwt_token>
```

## API Endpoints

### Contracts

#### Create Contract
```http
POST /api/contracts
```

**Request Body:**
```json
{
  "type": "Residential",
  "clientId": "uuid",
  "startDate": "2025-07-01",
  "endDate": "2026-06-30",
  "totalValue": 5000.00,
  "paymentTerms": "Monthly"
}
```

**Response:**
```json
{
  "id": "uuid",
  "type": "Residential",
  "clientId": "uuid",
  "status": "Active",
  "startDate": "2025-07-01",
  "endDate": "2026-06-30",
  "totalValue": 5000.00,
  "paymentTerms": "Monthly",
  "createdAt": "2025-06-29T10:00:00Z",
  "updatedAt": "2025-06-29T10:00:00Z"
}
```

[Additional endpoints to be documented...]

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

### Common Error Codes
- `UNAUTHORIZED`: Authentication failed
- `FORBIDDEN`: Permission denied
- `VALIDATION_ERROR`: Invalid input
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Server error

## Rate Limiting
- 1000 requests per hour per API key
- Rate limit headers included in response

## Versioning
API versioning is handled through the URL path:
```
/api/v1/resource
```
