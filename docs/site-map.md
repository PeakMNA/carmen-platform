# Carmen Platform Site Map

## Public Area
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset

## Admin Dashboard
- `/admin/dashboard` - Main dashboard
  - Overview metrics
  - Recent activity
  - Quick actions
  - System status

## Clusters Management
- `/admin/clusters` - Clusters overview
  - List of all clusters
  - Cluster metrics
  - Add/Edit clusters

### Cluster Details
- `/admin/clusters/[clusterId]` - Individual cluster view
  - Cluster overview
  - Performance metrics
  - Resource allocation

### Business Units
- `/admin/clusters/[clusterId]/business-units` - Business units list
  - Unit metrics
  - Active units
  - Resource usage
  - Team distribution

#### Business Unit Management
- `/admin/clusters/[clusterId]/business-units/add` - Add new business unit
  - Basic information
  - Location details
  - Contact information
  - Notification settings
- `/admin/clusters/[clusterId]/business-units/[businessUnitId]` - Business unit details
  - Overview
  - Teams
  - Tenants
  - Resources
- `/admin/clusters/[clusterId]/business-units/[businessUnitId]/edit` - Edit business unit
  - Update information
  - Modify settings
  - Manage integrations

## User Management
- `/admin/users` - Users overview
  - User list
  - Role management
  - Access control
  - User metrics

### User Details
- `/admin/users/[userId]` - Individual user view
  - Profile information
  - Access rights
  - Activity history
- `/admin/users/[userId]/edit` - Edit user profile
  - Update information
  - Modify permissions
  - Change settings

## Reports
- `/admin/reports` - Reports dashboard
  - Report templates
  - Generated reports
  - Scheduled reports
- `/admin/reports/[reportId]` - Report details
  - Report data
  - Export options
  - Share settings
- `/admin/reports/generate` - Generate new report
  - Template selection
  - Data filters
  - Output format

## Support
- `/admin/support` - Support center
  - Help articles
  - Contact options
  - System status
- `/admin/support/tickets` - Support tickets
  - Active tickets
  - Ticket history
  - Response metrics
- `/admin/support/knowledge-base` - Knowledge base
  - Articles
  - Tutorials
  - FAQs

## Settings
- `/admin/settings` - Platform settings
  - General settings
  - Security settings
  - Notification preferences
- `/admin/settings/profile` - User profile settings
  - Personal information
  - Preferences
  - Security settings
- `/admin/settings/organization` - Organization settings
  - Company details
  - Branding
  - Billing
- `/admin/settings/integrations` - Integration settings
  - API configuration
  - Webhook setup
  - Third-party services

## API Documentation
- `/docs/api` - API documentation
  - Authentication
  - Endpoints
  - Examples
- `/docs/api/reference` - API reference
  - Methods
  - Parameters
  - Response formats

## Change Frequency
- Daily Updates:
  - Dashboard
  - Business Units
  - Reports
  - Support Tickets
- Weekly Updates:
  - Users
  - Support Articles
  - Knowledge Base
- Monthly Updates:
  - Settings
  - Organization Details
  - Integration Configurations
- Yearly Updates:
  - API Documentation
  - Platform Information
  - Legal Documents

## SEO Priorities
1. High Priority (1.0)
   - Landing Page
   - Login
   - Dashboard
2. Medium Priority (0.8)
   - Clusters
   - Business Units
   - Reports
3. Lower Priority (0.6)
   - Settings
   - Support
   - Documentation
