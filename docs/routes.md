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