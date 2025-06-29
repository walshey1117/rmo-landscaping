# Business Requirements Specification (BRS)

## Project: RMO Landscaping Ltd Web Platform

---

### 1. Introduction
This document outlines the business requirements for the RMO Landscaping Ltd web platform. The platform will support contract management, maintenance scheduling, employee activity tracking, and area visualization for landscaping services.

---

### 2. Business Objectives
- Digitize and centralize contract management for all clients (residential, commercial, and government).
- Enable efficient scheduling and tracking of recurring maintenance activities.
- Provide managers with tools to plan, allocate resources, and monitor costs.
- Visualize maintenance areas using uploaded Ordnance Survey maps.

---

### 3. Stakeholders
- Company management (platform administrators, planners)
- Field employees (maintenance workers)
- Clients (view-only access, optional)

---

### 4. Functional Requirements
#### 4.1 Contract Management
- Create, view, and update contracts for:
  - Single residences
  - Companies and their properties
  - Government sites (e.g., housing estates, road verges)
- Associate each contract with one or more land areas requiring maintenance.

#### 4.2 Area and Maintenance Tracking
- Define and manage areas for each contract (e.g., lawns, hedges, flower beds).
- Upload and display Ordnance Survey maps for each area.
- Specify maintenance types per area:
  - Grass cutting
  - Hedge cutting
  - Flower bed maintenance
- Record and view the last maintenance date and type for each area.
- Track recurring maintenance schedules (multiple times per year).

#### 4.3 Employee Activity Logging
- Allow employees to log maintenance activities (date, type, notes) per area.
- Enable managers to view activity history and upcoming tasks.

#### 4.4 Resource and Cost Management
- Allow managers to specify:
  - Number of workers required per area
  - Equipment needed for each maintenance type
  - Cost per maintenance activity
- Support planning and allocation of resources for upcoming maintenance.

---

### 5. Non-Functional Requirements
- Secure authentication and role-based access (manager, employee, optional client view)
- Responsive and user-friendly interface
- Data privacy and secure storage of contract and client information
- Scalable to support future growth and additional features

---

### 6. Success Criteria
- All contracts and maintenance activities are managed digitally
- Managers can efficiently plan and allocate resources
- Employees can easily log and review maintenance activities
- Visualization of areas via uploaded maps is accurate and user-friendly

---

*This document is a living specification and will be updated as requirements evolve.*
