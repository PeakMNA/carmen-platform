# Carmen Platform Site Map

## Public Pages
- / (Landing Page)
- /login
- /register
- /contact
- /support
- /pricing

## Authentication
- /auth/login
- /auth/register
- /auth/forgot-password
- /auth/reset-password
- /auth/verify-email

## Dashboard
- /dashboard
  - Platform Admin View
  - Cluster Admin View
  - Hotel Manager View
  - Staff View

## Platform Administration
- /admin
  - /clusters
    - Overview
    - /[clusterId]
      - Details
      - Settings
      - /business-units
        - List
        - /[businessUnitId]
          - Details
          - Users
          - Templates
          - Settings
      - /templates
        - Library
        - Assignments
      - /members
        - Users
        - Roles
  - /templates
    - Library
    - Categories
    - Data Points
  - /users
    - All Users
    - Roles
    - Permissions
  - /settings
    - Platform Settings
    - Security
    - Integrations
    - Subscription

## Cluster Management
- /clusters/[clusterId]
  - Dashboard
  - /business-units
    - List
    - Management
  - /templates
    - Available Templates
    - Assignments
  - /members
    - Staff
    - Roles
  - /reports
    - Generation
    - History
  - /settings
    - Cluster Settings
    - Notifications
    - Integrations

## Hotel Management
- /hotels/[hotelId]
  - Dashboard
  - /staff
    - Members
    - Departments
    - Roles
  - /reports
    - Templates
    - Generation
    - History
  - /settings
    - Hotel Settings
    - Notifications
    - Preferences

## Report Management
- /reports
  - /templates
    - Library
    - Categories
    - Data Points
  - /assignments
    - By Cluster
    - By Hotel
  - /generation
    - New Report
    - History
  - /settings
    - Preferences
    - Schedules
    - Distribution

## User Management
- /users
  - /platform
    - All Users
    - Roles
    - Access Logs
  - /clusters
    - By Cluster
    - Roles
    - Activity
  - /hotels
    - By Hotel
    - Departments
    - Staff

## Settings
- /settings
  - /profile
    - Personal Info
    - Preferences
    - Security
  - /organization
    - Details
    - Branding
    - Policies
  - /security
    - Access Control
    - MFA
    - Audit Logs
  - /notifications
    - Preferences
    - Channels
    - Rules
  - /subscription
    - Plans
    - Usage
    - Billing

## Support
- /support
  - /tickets
    - Active
    - Resolved
    - Create New
  - /knowledge-base
    - Articles
    - Guides
    - FAQs
  - /contact
    - Support Team
    - Feedback
    - Help Center

## API Documentation
- /docs
  - /api
    - Reference
    - Authentication
    - Endpoints
    - Examples
  - /guides
    - Getting Started
    - Integration
    - Best Practices
  - /sdks
    - Libraries
    - Tools
    - Resources
