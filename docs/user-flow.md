# Carmen Platform User Flows

## Authentication Flows

### Sign In
1. User arrives at login page
2. Chooses authentication method:
   - Email/Password
   - OAuth (Google, GitHub)
   - SSO (Enterprise)
3. Completes authentication
4. If MFA enabled:
   - Enters TOTP code or
   - Responds to SMS verification
5. Redirects to role-specific dashboard:
   - Platform Admin: Global dashboard
   - Cluster Admin: Cluster dashboard
   - Hotel Manager: Hotel dashboard
   - Staff: Department dashboard

### Sign Up
1. User selects "Create Account"
2. Chooses account type:
   - Platform Admin
   - Cluster Admin
   - Hotel Manager
3. Provides required information:
   - Email
   - Password
   - Organization details
4. Verifies email address
5. Sets up MFA (optional)
6. Completes organization setup

## Platform Administration

### Hotel Group (Cluster) Management
1. Platform Admin accesses cluster management
2. Performs cluster operations:
   - Creates new clusters
   - Modifies existing clusters
   - Manages cluster settings
3. Assigns Cluster Admins
4. Configures cluster-wide policies
5. Reviews cluster performance

### User Management
1. Admin accesses user management (scope based on role):
   - Platform Admin: All users
   - Cluster Admin: Cluster users
   - Hotel Manager: Hotel staff
2. Filters users by:
   - Platform role
   - Hotel group (if applicable)
   - Status
3. Performs user operations:
   - Creates new users
   - Modifies existing users
   - Manages roles
   - Deactivates accounts
4. Sets up team structures
5. Configures access policies

## Report Management

### Template Library Management
1. Platform Admin accesses template library
2. Manages templates:
   - Creates new templates
   - Modifies existing templates
   - Archives old templates
3. Configures template settings:
   - Categories
   - Data points
   - Generation rules
4. Reviews template usage

### Template Assignment
1. Cluster Admin accesses report management
2. Views available templates
3. Selects templates for assignment
4. Chooses target cluster
5. Configures assignment settings:
   - Schedule
   - Distribution rules
   - Access permissions
6. Reviews and confirms assignment

### Report Generation
1. User accesses reports section
2. Views assigned templates
3. Selects report template
4. Configures parameters:
   - Time period
   - Data points
   - Format options
5. Generates report
6. Views or downloads output

## Security Operations

### Access Control
1. Admin accesses security settings (scope based on role)
2. Configures:
   - Password policies
   - MFA requirements
   - Session timeouts
   - IP restrictions
3. Reviews security logs
4. Manages security incidents

### Audit Operations
1. Security admin accesses audit logs
2. Reviews:
   - User activities
   - System changes
   - Security events
3. Filters by:
   - Cluster
   - Hotel
   - User role
4. Generates audit reports
5. Investigates anomalies

## Notification Management

### Configuration
1. Admin accesses notification settings
2. Configures channels:
   - In-app notifications
   - Email alerts
   - SMS notifications
   - Webhooks
3. Sets up notification rules:
   - By role
   - By cluster
   - By event type
4. Tests notification delivery

### User Preferences
1. User accesses notification preferences
2. Configures:
   - Preferred channels
   - Notification frequency
   - Priority levels
3. Sets up filters:
   - By report type
   - By event type
   - By urgency
4. Tests settings

## Integration Workflows

### API Setup
1. Developer accesses API settings
2. Generates API credentials
3. Configures:
   - Rate limits
   - Access scopes
   - Webhook endpoints
4. Sets up cluster-specific integrations
5. Tests integration
6. Monitors usage

### Webhook Management
1. Admin accesses webhook configuration
2. Sets up endpoints
3. Configures:
   - Event triggers
   - Payload format
   - Retry policies
4. Configures cluster-specific webhooks
5. Tests webhook delivery
6. Monitors performance

## Cluster Operations

### Cluster Setup
1. Platform Admin creates new cluster
2. Configures basic settings:
   - Cluster name
   - Region
   - Contact information
3. Sets up initial structure:
   - Departments
   - Roles
   - Permissions
4. Assigns Cluster Admin
5. Reviews and activates

### Hotel Management
1. Cluster Admin accesses hotel management
2. Performs hotel operations:
   - Adds new hotels
   - Updates hotel information
   - Manages hotel settings
3. Assigns Hotel Managers
4. Configures hotel-specific settings
5. Reviews hotel performance

### Staff Management
1. Hotel Manager accesses staff management
2. Manages staff members:
   - Adds new staff
   - Updates roles
   - Manages permissions
3. Assigns departments
4. Sets up schedules
5. Reviews staff performance
