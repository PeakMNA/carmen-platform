# Subscription Management User Flow Diagram

## 1. Subscription Overview

```mermaid
flowchart TD
    A[Admin Accesses Subscription Page] --> B[View Subscription Dashboard]
    B --> C{Choose Action}
    C -->|View Details| D[Expand Subscription Card]
    C -->|Manage Business Units| E[Navigate to Business Units Page]
    C -->|Manage Clusters| F[Navigate to Clusters Page]
    C -->|View Plans| G[Navigate to Plans Page]
    C -->|View Reports| H[Navigate to Reports Page]
    C -->|View Invoices| I[Navigate to Invoices Page]
    
    D --> J{Expanded Card Options}
    J -->|Manage Licenses| K[View License Management]
    J -->|Edit Limits| L[Open Edit Limits Dialog]
    J -->|Edit Modules| M[Open Edit Modules Dialog]
    J -->|Hide Details| N[Collapse Card]
    
    K --> O{License Management}
    O -->|Add BU Staff| P[Open Add BU Staff Dialog]
    O -->|Add Cluster User| Q[Open Add Cluster User Dialog]
    O -->|View Users| R[View User Tables]
    
    L --> S[Update BU Staff/Cluster User Limits]
    L --> T[Save Changes]
    
    M --> U[Toggle Module Activation]
    M --> V[Save Module Changes]
    
    P --> W[Fill New BU Staff Form]
    W --> X[Select Modules]
    X --> Y[Save New User]
    
    Q --> Z[Fill New Cluster User Form]
    Z --> AA[Select Modules]
    AA --> AB[Save New User]
```

## 2. Business Unit Management

```mermaid
flowchart TD
    A[Admin Accesses Business Units Page] --> B[View Business Units List]
    B --> C{Choose Action}
    C -->|Create New| D[Open Create Business Unit Dialog]
    C -->|Edit Existing| E[Navigate to Business Unit Detail Page]
    C -->|Filter List| F[Apply Filters]
    C -->|Search| G[Enter Search Term]
    
    D --> H[Fill Business Unit Form]
    H --> I[Set Basic Information]
    I --> J[Set Expiration Date]
    J --> K[Save New Business Unit]
    
    E --> L{Business Unit Detail Tabs}
    L -->|General| M[Edit General Information]
    L -->|Modules| N[Manage Module Activation]
    L -->|Users| O[Manage BU Staff]
    L -->|Expiration| P[Set Expiration Settings]
    
    N --> Q[Toggle Module Activation]
    Q --> R[Configure Module Settings]
    R --> S[Save Module Configuration]
    
    O --> T{User Management}
    T -->|Add User| U[Open Add User Dialog]
    T -->|Remove User| V[Confirm User Removal]
    T -->|Edit Role| W[Change User Role]
    
    U --> X[Fill User Form]
    X --> Y[Select Modules]
    Y --> Z[Save New User]
    
    P --> AA[Set Expiration Date]
    AA --> AB[Set Grace Period]
    AB --> AC[Save Expiration Settings]
```

## 3. Cluster Management

```mermaid
flowchart TD
    A[Admin Accesses Clusters Page] --> B[View Clusters List]
    B --> C{Choose Action}
    C -->|Create New| D[Open Create Cluster Dialog]
    C -->|Edit Existing| E[Navigate to Cluster Detail Page]
    C -->|Filter List| F[Apply Filters]
    C -->|Search| G[Enter Search Term]
    
    D --> H[Fill Cluster Form]
    H --> I[Set Basic Information]
    I --> J[Select Business Units]
    J --> K[Set Expiration Date]
    K --> L[Save New Cluster]
    
    E --> M{Cluster Detail Tabs}
    M -->|General| N[Edit General Information]
    M -->|Business Units| O[Manage Business Units]
    M -->|Users| P[Manage Cluster Users]
    M -->|Expiration| Q[Set Expiration Settings]
    
    O --> R[Add/Remove Business Units]
    R --> S[Save Business Unit Changes]
    
    P --> T{User Management}
    T -->|Add User| U[Open Add User Dialog]
    T -->|Remove User| V[Confirm User Removal]
    T -->|Edit Access| W[Change Business Unit Access]
    
    U --> X[Fill User Form]
    X --> Y[Select Business Units]
    Y --> Z[Select Modules]
    Z --> AA[Save New User]
    
    Q --> AB[Set Expiration Date]
    AB --> AC[Set Grace Period]
    AC --> AD[Save Expiration Settings]
```

## 4. Module License Management

```mermaid
flowchart TD
    A[Admin Accesses Module Management] --> B{Access Point}
    B -->|From Subscription Card| C[Open Edit Modules Dialog]
    B -->|From Business Unit Detail| D[Select Modules Tab]
    
    C --> E[View Available Modules]
    E --> F[Toggle Module Activation]
    F --> G[View Module Distribution]
    G --> H[Save Module Changes]
    
    D --> I[View Business Unit Modules]
    I --> J[Toggle Module Activation]
    J --> K[Configure Module Settings]
    K --> L{Module Type}
    L -->|Accounting| M[Configure Accounting Settings]
    L -->|Inventory| N[Configure Inventory Settings]
    L -->|Sales| O[Configure Sales Settings]
    L -->|Analytics| P[Configure Analytics Settings]
    L -->|PMS| Q[Configure PMS Settings]
    
    M --> R[Save Module Configuration]
    N --> R
    O --> R
    P --> R
    Q --> R
```

## 5. License Management

```mermaid
flowchart TD
    A[Admin Accesses License Management] --> B{Access Point}
    B -->|From Subscription Card| C[View License Management Section]
    B -->|From Business Unit Detail| D[Select Users Tab]
    B -->|From Cluster Detail| E[Select Users Tab]
    
    C --> F{License Management Options}
    F -->|Manage BU Staff| G[View BU Staff Table]
    F -->|Manage Cluster Users| H[View Cluster Users Table]
    F -->|Edit Limits| I[Open Edit Limits Dialog]
    
    G --> J{BU Staff Actions}
    J -->|Add User| K[Open Add BU Staff Dialog]
    J -->|Remove User| L[Confirm User Removal]
    J -->|Edit Role| M[Change User Role]
    
    H --> N{Cluster User Actions}
    N -->|Add User| O[Open Add Cluster User Dialog]
    N -->|Remove User| P[Confirm User Removal]
    N -->|Edit Access| Q[Change Business Unit Access]
    
    I --> R[Update BU Staff Limit]
    R --> S[Update Cluster User Limit]
    S --> T[Save Limit Changes]
    
    K --> U[Fill User Form]
    U --> V[Select Modules]
    V --> W[Save New User]
    
    O --> X[Fill User Form]
    X --> Y[Select Business Units]
    Y --> Z[Select Modules]
    Z --> AA[Save New User]
    
    D --> AB[View Business Unit Users]
    AB --> AC{User Actions}
    AC -->|Add User| AD[Open Add User Dialog]
    AC -->|Remove User| AE[Confirm User Removal]
    AC -->|Edit Role| AF[Change User Role]
    
    E --> AG[View Cluster Users]
    AG --> AH{User Actions}
    AH -->|Add User| AI[Open Add User Dialog]
    AH -->|Remove User| AJ[Confirm User Removal]
    AH -->|Edit Access| AK[Change Business Unit Access]
```

## 6. Subscription Plans

```mermaid
flowchart TD
    A[Admin Accesses Plans Page] --> B[View Available Plans]
    B --> C{Plan Comparison}
    C -->|Basic| D[View Basic Plan Details]
    C -->|Professional| E[View Professional Plan Details]
    C -->|Enterprise| F[View Enterprise Plan Details]
    
    D --> G{Basic Plan Tabs}
    G -->|Overview| H[View Basic Features]
    G -->|Configuration Details| I[View Basic Configuration]
    
    E --> J{Professional Plan Tabs}
    J -->|Overview| K[View Professional Features]
    J -->|Configuration Details| L[View Professional Configuration]
    
    F --> M{Enterprise Plan Tabs}
    M -->|Overview| N[View Enterprise Features]
    M -->|Configuration Details| O[View Enterprise Configuration]
    
    B --> P[View Subscription Formula]
    P --> Q[Understand Pricing Model]
```

## 7. Subscription Reports

```mermaid
flowchart TD
    A[Admin Accesses Reports Page] --> B[View Available Reports]
    B --> C{Report Types}
    C -->|License Utilization| D[View License Report]
    C -->|Module Activation| E[View Module Report]
    C -->|User Access| F[View User Access Report]
    C -->|Expiration| G[View Expiration Report]
    
    D --> H[Filter License Report]
    H --> I[Export License Report]
    
    E --> J[Filter Module Report]
    J --> K[Export Module Report]
    
    F --> L[Filter User Access Report]
    L --> M[Export User Access Report]
    
    G --> N[Filter Expiration Report]
    N --> O[Export Expiration Report]
```

## 8. Hotel Invoices

```mermaid
flowchart TD
    A[Admin Accesses Hotel Invoices Page] --> B[View Invoice List]
    B --> C{Invoice Actions}
    C -->|Filter| D[Apply Filters]
    C -->|Search| E[Enter Search Term]
    C -->|View Details| F[Open Invoice Detail]
    C -->|Export| G[Export Invoices]
    
    D --> H[Filter by Hotel]
    H --> I[Filter by Status]
    I --> J[Filter by Date]
    J --> K[Apply Filters]
    
    F --> L[View Invoice Information]
    L --> M[View Line Items]
    M --> N[View Payment Status]
    N --> O{Invoice Options}
    O -->|Download PDF| P[Download Invoice PDF]
    O -->|Mark as Paid| Q[Update Payment Status]
    O -->|Send Reminder| R[Send Payment Reminder]
```

## 9. License Validation Flow

```mermaid
flowchart TD
    A[User Attempts to Access Module] --> B{Validation Process}
    B -->|Check User Status| C{User Active?}
    C -->|No| D[Access Denied: Inactive User]
    C -->|Yes| E{Check User Type}
    
    E -->|BU Staff| F{Check BU Access}
    E -->|Cluster User| G{Check Cluster Access}
    
    F -->|No Access| H[Access Denied: No BU Access]
    F -->|Has Access| I{Check BU Expiration}
    
    G -->|No Access| J[Access Denied: No Cluster Access]
    G -->|Has Access| K{Check Cluster Expiration}
    
    I -->|Expired| L[Access Denied: BU Expired]
    I -->|Active| M{Check Module Activation}
    
    K -->|Expired| N[Access Denied: Cluster Expired]
    K -->|Active| O{Check BU in Cluster}
    
    O -->|BU Not in Cluster| P[Access Denied: BU Not in Cluster]
    O -->|BU in Cluster| Q{Check Module Activation}
    
    M -->|Not Activated| R[Access Denied: Module Not Activated]
    M -->|Activated| S{Check Module Permission}
    
    Q -->|Not Activated| T[Access Denied: Module Not Activated]
    Q -->|Activated| U{Check Module Permission}
    
    S -->|No Permission| V[Access Denied: No Module Permission]
    S -->|Has Permission| W[Access Granted: BU Staff]
    
    U -->|No Permission| X[Access Denied: No Module Permission]
    U -->|Has Permission| Y[Access Granted: Cluster User]
```

## 10. Complete Subscription Management Flow

```mermaid
flowchart TD
    A[Admin Accesses Subscription Management] --> B{Main Navigation}
    B -->|Overview| C[View Subscription Dashboard]
    B -->|Business Units| D[Manage Business Units]
    B -->|Clusters| E[Manage Clusters]
    B -->|Plans| F[View Subscription Plans]
    B -->|Reports| G[View Subscription Reports]
    B -->|Invoices| H[Manage Hotel Invoices]
    
    C --> I{Subscription Actions}
    I -->|Expand Details| J[View Expanded Card]
    I -->|Manage Licenses| K[Access License Management]
    I -->|Edit Limits| L[Update License Limits]
    I -->|Edit Modules| M[Manage Module Activation]
    
    D --> N{Business Unit Actions}
    N -->|Create| O[Create New Business Unit]
    N -->|Edit| P[Edit Business Unit Details]
    N -->|Activate Modules| Q[Configure Module Activation]
    N -->|Manage Users| R[Manage BU Staff]
    
    E --> S{Cluster Actions}
    S -->|Create| T[Create New Cluster]
    S -->|Edit| U[Edit Cluster Details]
    S -->|Assign BUs| V[Assign Business Units]
    S -->|Manage Users| W[Manage Cluster Users]
    
    K --> X{License Management}
    X -->|Add Users| Y[Add New Users]
    X -->|Remove Users| Z[Remove Existing Users]
    X -->|Edit Roles| AA[Update User Roles]
    X -->|Update Limits| AB[Change License Limits]
    
    M --> AC{Module Management}
    AC -->|Activate| AD[Activate Modules]
    AC -->|Deactivate| AE[Deactivate Modules]
    AC -->|Configure| AF[Configure Module Settings]
    AC -->|View Usage| AG[View Module Distribution]
    
    G --> AH{Report Types}
    AH -->|License| AI[View License Reports]
    AH -->|Module| AJ[View Module Reports]
    AH -->|User| AK[View User Reports]
    AH -->|Expiration| AL[View Expiration Reports]
``` 