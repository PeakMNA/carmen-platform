# Carmen Platform Entity Relationship Diagram

```mermaid
erDiagram
    Tenant ||--o{ User : "has"
    Tenant ||--o{ Team : "has"
    Tenant ||--o{ Cluster : "owns"
    Tenant ||--o{ BusinessUnit : "manages"
    
    Cluster ||--o{ BusinessUnit : "contains"
    Cluster ||--o{ Report : "generates"
    
    BusinessUnit ||--o{ User : "employs"
    BusinessUnit ||--o{ Department : "has"
    BusinessUnit ||--o{ Report : "owns"
    
    Team ||--o{ User : "includes"
    Team ||--o{ Permission : "has"
    
    User ||--o{ UserRole : "has"
    User ||--o{ Session : "creates"
    User ||--o{ AuditLog : "generates"
    User ||--o{ Report : "creates"
    
    Role ||--o{ UserRole : "assigned_to"
    Role ||--o{ Permission : "has"
    
    Report ||--o{ ReportTemplate : "uses"
    Report ||--o{ ReportSchedule : "follows"
    Report ||--o{ ReportDistribution : "has"
    
    Department ||--o{ User : "employs"
    Department ||--o{ Module : "uses"

    Tenant {
        string id PK
        string name
        string domain UK
        string description
        datetime createdAt
        datetime updatedAt
        json settings
        boolean isActive
    }

    Cluster {
        string id PK
        string name
        string tenantId FK
        string description
        datetime createdAt
        datetime updatedAt
        json settings
    }

    BusinessUnit {
        string id PK
        string name
        string clusterId FK
        string tenantId FK
        string type
        json settings
        datetime createdAt
        datetime updatedAt
    }

    User {
        string id PK
        string email UK
        string name
        string password
        string tenantId FK
        string teamId FK
        boolean isActive
        datetime lastLogin
        datetime createdAt
        datetime updatedAt
    }

    Team {
        string id PK
        string name
        string tenantId FK
        string description
        datetime createdAt
        datetime updatedAt
    }

    Role {
        string id PK
        string name
        string description
        int level
        datetime createdAt
        datetime updatedAt
    }

    UserRole {
        string id PK
        string userId FK
        string roleId FK
        string scope
        datetime assignedAt
        datetime expiresAt
    }

    Permission {
        string id PK
        string name
        string description
        string resource
        string action
        datetime createdAt
        datetime updatedAt
    }

    Department {
        string id PK
        string name
        string businessUnitId FK
        string type
        datetime createdAt
        datetime updatedAt
    }

    Module {
        string id PK
        string name
        string description
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }

    Report {
        string id PK
        string name
        string businessUnitId FK
        string createdById FK
        string templateId FK
        string status
        json data
        datetime generatedAt
        datetime createdAt
        datetime updatedAt
    }

    ReportTemplate {
        string id PK
        string name
        string description
        json schema
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }

    ReportSchedule {
        string id PK
        string reportId FK
        string frequency
        string timezone
        datetime nextRun
        datetime lastRun
        boolean isActive
    }

    ReportDistribution {
        string id PK
        string reportId FK
        string type
        json recipients
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }

    Session {
        string id PK
        string userId FK
        string token
        datetime expiresAt
        datetime createdAt
    }

    AuditLog {
        string id PK
        string userId FK
        string action
        string resource
        json details
        datetime createdAt
    }
```

## Entity Descriptions

### Core Entities

1. **Tenant**
   - Represents a customer organization
   - Contains global settings and configurations
   - Parent entity for all organization-specific data

2. **Cluster**
   - Represents a group of business units
   - Enables hierarchical organization management
   - Contains cluster-specific settings

3. **BusinessUnit**
   - Represents individual hotels or properties
   - Contains business unit specific configurations
   - Links to departments and users

4. **User**
   - Represents system users
   - Contains authentication information
   - Links to roles and permissions

### Access Control

1. **Team**
   - Organizes users into groups
   - Enables team-based permissions
   - Facilitates resource sharing

2. **Role**
   - Defines user roles in the system
   - Contains role hierarchy information
   - Links to permissions

3. **Permission**
   - Defines granular access controls
   - Specifies allowed actions on resources
   - Supports RBAC implementation

### Operational Entities

1. **Department**
   - Represents business unit departments
   - Contains department-specific settings
   - Links to users and modules

2. **Module**
   - Represents system features/modules
   - Controls feature access
   - Supports modular system architecture

### Reporting System

1. **Report**
   - Represents generated reports
   - Contains report data and metadata
   - Links to templates and schedules

2. **ReportTemplate**
   - Defines report structure
   - Contains template schema
   - Enables standardized reporting

3. **ReportSchedule**
   - Manages automated report generation
   - Contains scheduling information
   - Controls report timing

4. **ReportDistribution**
   - Manages report delivery
   - Contains distribution settings
   - Controls report access

### Security & Audit

1. **Session**
   - Manages user sessions
   - Contains authentication tokens
   - Supports security implementation

2. **AuditLog**
   - Tracks system activities
   - Contains audit trail information
   - Supports compliance requirements

## Key Relationships

1. **Tenant Hierarchy**
   - Tenant → Clusters → Business Units
   - Enables multi-level organization management
   - Supports complex business structures

2. **User Management**
   - User → Teams → Roles → Permissions
   - Implements RBAC
   - Supports flexible access control

3. **Reporting Structure**
   - Report → Template → Schedule → Distribution
   - Enables comprehensive reporting system
   - Supports automated workflows

## Notes

1. All entities include:
   - Unique identifiers (UUID/CUID)
   - Timestamps (created_at, updated_at)
   - Soft delete capability where appropriate

2. Security considerations:
   - Encrypted sensitive data
   - Audit logging for critical operations
   - Session management for security

3. Performance optimizations:
   - Indexed foreign keys
   - Optimized query patterns
   - Efficient relationship structures