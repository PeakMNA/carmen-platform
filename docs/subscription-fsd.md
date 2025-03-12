# Functional Specification Document: Subscription Controlling Platform

## 1. Introduction

### 1.1 Purpose
This Functional Specification Document (FSD) describes in detail how the Subscription Controlling Platform will function from a user's perspective, with particular focus on the configuration of modules and staff at the Business Unit (BU) level and cluster users at the cluster level.

### 1.2 Scope
This document covers the functional specifications for the subscription configuration workflows, user interfaces, business rules, and validation logic related to module activation, staff license allocation, and cluster user management.

### 1.3 Intended Audience
- Development Team
- QA Engineers
- Product Managers
- UX/UI Designers
- Implementation Specialists
- Customer Success Managers

### 1.4 References
- Product Requirements Document (PRD) for Subscription Controlling Platform

## 2. User Roles and Permissions

### 2.1 Subscription Administrator
- **Description**: Has full access to create and manage subscription contracts, business units, clusters, and module activations
- **Responsibilities**:
  - Create and manage subscription contracts
  - Configure business units and clusters
  - Allocate licenses for BU staff and cluster users
  - Activate modules for business units
  - Monitor subscription usage and compliance
  - Manage renewals and billing

### 2.2 Business Unit Manager
- **Description**: Manages a specific business unit within the subscription
- **Responsibilities**:
  - View business unit configuration and module activations
  - Assign BU staff licenses to individual users
  - Monitor BU staff license usage
  - Request additional licenses or module activations
  - View business unit-specific reports

### 2.3 Cluster Manager
- **Description**: Manages a cluster of business units
- **Responsibilities**:
  - View cluster configuration and associated business units
  - Assign cluster user licenses to individual users
  - Monitor cluster user license usage
  - View cluster-specific reports

### 2.4 System Administrator
- **Description**: Technical administrator responsible for system configuration
- **Responsibilities**:
  - Configure system settings
  - Manage user accounts and permissions
  - Monitor system performance and usage
  - Troubleshoot technical issues

## 3. User Interfaces and Workflows

### 3.1 Subscription Configuration Interface

#### 3.1.1 Subscription Dashboard
- **Description**: Main dashboard for viewing and managing subscription information
- **Elements**:
  - Subscription summary card (contract dates, tier, status)
  - License utilization metrics (BU staff, cluster users)
  - Module activation summary
  - Business unit and cluster overview
  - Quick action buttons for common tasks
  - Alert section for expiration notices and compliance issues
- **Behaviors**:
  - Dashboard auto-refreshes every 5 minutes
  - Alerts are color-coded by severity (red for critical, yellow for warnings)
  - License utilization meters change color based on threshold levels (green < 70%, yellow 70-90%, red > 90%)

#### 3.1.2 Business Unit Configuration
- **Description**: Interface for creating and managing business units
- **Elements**:
  - Business unit list view with search and filter options
  - Business unit creation/edit form
  - Module activation panel
  - BU staff license allocation controls
  - Expiration date settings
- **Behaviors**:
  - Business unit list is sortable by name, creation date, or expiration date
  - Module activation checkboxes are disabled if not available in the current subscription tier
  - Staff license allocation cannot exceed subscription limits (validation message appears)
  - Changes are saved only after explicit "Save" action

#### 3.1.3 Cluster Configuration
- **Description**: Interface for creating and managing clusters
- **Elements**:
  - Cluster list view with search and filter options
  - Cluster creation/edit form
  - Business unit assignment panel
  - Cluster user license allocation controls
  - Expiration date settings
- **Behaviors**:
  - Only available business units can be assigned to clusters
  - Business units can belong to multiple clusters
  - Cluster user license allocation cannot exceed subscription limits (validation message appears)
  - Changes are saved only after explicit "Save" action

#### 3.1.4 Module License Management
- **Description**: Interface for managing module licenses across business units
- **Elements**:
  - Module license dashboard showing activation status across all business units
  - Module activation controls for each business unit
  - Module-specific configuration options
  - Module usage metrics and distribution analytics
  - License allocation visualization by user type (BU Staff vs Cluster Users)
- **Behaviors**:
  - Module activation status is immediately reflected in user access
  - Module-specific configurations are presented based on activated modules
  - Changes are validated against subscription tier limitations
  - Module distribution analytics update in real-time when changes are made

### 3.2 Module Activation Workflow

#### 3.2.1 Module Activation Process
1. Administrator navigates to Subscriptions Management page
2. Expands the target Business Unit's license management section
3. Locates the "Module Licenses" card and clicks "Edit Modules"
4. Views list of available modules with activation status
5. Toggles activation status for desired modules by clicking on module tiles
6. System validates activation against subscription tier limitations
7. Administrator saves changes
8. System applies changes and updates module access for affected users

#### 3.2.2 Module Configuration Process
1. Administrator navigates to a specific Business Unit's configuration page
2. System displays module-specific configuration options for that Business Unit
3. Administrator configures module parameters for the specific Business Unit
4. System validates configuration against business rules
5. Administrator saves module configuration
6. System applies configuration and updates module behavior for that Business Unit only

#### 3.2.3 Module License Distribution Tracking
1. Administrator navigates to Subscriptions Management page
2. Expands the target Business Unit's license management section
3. Views the "Module Licenses" card showing active modules
4. Examines module distribution metrics showing usage by user type
5. Identifies modules with low or high utilization
6. Makes informed decisions about module activation or deactivation
7. Optionally navigates to detailed Business Unit configuration for advanced settings

### 3.3 License Allocation Workflow

#### 3.3.1 BU Staff License Allocation
1. Administrator navigates to Business Unit configuration
2. Selects target Business Unit from the list
3. Opens License Allocation panel
4. Views current BU staff license allocation
5. Adjusts staff license allocation number
6. System validates against subscription limits
7. Administrator saves changes
8. System updates BU staff license availability

#### 3.3.2 Cluster User License Allocation
1. Administrator navigates to Cluster configuration
2. Selects target Cluster from the list
3. Opens License Allocation panel
4. Views current Cluster user license allocation
5. Adjusts cluster user license allocation number
6. System validates against subscription limits
7. Administrator saves changes
8. System updates Cluster user license availability

### 3.4 User Assignment Workflow

#### 3.4.1 BU Staff User Assignment
1. BU Manager navigates to User Management interface
2. Views list of current BU staff users
3. Clicks "Add User" or selects an existing user to modify
4. Assigns or modifies user information and permissions
5. System validates against available BU staff licenses
6. BU Manager saves changes
7. System updates user access based on module activations

#### 3.4.2 Cluster User Assignment
1. Cluster Manager navigates to User Management interface
2. Views list of current Cluster users
3. Clicks "Add User" or selects an existing user to modify
4. Assigns or modifies user information and permissions
5. Selects which Business Units within the cluster the user can access
6. System validates against available Cluster user licenses
7. Cluster Manager saves changes
8. System updates user access based on module activations for each accessible BU

## 4. Functional Requirements

### 4.1 Business Unit Configuration Functions

#### 4.1.1 Business Unit Creation
- **Input Fields**:
  - Business Unit Name (required, text, max 100 chars)
  - Business Unit ID (required, alphanumeric, unique)
  - Description (optional, text area, max 500 chars)
  - Physical Location (optional, text, max 200 chars)
  - Tax ID (optional, text, format validation based on country)
  - Country (required, dropdown selection)
  - Time Zone (required, dropdown selection)
  - Contact Email (required, email format validation)
  - Contact Phone (optional, phone format validation)
  - Expiration Date (required, date picker, must be <= subscription end date)
  - Grace Period (optional, numeric, days, default = 30)
- **Validation Rules**:
  - Business Unit Name must be unique within the subscription
  - Business Unit ID must follow the pattern: [A-Z]{2}-[0-9]{4}
  - Expiration Date cannot be later than subscription end date
  - Contact Email must be a valid email format
- **System Behaviors**:
  - Auto-generates a unique Business Unit ID if not specified
  - Auto-fills Country based on IP geolocation (can be changed)
  - Auto-suggests Time Zone based on Country selection
  - Creates Business Unit record in database upon save
  - Generates Business Unit creation event in audit log

#### 4.1.2 Module Activation for Business Unit
- **Input Fields**:
  - Module Selection (checkboxes for available modules)
  - Module-specific parameters (vary by module)
  - Module Expiration Date (date picker, defaults to BU expiration)
- **Validation Rules**:
  - Selected modules must be available in the subscription tier
  - Total activated modules cannot exceed subscription limits
  - Module Expiration Date cannot be later than BU expiration date
- **System Behaviors**:
  - Displays only modules available in the subscription tier
  - Shows module dependencies (if applicable)
  - Updates module access for all BU users upon save
  - Generates module activation events in audit log
  - Shows confirmation dialog for module deactivation

#### 4.1.3 BU Staff License Allocation
- **Input Fields**:
  - Staff License Quantity (numeric, min=1)
  - License Type Mix (if multiple types available)
- **Validation Rules**:
  - Total allocated licenses cannot exceed subscription limit
  - License allocation cannot be reduced below currently assigned licenses
- **System Behaviors**:
  - Displays current license usage and availability
  - Shows warning if approaching license limit (>80%)
  - Updates license availability upon save
  - Generates license allocation events in audit log

#### 4.1.4 Module License Management
- **Input Fields**:
  - Module Selection (interactive module tiles with activation status)
  - Module Distribution Metrics (read-only visualization)
  - Module-specific parameters (vary by module)
- **Validation Rules**:
  - Selected modules must be available in the subscription tier
  - Total activated modules cannot exceed subscription limits
  - Module dependencies must be satisfied before activation
- **System Behaviors**:
  - Displays all available modules with clear activation status
  - Shows module distribution metrics by user type
  - Updates module access for all users upon save
  - Generates module activation events in audit log
  - Shows confirmation dialog for module deactivation

### 4.2 Cluster Configuration Functions

#### 4.2.1 Cluster Creation
- **Input Fields**:
  - Cluster Name (required, text, max 100 chars)
  - Cluster ID (required, alphanumeric, unique)
  - Description (optional, text area, max 500 chars)
  - Business Unit Selection (multi-select from available BUs)
  - Expiration Date (required, date picker, defaults to earliest BU expiration)
  - Grace Period (optional, numeric, days, default = 30)
- **Validation Rules**:
  - Cluster Name must be unique within the subscription
  - Cluster ID must follow the pattern: CL-[0-9]{4}
  - At least one Business Unit must be selected
  - Expiration Date cannot be later than earliest BU expiration date
- **System Behaviors**:
  - Auto-generates a unique Cluster ID if not specified
  - Creates Cluster record in database upon save
  - Associates selected Business Units with the cluster
  - Generates Cluster creation event in audit log

#### 4.2.2 Cluster User License Allocation
- **Input Fields**:
  - Cluster User License Quantity (numeric, min=1)
  - License Type Mix (if multiple types available)
- **Validation Rules**:
  - Total allocated licenses cannot exceed subscription limit
  - License allocation cannot be reduced below currently assigned licenses
- **System Behaviors**:
  - Displays current license usage and availability
  - Shows warning if approaching license limit (>80%)
  - Updates license availability upon save
  - Generates license allocation events in audit log

### 4.3 User Management Functions

#### 4.3.1 BU Staff User Management
- **Input Fields**:
  - Username (required, email format)
  - First Name (required, text, max 50 chars)
  - Last Name (required, text, max 50 chars)
  - Job Title (optional, text, max 100 chars)
  - Department (optional, text, max 100 chars)
  - Role/Permissions (required, role selection)
  - Module Access (checkboxes, limited to activated modules)
  - Status (Active/Inactive)
- **Validation Rules**:
  - Username must be unique within the system
  - Username must be a valid email format
  - User must be assigned at least one role
- **System Behaviors**:
  - Consumes one BU staff license when user is created
  - Updates user access based on module activations
  - Generates user creation/modification events in audit log
  - Sends welcome email to new users with login instructions

#### 4.3.2 Cluster User Management
- **Input Fields**:
  - Username (required, email format)
  - First Name (required, text, max 50 chars)
  - Last Name (required, text, max 50 chars)
  - Job Title (optional, text, max 100 chars)
  - Department (optional, text, max 100 chars)
  - Role/Permissions (required, role selection)
  - Business Unit Access (multi-select, limited to cluster BUs)
  - Module Access (checkboxes, varies by BU)
  - Status (Active/Inactive)
- **Validation Rules**:
  - Username must be unique within the system
  - Username must be a valid email format
  - User must be assigned at least one role
  - User must have access to at least one Business Unit in the cluster
- **System Behaviors**:
  - Consumes one Cluster user license when user is created
  - Updates user access based on module activations for each BU
  - Generates user creation/modification events in audit log
  - Sends welcome email to new users with login instructions

## 5. Business Rules and Logic

### 5.1 License Validation Rules

#### 5.1.1 BU Staff License Rules
- Each BU staff user consumes exactly one staff license
- BU staff licenses are specific to a single Business Unit
- BU staff users cannot access other Business Units
- When a BU staff user is deactivated, their license is returned to the available pool
- BU staff licenses cannot be transferred between Business Units
- Total BU staff licenses allocated across all Business Units cannot exceed subscription limit

#### 5.1.2 Cluster User License Rules
- Each Cluster user consumes exactly one cluster license
- Cluster user licenses are specific to a single Cluster
- Cluster users can access multiple Business Units within their assigned Cluster
- When a Cluster user is deactivated, their license is returned to the available pool
- Cluster user licenses cannot be transferred between Clusters
- Total Cluster user licenses allocated across all Clusters cannot exceed subscription limit

### 5.2 Module Access Rules

#### 5.2.1 Module Activation Rules
- Modules can only be activated if they are included in the subscription tier
- Each module activation is specific to a single Business Unit
- Module activations can have independent expiration dates
- When a module is deactivated, all users lose access to that module
- Module dependencies must be satisfied (if module A requires module B, B must be activated first)
- Module-specific parameters must be configured before the module becomes accessible

#### 5.2.2 User Module Access Rules
- Users can only access modules that are activated for their Business Unit(s)
- User permissions determine specific features available within each module
- BU staff users can only access modules activated for their specific Business Unit
- Cluster users can access different modules in different Business Units
- Module access is revoked immediately when module activation expires
- Module access is subject to license validation at each login and major operation

### 5.3 Expiration and Grace Period Rules

#### 5.3.1 Business Unit Expiration Rules
- When a Business Unit expires, all BU staff users lose access immediately after grace period
- Expired Business Units remain visible in the system but are marked as expired
- Expired Business Units can be renewed by extending the expiration date
- Data for expired Business Units is retained for 90 days after expiration
- Module configurations for expired Business Units are preserved for easy reactivation

#### 5.3.2 Cluster Expiration Rules
- When a Cluster expires, all Cluster users lose access to all associated Business Units
- Cluster expiration does not affect BU staff users of the associated Business Units
- Cluster expiration does not affect the Business Units themselves
- Expired Clusters remain visible in the system but are marked as expired
- Cluster expiration date is independent of Business Unit expiration dates

## 6. Error Handling and Notifications

### 6.1 Error Scenarios and Responses

#### 6.1.1 License Limit Exceeded
- **Scenario**: Attempting to allocate more licenses than available in subscription
- **System Response**:
  - Displays error message: "License allocation exceeds subscription limit."
  - Suggests: "Current limit: [X]. Please reduce allocation or upgrade subscription."
  - Prevents save action until resolved
  - Logs error attempt

#### 6.1.2 Module Activation Failure
- **Scenario**: Attempting to activate a module not available in subscription tier
- **System Response**:
  - Displays error message: "Module [Name] is not available in your subscription tier."
  - Suggests: "Please upgrade to [Tier] to access this module."
  - Prevents module activation
  - Logs error attempt

#### 6.1.3 Invalid Expiration Date
- **Scenario**: Setting expiration date beyond subscription end date
- **System Response**:
  - Displays error message: "Expiration date cannot exceed subscription end date ([Date])."
  - Auto-corrects to subscription end date
  - Allows save with correction
  - Logs correction

### 6.2 Notification Types and Delivery

#### 6.2.1 Expiration Notifications
- **30 Days Before Expiration**:
  - Notification to Subscription Administrators and affected BU/Cluster Managers
  - Email and in-app notification
  - Message: "Business Unit/Cluster [Name] will expire in 30 days on [Date]."
  - Action link: "Renew Now"

- **15 Days Before Expiration**:
  - Notification to Subscription Administrators, affected BU/Cluster Managers, and all users
  - Email and in-app notification
  - Message: "Business Unit/Cluster [Name] will expire in 15 days on [Date]."
  - Action link: "Contact Administrator"

- **3 Days Before Expiration**:
  - Notification to all users of the affected Business Unit/Cluster
  - Email, in-app notification, and login warning banner
  - Message: "Your access to [Business Unit/Cluster] will expire in 3 days on [Date]."
  - Action link: "Contact Administrator"

#### 6.2.2 License Utilization Notifications
- **License Pool 80% Utilized**:
  - Notification to Subscription Administrators
  - In-app notification only
  - Message: "[Business Unit/Cluster] has reached 80% of allocated licenses."
  - Action link: "Manage Licenses"

- **License Pool 95% Utilized**:
  - Notification to Subscription Administrators and affected BU/Cluster Managers
  - Email and in-app notification
  - Message: "[Business Unit/Cluster] has reached 95% of allocated licenses. New users may not be able to be added."
  - Action link: "Increase Allocation"

## 7. Reporting and Analytics

### 7.1 Business Unit Reports

#### 7.1.1 Business Unit Summary Report
- **Content**:
  - Business Unit metadata (name, ID, creation date)
  - Expiration status and dates
  - Module activation status
  - BU staff license utilization
  - User activity metrics
- **Format Options**: Web view, PDF, CSV export
- **Access**: Subscription Administrators, BU Managers

#### 7.1.2 Business Unit Module Usage Report
- **Content**:
  - Modules activated for the Business Unit
  - Module-specific metrics and usage statistics
  - User access patterns by module
  - Module expiration dates
- **Format Options**: Web view, PDF, CSV export
- **Access**: Subscription Administrators, BU Managers

### 7.2 Cluster Reports

#### 7.2.1 Cluster Summary Report
- **Content**:
  - Cluster metadata (name, ID, creation date)
  - Associated Business Units
  - Expiration status and dates
  - Cluster user license utilization
  - User activity metrics
- **Format Options**: Web view, PDF, CSV export
- **Access**: Subscription Administrators, Cluster Managers

#### 7.2.2 Cluster User Access Report
- **Content**:
  - List of cluster users
  - Business Unit access patterns
  - Module access patterns
  - User activity metrics
- **Format Options**: Web view, PDF, CSV export
- **Access**: Subscription Administrators, Cluster Managers

### 7.3 Subscription-Wide Reports

#### 7.3.1 License Utilization Report
- **Content**:
  - BU staff license allocation and usage by Business Unit
  - Cluster user license allocation and usage by Cluster
  - Historical license utilization trends, projected needs
  - License efficiency metrics
- **Format Options**: Web view, PDF, CSV export
- **Access**: Subscription Administrators

#### 7.3.2 Module Activation Report
- **Content**:
  - Module activations across all Business Units
  - Module usage patterns and metrics
  - Module expiration dates
  - Module-specific configuration variations
- **Format Options**: Web view, PDF, CSV export
- **Access**: Subscription Administrators

## 8. Data Structures

### 8.1 Subscription Entity
```json
{
  "subscriptionId": "SUB-12345",
  "companyName": "Acme Hotels",
  "taxId": "123-45-6789",
  "tier": "Enterprise",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31",
  "status": "Active",
  "maxBusinessUnits": 50,
  "maxClusterUsers": 100,
  "maxBUStaffPerBU": 30,
  "availableModules": ["Accounting", "Inventory", "Sales", "Analytics", "PMS", "HR"],
  "grace Period": 30,
  "createdBy": "admin@example.com",
  "createdDate": "2024-12-15",
  "lastModifiedBy": "admin@example.com",
  "lastModifiedDate": "2024-12-15"
}
```

### 8.2 Business Unit Entity
```json
{
  "businessUnitId": "BU-1234",
  "subscriptionId": "SUB-12345",
  "name": "Downtown Hotel",
  "description": "Our flagship downtown location",
  "location": "123 Main St, Anytown, ST",
  "country": "United States",
  "timeZone": "America/New_York",
  "taxId": "987-65-4321",
  "contactEmail": "manager@downtown.example.com",
  "contactPhone": "+1-555-123-4567",
  "startDate": "2025-01-01",
  "expirationDate": "2025-12-31",
  "gracePeriod": 30,
  "status": "Active",
  "staffLicensesAllocated": 20,
  "staffLicensesUsed": 15,
  "createdBy": "admin@example.com",
  "createdDate": "2024-12-15",
  "lastModifiedBy": "admin@example.com",
  "lastModifiedDate": "2024-12-15"
}
```

### 8.3 Cluster Entity
```json
{
  "clusterId": "CL-1234",
  "subscriptionId": "SUB-12345",
  "name": "City Properties",
  "description": "All properties within the city limits",
  "businessUnitIds": ["BU-1234", "BU-5678"],
  "expirationDate": "2025-12-31",
  "gracePeriod": 30,
  "status": "Active",
  "clusterLicensesAllocated": 8,
  "clusterLicensesUsed": 5,
  "createdBy": "admin@example.com",
  "createdDate": "2024-12-15",
  "lastModifiedBy": "admin@example.com",
  "lastModifiedDate": "2024-12-15"
}
```

### 8.4 Module Activation Entity
```json
{
  "moduleActivationId": "MA-12345",
  "businessUnitId": "BU-1234",
  "moduleName": "Accounting",
  "status": "Active",
  "startDate": "2025-01-01",
  "expirationDate": "2025-12-31",
  "gracePeriod": 30,
  "configuration": {
    "parameter1": "value1",
    "parameter2": "value2"
  },
  "createdBy": "admin@example.com",
  "createdDate": "2024-12-15",
  "lastModifiedBy": "admin@example.com",
  "lastModifiedDate": "2024-12-15"
}
```

### 8.5 User Entity
```json
{
  "userId": "USR-12345",
  "username": "jsmith@example.com",
  "firstName": "John",
  "lastName": "Smith",
  "jobTitle": "Regional Manager",
  "department": "Operations",
  "status": "Active",
  "userType": "ClusterUser",
  "clusterId": "CL-1234",
  "businessUnitId": null,
  "roleId": "ROLE-1234",
  "permissions": ["view_reports", "manage_users", "configure_modules"],
  "moduleAccess": {
    "BU-1234": ["Accounting", "Inventory", "Analytics"],
    "BU-5678": ["Accounting", "Sales", "PMS"]
  },
  "createdBy": "admin@example.com",
  "createdDate": "2024-12-15",
  "lastModifiedBy": "admin@example.com",
  "lastModifiedDate": "2024-12-15",
  "lastLoginDate": "2025-03-10"
}
```

## 9. Appendices

### 9.1 Glossary

| Term | Definition |
|------|------------|
| Business Unit (BU) | An individual operational entity within the subscription, typically representing a single hotel or property |
| Cluster | A grouping of related Business Units for administrative purposes |
| BU Staff | Users with access to a single Business Unit only |
| Cluster User | Users with access to multiple Business Units within a cluster |
| Module | A functional component of the platform that can be licensed and activated |
| License | A permission for a user to access the system and specific modules |
| Subscription | The overall contract governing platform access |

### 9.2 License Validation Pseudocode

```
FUNCTION ValidateUserAccess(userId, businessUnitId, moduleName)
  // Get user information
  user = GetUser(userId)
  
  // Check if user is active
  IF user.status != "Active" THEN
    RETURN AccessDenied("User account is not active")
  END IF
  
  // Check business unit access
  IF user.userType == "BUStaff" THEN
    // BU Staff can only access their assigned BU
    IF user.businessUnitId != businessUnitId THEN
      RETURN AccessDenied("No access to this business unit")
    END IF
    
    // Check if BU has not expired
    businessUnit = GetBusinessUnit(businessUnitId)
    IF CurrentDate > (businessUnit.expirationDate + businessUnit.gracePeriod) THEN
      RETURN AccessDenied("Business unit subscription has expired")
    END IF
    
    // Check if license count not exceeded
    IF businessUnit.staffLicensesUsed > businessUnit.staffLicensesAllocated THEN
      RETURN AccessDenied("Business unit license limit exceeded")
    END IF
  
  ELSE IF user.userType == "ClusterUser" THEN
    // Get cluster information
    cluster = GetCluster(user.clusterId)
    
    // Check if user's cluster includes this business unit
    IF businessUnitId NOT IN cluster.businessUnitIds THEN
      RETURN AccessDenied("Business unit not in user's cluster")
    END IF
    
    // Check if cluster has not expired
    IF CurrentDate > (cluster.expirationDate + cluster.gracePeriod) THEN
      RETURN AccessDenied("Cluster subscription has expired")
    END IF
    
    // Check if license count not exceeded
    IF cluster.clusterLicensesUsed > cluster.clusterLicensesAllocated THEN
      RETURN AccessDenied("Cluster license limit exceeded")
    END IF
  END IF
  
  // Check module activation
  moduleActivation = GetModuleActivation(businessUnitId, moduleName)
  IF moduleActivation == NULL OR moduleActivation.status != "Active" THEN
    RETURN AccessDenied("Module not activated for this business unit")
  END IF
  
  // Check if module has not expired
  IF CurrentDate > (moduleActivation.expirationDate + moduleActivation.gracePeriod) THEN
    RETURN AccessDenied("Module subscription has expired")
  END IF
  
  // Check user permission for this module
  IF moduleName NOT IN user.moduleAccess[businessUnitId] THEN
    RETURN AccessDenied("User does not have permission for this module")
  END IF
  
  // All checks passed
  RETURN AccessGranted()
END FUNCTION
```

### 9.3 Module Dependencies Matrix

| Module | Dependencies |
|--------|--------------|
| Accounting | None |
| Inventory | None |
| Sales | None |
| Analytics | Requires at least one of: Accounting, Inventory, Sales, PMS |
| PMS | None |
| HR | None |

### 9.4 Module Configuration Parameters

| Module | Parameter | Type | Required | Default | Description |
|--------|-----------|------|----------|---------|-------------|
| Accounting | fiscalYearStart | Date | Yes | Jan 1 | Start date of fiscal year for the Business Unit |
| Accounting | currencyCode | String | Yes | USD | Primary currency code (ISO 4217) for the Business Unit |
| Accounting | secondaryCurrencies | Array | No | [] | List of secondary currencies for the Business Unit |
| Accounting | taxRules | Object | Yes | {} | Tax calculation rules by jurisdiction for the Business Unit |
| Inventory | trackingMethod | Enum | Yes | FIFO | Inventory tracking method (FIFO, LIFO, Weighted Avg) for the Business Unit |
| Inventory | lowStockThreshold | Number | Yes | 10 | Threshold for low stock alerts (%) for the Business Unit |
| Inventory | autoReorderEnabled | Boolean | No | false | Enable automatic reordering for the Business Unit |
| Sales | commissionStructure | Enum | Yes | STANDARD | Commission calculation method for the Business Unit |
| Sales | discountApprovalThreshold | Number | Yes | 15 | Discount % requiring manager approval for the Business Unit |
| Sales | quotaTrackingEnabled | Boolean | No | true | Enable sales quota tracking for the Business Unit |
| Analytics | dataSources | Array | Yes | [] | List of data sources to analyze for the Business Unit |
| Analytics | reportSchedules | Object | No | {} | Scheduled report configurations for the Business Unit |
| Analytics | dataRetentionPeriod | Number | Yes | 24 | Months of historical data to retain for the Business Unit |
| PMS | roomTypesConfiguration | Object | Yes | {} | Room types and categories for the Business Unit |
| PMS | rateStructure | Object | Yes | {} | Rate structure configuration for the Business Unit |
| PMS | integrationPoints | Array | No | [] | Third-party system integrations for the Business Unit |
| HR | employeeTypes | Array | Yes | [] | Employee classification types for the Business Unit |
| HR | benefitPlans | Object | No | {} | Benefit plan configurations for the Business Unit |
| HR | payrollSchedule | Enum | Yes | BIWEEKLY | Payroll processing frequency for the Business Unit |

## 10. User Interface Mockups

### 10.1 Subscription Dashboard

```
+--------------------------------------------------------------+
|  SUBSCRIPTION CONTROLLING PLATFORM                [User ▼]   |
+----------------------+-----------------------------------+---+
| NAVIGATION           | Dashboard: ACME HOTELS            | 🔔 |
|                      +-----------------------------------+---+
| 📊 Dashboard         | Subscription Status: ACTIVE             |
| 🏢 Business Units    | Contract Period: Jan 1, 2025 - Dec 31, 2025 |
| 👥 Clusters          +-----------------------------------+---+
| 👤 Users             | LICENSE UTILIZATION               | + |
| 🔧 Modules           +-----------------------------------+---+
| 📈 Reports           | BU Staff Licenses                      |
| ⚙️ Settings          | [███████████████████▒▒▒▒▒] 80%         |
|                      | 52/65 licenses used                    |
+----------------------+                                        |
                       | Cluster User Licenses                  |
                       | [███████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒] 35%          |
                       | 8/23 licenses used                     |
                       +-----------------------------------+---+
                       | BUSINESS UNIT OVERVIEW           | + |
                       +-----------------------------------+---+
                       | • Downtown Hotel     🟢 Active        |
                       | • Airport Hotel      🟢 Active        |
                       | • Resort Property    🟡 Expiring soon |
                       |                                       |
                       | View all 3 business units →           |
                       +-----------------------------------+---+
                       | CLUSTERS OVERVIEW                | + |
                       +-----------------------------------+---+
                       | • City Properties    🟢 Active        |
                       | • All Properties     🟢 Active        |
                       |                                       |
                       | View all 2 clusters →                 |
                       +-----------------------------------+---+
                       | ALERTS                               |
                       +-----------------------------------+---+
                       | ⚠️ Resort Property expires in 45 days |
                       | ℹ️ Downtown Hotel approaching license |
                       |    limit (15/20)                     |
                       +-----------------------------------+---+
+--------------------------------------------------------------+
```

### 10.2 Business Unit Configuration Interface

```
+--------------------------------------------------------------+
|  SUBSCRIPTION CONTROLLING PLATFORM                [User ▼]   |
+----------------------+-----------------------------------+---+
| NAVIGATION           | Business Unit: DOWNTOWN HOTEL     | 🔔 |
|                      +-----------------------------------+---+
| 📊 Dashboard         | Status: ACTIVE                         |
| 🏢 Business Units    | Expiration: Dec 31, 2025               |
| 👥 Clusters          +-----------------------------------+---+
| 👤 Users             | GENERAL INFORMATION              | ✏️ |
| 🔧 Modules           +-----------------------------------+---+
| 📈 Reports           | ID: BU-1234                           |
| ⚙️ Settings          | Name: Downtown Hotel                  |
|                      | Location: 123 Main St, Anytown        |
+----------------------+ Tax ID: 987-65-4321                   |
                       | Contact: manager@downtown.example.com |
                       +-----------------------------------+---+
                       | MODULE ACTIVATION                | ✏️ |
                       +-----------------------------------+---+
                       | ✅ Accounting      Expires: 12/31/25  |
                       | ✅ Inventory       Expires: 12/31/25  |
                       | ⬜ Sales           Not activated      |
                       | ✅ Analytics       Expires: 12/31/25  |
                       | ⬜ PMS             Not activated      |
                       | ⬜ HR              Not activated      |
                       +-----------------------------------+---+
                       | STAFF LICENSE ALLOCATION         | ✏️ |
                       +-----------------------------------+---+
                       | Allocated: 20 licenses                |
                       | Used: 15 licenses                     |
                       | Available: 5 licenses                 |
                       |                                       |
                       | [███████████████▒▒▒▒▒] 75%            |
                       +-----------------------------------+---+
                       | ASSIGNED CLUSTERS                     |
                       +-----------------------------------+---+
                       | • City Properties                     |
                       | • All Properties                      |
                       +-----------------------------------+---+
+--------------------------------------------------------------+
```

### 10.3 Module Activation Interface

```
+--------------------------------------------------------------+
|  SUBSCRIPTION CONTROLLING PLATFORM                [User ▼]   |
+----------------------+-----------------------------------+---+
| NAVIGATION           | ACTIVATE MODULE                   | 🔔 |
|                      +-----------------------------------+---+
| 📊 Dashboard         | Business Unit: Downtown Hotel          |
| 🏢 Business Units    |                                        |
| 👥 Clusters          | Module: Accounting                     |
| 👤 Users             +-----------------------------------+---+
| 🔧 Modules           | MODULE SETTINGS                        |
| 📈 Reports           +-----------------------------------+---+
| ⚙️ Settings          | Activation Period                      |
|                      | Start Date: [01/01/2025]               |
+----------------------+ End Date:   [12/31/2025]               |
                       |                                        |
                       | Module Parameters                      |
                       | Fiscal Year Start: [01/01/2025]        |
                       | Currency Code:     [USD       ▼]       |
                       | Secondary Currencies:                  |
                       | [EUR, CAD                       ] [+]  |
                       |                                        |
                       | Tax Rules:                             |
                       | [Add tax rule                   ] [+]  |
                       |                                        |
                       | User Access                            |
                       | ✅ All BU Staff (Default)              |
                       | ⬜ Restricted (Select users only)      |
                       |                                        |
                       +-----------------------------------+---+
                       |    [CANCEL]           [ACTIVATE]      |
                       +-----------------------------------+---+
+--------------------------------------------------------------+
```

### 10.4 Cluster Configuration Interface

```
+--------------------------------------------------------------+
|  SUBSCRIPTION CONTROLLING PLATFORM                [User ▼]   |
+----------------------+-----------------------------------+---+
| NAVIGATION           | CLUSTER: CITY PROPERTIES          | 🔔 |
|                      +-----------------------------------+---+
| 📊 Dashboard         | Status: ACTIVE                         |
| 🏢 Business Units    | Expiration: Dec 31, 2025               |
| 👥 Clusters          +-----------------------------------+---+
| 👤 Users             | GENERAL INFORMATION              | ✏️ |
| 🔧 Modules           +-----------------------------------+---+
| 📈 Reports           | ID: CL-1234                           |
| ⚙️ Settings          | Name: City Properties                  |
|                      | Description: Properties in city center |
+----------------------+                                        |
                       +-----------------------------------+---+
                       | BUSINESS UNITS                   | ✏️ |
                       +-----------------------------------+---+
                       | ✅ Downtown Hotel                     |
                       | ✅ Airport Hotel                      |
                       | ⬜ Resort Property                    |
                       |                                       |
                       | [Select Business Units        ] [ADD] |
                       +-----------------------------------+---+
                       | CLUSTER USER LICENSE ALLOCATION | ✏️ |
                       +-----------------------------------+---+
                       | Allocated: 8 licenses                 |
                       | Used: 5 licenses                      |
                       | Available: 3 licenses                 |
                       |                                       |
                       | [█████████████▒▒▒▒▒▒▒] 63%            |
                       +-----------------------------------+---+
                       | CLUSTER USERS                    | + |
                       +-----------------------------------+---+
                       | • John Smith - Regional Manager      |
                       | • Jane Doe - Finance Director        |
                       | • Bob Johnson - Operations Lead      |
                       | • Alice Brown - Marketing Director   |
                       | • Tom Wilson - IT Administrator      |
                       |                                      |
                       | View all 5 users →                   |
                       +-----------------------------------+---+
+--------------------------------------------------------------+
```

### 10.5 Module License Management Interface

```
+--------------------------------------------------------------+
|  SUBSCRIPTION CONTROLLING PLATFORM                [User ▼]   |
+----------------------+-----------------------------------+---+
| NAVIGATION           | EDIT MODULE LICENSES              | 🔔 |
|                      +-----------------------------------+---+
| 📊 Dashboard         | Business Unit: Downtown Hotel          |
| 🏢 Business Units    |                                        |
| 👥 Clusters          +-----------------------------------+---+
| 👤 Users             | AVAILABLE MODULES                      |
| 🔧 Modules           +-----------------------------------+---+
| 📈 Reports           | [✓] Accounting      [✓] Inventory      |
| ⚙️ Settings          | [ ] Sales           [✓] Analytics      |
|                      | [ ] PMS             [ ] HR             |
+----------------------+                                        |
                       | Module Dependencies:                   |
                       | • Analytics requires at least one of:  |
                       |   Accounting, Inventory, Sales, PMS    |
                       |                                        |
                       +-----------------------------------+---+
                       | SELECTED MODULES                       |
                       +-----------------------------------+---+
                       | Accounting, Inventory, Analytics       |
                       |                                        |
                       +-----------------------------------+---+
                       | MODULE DISTRIBUTION                    |
                       +-----------------------------------+---+
                       | Accounting:                            |
                       | • 15 BU Staff, 5 Cluster Users        |
                       | • 67% of total users                  |
                       |                                        |
                       | Inventory:                             |
                       | • 10 BU Staff, 3 Cluster Users        |
                       | • 43% of total users                  |
                       |                                        |
                       | Analytics:                             |
                       | • 5 BU Staff, 4 Cluster Users         |
                       | • 30% of total users                  |
                       +-----------------------------------+---+
                       |    [CANCEL]           [SAVE]          |
                       +-----------------------------------+---+
+--------------------------------------------------------------+
```

## 11. Implementation Guidelines

### 11.1 Access Control Implementation

The system must implement multi-layered access control validation:

1. **Authentication Layer**
   - Validate user identity and session
   - Check user active status
   - Apply organization-wide security policies

2. **Subscription Layer**
   - Validate subscription status
   - Check subscription expiration
   - Apply subscription tier constraints

3. **Business Unit/Cluster Layer**
   - Validate BU/Cluster access rights
   - Check BU/Cluster expiration status
   - Apply BU/Cluster-specific policies

4. **Module Layer**
   - Validate module activation
   - Check module expiration
   - Apply module-specific access rules

5. **Function Layer**
   - Validate function-level permissions
   - Apply role-based access constraints
   - Enforce data access policies

### 11.2 Performance Considerations

The subscription validation system is a critical path component that must be optimized for performance:

1. **Caching Strategy**
   - Cache subscription configuration for fast access
   - Implement invalidation triggers for configuration changes
   - Use tiered caching (memory, distributed, persistent)

2. **Database Optimization**
   - Index all fields used in access validation
   - Denormalize validation-critical data where appropriate
   - Implement query optimization for license validation paths

3. **Asynchronous Processing**
   - Handle non-critical operations asynchronously
   - Use job queues for reporting and analytics
   - Implement background processing for compliance checks

4. **Bulk Operations**
   - Optimize bulk license operations
   - Implement batch processing for configuration changes
   - Provide efficient bulk user management

### 11.3 Audit and Compliance

The system must maintain comprehensive audit trails:

1. **Audit Requirements**
   - Record all subscription configuration changes
   - Track license allocation and usage
   - Log all access validation decisions
   - Maintain immutable history of contract changes

2. **Compliance Reporting**
   - Provide license compliance reports
   - Generate audit-ready configuration history
   - Track all administrative actions
   - Support regulatory reporting requirements

3. **Data Retention**
   - Implement configurable data retention policies
   - Provide data archiving capabilities
   - Support data export for compliance purposes
   - Implement secure data purging

## 12. Testing Requirements

### 12.1 Functional Testing

| Test Category | Description | Test Cases |
|---------------|-------------|------------|
| Business Unit Configuration | Validate BU creation and settings | - Create BU with valid data<br>- Attempt to create BU with duplicate name<br>- Modify BU settings<br>- Set BU expiration date beyond subscription |
| Module Activation | Test module activation logic | - Activate module for BU<br>- Configure module parameters<br>- Activate module with dependencies<br>- Deactivate module with dependents |
| License Allocation | Test license allocation rules | - Allocate BU staff licenses within limits<br>- Attempt over-allocation<br>- Allocate cluster user licenses<br>- Reduce allocation below usage |
| User Access | Test user access controls | - BU staff accessing own BU<br>- BU staff attempting to access other BUs<br>- Cluster user accessing multiple BUs<br>- Access attempts after expiration |

### 12.2 Integration Testing

| Test Category | Description | Test Cases |
|---------------|-------------|------------|
| Module Integration | Test module access controls | - Module activation status changes<br>- Module expiration handling<br>- Cross-module dependencies |
| External Systems | Test integration points | - CRM data exchange<br>- Financial system interactions<br>- Support system integration |
| Authentication | Test auth integration | - SSO validation<br>- Role mapping<br>- Permission inheritance |

### 12.3 Performance Testing

| Test Category | Description | Test Cases |
|---------------|-------------|------------|
| License Validation | Test validation performance | - Single user validation (max 500ms)<br>- Concurrent validation (100 simultaneous)<br>- Sustained load (1000 validations/minute) |
| Configuration Operations | Test configuration performance | - Business Unit creation (max 5s)<br>- Module activation (max 3s)<br>- User assignment (max 2s) |
| Reporting | Test reporting performance | - Dashboard loading (max 2s)<br>- Standard reports (max 5s)<br>- Custom reports (max 30s) |

## 13. API Specifications

### 13.1 License Validation API

#### 13.1.1 Validate User Access

**Endpoint:** `POST /api/v1/access/validate`

**Request:**
```json
{
  "userId": "USR-12345",
  "businessUnitId": "BU-1234",
  "moduleName": "Accounting",
  "functionId": "FUNC-1234"
}
```

**Response (Success):**
```json
{
  "status": "granted",
  "userId": "USR-12345",
  "businessUnitId": "BU-1234",
  "moduleName": "Accounting",
  "functionId": "FUNC-1234",
  "permissions": ["view", "edit", "delete"],
  "restrictions": [],
  "validationTime": "2025-03-12T14:30:45Z"
}
```

**Response (Denied):**
```json
{
  "status": "denied",
  "userId": "USR-12345",
  "businessUnitId": "BU-1234",
  "moduleName": "Accounting",
  "functionId": "FUNC-1234",
  "reason": "Module not activated for this business unit",
  "validationTime": "2025-03-12T14:30:45Z"
}
```

### 13.2 Business Unit Configuration API

#### 13.2.1 Create Business Unit

**Endpoint:** `POST /api/v1/business-units`

**Request:**
```json
{
  "name": "Downtown Hotel",
  "description": "Our flagship downtown location",
  "location": "123 Main St, Anytown, ST",
  "country": "United States",
  "timeZone": "America/New_York",
  "taxId": "987-65-4321",
  "contactEmail": "manager@downtown.example.com",
  "contactPhone": "+1-555-123-4567",
  "expirationDate": "2025-12-31",
  "gracePeriod": 30
}
```

**Response:**
```json
{
  "businessUnitId": "BU-1234",
  "name": "Downtown Hotel",
  "description": "Our flagship downtown location",
  "location": "123 Main St, Anytown, ST",
  "country": "United States",
  "timeZone": "America/New_York",
  "taxId": "987-65-4321",
  "contactEmail": "manager@downtown.example.com",
  "contactPhone": "+1-555-123-4567",
  "startDate": "2025-01-01",
  "expirationDate": "2025-12-31",
  "gracePeriod": 30,
  "status": "Active",
  "staffLicensesAllocated": 0,
  "staffLicensesUsed": 0,
  "creationTime": "2025-03-12T14:30:45Z"
}
```

#### 13.2.2 Allocate Staff Licenses

**Endpoint:** `POST /api/v1/business-units/{businessUnitId}/licenses`

**Request:**
```json
{
  "staffLicensesAllocated": 20
}
```

**Response:**
```json
{
  "businessUnitId": "BU-1234",
  "staffLicensesAllocated": 20,
  "staffLicensesUsed": 0,
  "staffLicensesAvailable": 20,
  "updateTime": "2025-03-12T14:35:12Z"
}
```

### 13.3 Module Activation API

#### 13.3.1 Activate Module

**Endpoint:** `POST /api/v1/business-units/{businessUnitId}/modules`

**Request:**
```json
{
  "moduleName": "Accounting",
  "startDate": "2025-01-01",
  "expirationDate": "2025-12-31",
  "gracePeriod": 30,
  "configuration": {
    "fiscalYearStart": "2025-01-01",
    "currencyCode": "USD",
    "secondaryCurrencies": ["EUR", "CAD"],
    "taxRules": {}
  }
}
```

**Response:**
```json
{
  "moduleActivationId": "MA-12345",
  "businessUnitId": "BU-1234",
  "moduleName": "Accounting",
  "status": "Active",
  "startDate": "2025-01-01",
  "expirationDate": "2025-12-31",
  "gracePeriod": 30,
  "configuration": {
    "fiscalYearStart": "2025-01-01",
    "currencyCode": "USD",
    "secondaryCurrencies": ["EUR", "CAD"],
    "taxRules": {}
  },
  "activationTime": "2025-03-12T14:40:22Z"
}
```

### 13.4 Cluster Configuration API

#### 13.4.1 Create Cluster

**Endpoint:** `POST /api/v1/clusters`

**Request:**
```json
{
  "name": "City Properties",
  "description": "All properties within the city limits",
  "businessUnitIds": ["BU-1234", "BU-5678"],
  "expirationDate": "2025-12-31",
  "gracePeriod": 30
}
```

**Response:**
```json
{
  "clusterId": "CL-1234",
  "name": "City Properties",
  "description": "All properties within the city limits",
  "businessUnitIds": ["BU-1234", "BU-5678"],
  "expirationDate": "2025-12-31",
  "gracePeriod": 30,
  "status": "Active",
  "clusterLicensesAllocated": 0,
  "clusterLicensesUsed": 0,
  "creationTime": "2025-03-12T14:45:33Z"
}
```

#### 13.4.2 Allocate Cluster User Licenses

**Endpoint:** `POST /api/v1/clusters/{clusterId}/licenses`

**Request:**
```json
{
  "clusterLicensesAllocated": 8
}
```

**Response:**
```json
{
  "clusterId": "CL-1234",
  "clusterLicensesAllocated": 8,
  "clusterLicensesUsed": 0,
  "clusterLicensesAvailable": 8,
  "updateTime": "2025-03-12T14:50:15Z"
}
```

## 14. Acceptance Criteria

### 14.1 Business Unit Configuration

1. Administrators can create, edit, and manage Business Units
2. Each Business Unit can have its own expiration date
3. System enforces validation of Business Unit data
4. Business Unit creation includes all required metadata
5. Business Unit status changes automatically based on expiration
6. Grace period functionality works as specified

### 14.2 Module Activation

1. Administrators can activate modules for specific Business Units
2. Module activation respects subscription tier limitations
3. Module dependencies are enforced
4. Module-specific configuration parameters can be set
5. Module expiration works independently of Business Unit expiration
6. Module activation status changes are immediately reflected in access control

### 14.3 License Allocation

1. BU staff licenses can be allocated at the Business Unit level
2. Cluster user licenses can be allocated at the Cluster level
3. License allocation respects subscription limits
4. License usage is accurately tracked and reported
5. License validation works correctly for all user types
6. License allocation cannot be reduced below current usage

### 14.4 User Experience

1. All interfaces are responsive and work on desktop and tablet devices
2. Dashboard loads within 2 seconds under normal conditions
3. Configuration changes are applied within 5 seconds
4. Error messages are clear and actionable
5. Notification system delivers alerts through specified channels
6. Reports are generated within specified performance parameters

## 15. Change Management

### 15.1 Version Compatibility

This functionality must maintain backward compatibility with existing subscription data. The following transitions must be supported:

1. Migration from flat subscription model to BU/Cluster model
2. Conversion of global licenses to BU-specific licenses
3. Creation of clusters from existing BU groupings
4. Preservation of historical subscription data through model changes

### 15.2 Feature Rollout

The implementation will follow a phased rollout:

1. **Phase 1**: Basic Business Unit configuration and module activation
2. **Phase 2**: Cluster configuration and license allocation
3. **Phase 3**: Advanced reporting and analytics
4. **Phase 4**: API access for external integrations

Each phase will include a beta testing period with selected customers before general availability.