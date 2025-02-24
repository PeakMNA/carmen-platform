# Route Structure

## Admin Routes

### Dashboard
- `/admin/dashboard` - Main dashboard

### Clusters
- `/admin/clusters` - Clusters list
- `/admin/clusters/[clusterId]` - Cluster details
- `/admin/clusters/[clusterId]/business-units` - Business units in cluster
- `/admin/clusters/[clusterId]/business-units/add` - Add business unit to cluster
- `/admin/clusters/[clusterId]/business-units/[businessUnitId]` - Business unit details
- `/admin/clusters/[clusterId]/business-units/[businessUnitId]/edit` - Edit business unit

### Users
- `/admin/users` - Users management
- `/admin/users/[userId]` - User details
- `/admin/users/[userId]/edit` - Edit user

### Reports
- `/admin/reports` - Reports dashboard
- `/admin/reports/[reportId]` - Report details
- `/admin/reports/generate` - Generate new report

### Support
- `/admin/support` - Support dashboard
- `/admin/support/tickets` - Support tickets
- `/admin/support/knowledge-base` - Knowledge base

### Settings
- `/admin/settings` - Platform settings
- `/admin/settings/profile` - User profile settings
- `/admin/settings/organization` - Organization settings
- `/admin/settings/integrations` - Integration settings

## API Routes

### Business Units
- `POST /api/clusters/[clusterId]/business-units` - Create business unit
- `GET /api/clusters/[clusterId]/business-units` - List business units
- `GET /api/clusters/[clusterId]/business-units/[businessUnitId]` - Get business unit
- `PUT /api/clusters/[clusterId]/business-units/[businessUnitId]` - Update business unit
- `DELETE /api/clusters/[clusterId]/business-units/[businessUnitId]` - Delete business unit

#### Business Unit Role Management
- `GET /api/business-units/[businessUnitId]/users/[userId]/roles` - Get user roles
- `POST /api/business-units/[businessUnitId]/users/[userId]/roles` - Add roles to user
- `DELETE /api/business-units/[businessUnitId]/users/[userId]/roles` - Remove roles from user
- `PUT /api/business-units/[businessUnitId]/users/[userId]/roles` - Sync user roles

Required Headers:
- `x-system-id`: Supply chain system identifier
- `x-api-key`: System API key

### Users
- `POST /api/users` - Create user
- `GET /api/users` - List users
- `GET /api/users/[userId]` - Get user
- `PUT /api/users/[userId]` - Update user
- `DELETE /api/users/[userId]` - Delete user

### Reports
- `POST /api/reports` - Generate report
- `GET /api/reports` - List reports
- `GET /api/reports/[reportId]` - Get report
- `DELETE /api/reports/[reportId]` - Delete report

### Report Templates
- `GET /api/reports/templates` - List all system templates
- `POST /api/reports/templates` - Create new system template
- `GET /api/reports/templates/[templateId]` - Get template details
- `PUT /api/reports/templates/[templateId]` - Update system template
- `DELETE /api/reports/templates/[templateId]` - Delete system template
- `POST /api/reports/templates/[templateId]/validate` - Validate template

#### Business Unit (Tenant) Template Management
- `GET /api/business-units/[businessUnitId]/templates` - List business unit templates
- `POST /api/business-units/[businessUnitId]/templates/assign` - Assign system templates to business unit
- `PUT /api/business-units/[businessUnitId]/templates/[templateId]` - Update business unit template
- `DELETE /api/business-units/[businessUnitId]/templates/[templateId]` - Remove template from business unit
- `POST /api/business-units/[businessUnitId]/templates/[templateId]/customize` - Create customized version
- `PUT /api/business-units/[businessUnitId]/templates/[templateId]/config` - Update template configuration
  - Set cluster assignment
  - Configure database settings
  - Set integration parameters
