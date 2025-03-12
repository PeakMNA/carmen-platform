# Carmen Platform Navigation Structure

## Main Navigation

The Carmen Platform uses a sidebar navigation system with the following main sections:

### Dashboard
- **Dashboard** - `/admin/dashboard`
  - Main administrative dashboard

### Business Units
- **Business Units** - `/admin/business-units/manage`
  - **All Units** - `/admin/business-units/manage`
  - **Templates** - `/admin/business-units/templates`

### Clusters
- **Clusters** - `/admin/clusters`
  - **All Clusters** - `/admin/clusters`
  - **Templates** - `/admin/clusters/templates`
  - **Members** - `/admin/clusters/members`

### Users
- **Users** - `/admin/users`
  - **Platform Users** - `/admin/users/platform`
  - **Cluster Users** - `/admin/users/clusters`
  - **Business Unit Staff** - `/admin/users/hotels`
  - **Roles** - `/admin/users/roles`
  - **Access Control** - `/admin/users/access`

### Reports
- **Reports** - `/admin/reports`

### Subscriptions
- **Subscriptions** - `/admin/subscriptions`
  - **Subscription Management** - `/admin/subscriptions`
  - **Plans** - `/admin/subscriptions/plans`
  - **Modules** - `/admin/subscriptions/modules`
  - **Usage** - `/admin/subscriptions/usage`
  - **Subscription Reports** - `/admin/subscriptions/reports`
  - **Hotel Invoices** - `/admin/subscriptions/invoices`

### Support
- **Support** - `/admin/support`

### Settings
- **Settings** - `/admin/settings`
  - **General** - `/admin/settings`
  - **Profile** - `/admin/settings/profile`
  - **Security** - `/admin/settings/security`

## Detailed Route Structure

### Business Unit Routes
- `/admin/business-units/manage` - Business units management
- `/admin/business-units/[businessUnitId]` - Business unit details
- `/admin/business-units/[businessUnitId]/edit` - Edit business unit
- `/admin/business-units/[businessUnitId]/templates` - Business unit templates
- `/admin/business-units/[businessUnitId]/users` - Business unit users

### Cluster Routes
- `/admin/clusters` - Clusters list
- `/admin/clusters/[clusterId]` - Cluster details
- `/admin/clusters/[clusterId]/settings/edit` - Edit cluster settings
- `/admin/clusters/[clusterId]/business-units` - Business units in cluster
- `/admin/clusters/[clusterId]/business-units/add` - Add business unit to cluster
- `/admin/clusters/[clusterId]/business-units/[businessUnitId]` - Business unit details
- `/admin/clusters/[clusterId]/business-units/[businessUnitId]/edit` - Edit business unit

### User Management Routes
- `/admin/users` - Users management
- `/admin/users/platform` - Platform users
- `/admin/users/clusters` - Cluster users
- `/admin/users/hotels` - Business Unit Staff users
- `/admin/users/roles` - Role management
- `/admin/users/access` - Access control
- `/admin/users/[userId]` - User details
- `/admin/users/[userId]/edit` - Edit user

### Subscription Routes
- `/admin/subscriptions` - Subscription management
- `/admin/subscriptions/plans` - Subscription plans
- `/admin/subscriptions/modules` - Module management
- `/admin/subscriptions/usage` - Subscription usage
- `/admin/subscriptions/reports` - Subscription reports and analytics
- `/admin/subscriptions/invoices` - Hotel invoices

### Report Routes
- `/admin/reports` - Reports dashboard
- `/admin/reports/[reportId]` - Report details
- `/admin/reports/generate` - Generate new report
- `/admin/reports/templates` - Report templates

### Support Routes
- `/admin/support` - Support dashboard
- `/admin/support/tickets` - Support tickets
- `/admin/support/knowledge-base` - Knowledge base

### Settings Routes
- `/admin/settings` - Platform settings
- `/admin/settings/profile` - User profile settings
- `/admin/settings/security` - Security settings

## Authentication Routes
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/auth/forgot-password` - Forgot password page
- `/auth/reset-password` - Reset password page
- `/auth/verify-email` - Email verification page

## Public Routes
- `/` - Landing page
- `/contact` - Contact page
- `/support` - Public support page
- `/pricing` - Pricing page

## API Routes

### Business Units API
- `POST /api/clusters/[clusterId]/business-units` - Create business unit
- `GET /api/clusters/[clusterId]/business-units` - List business units
- `GET /api/clusters/[clusterId]/business-units/[businessUnitId]` - Get business unit
- `PUT /api/clusters/[clusterId]/business-units/[businessUnitId]` - Update business unit
- `DELETE /api/clusters/[clusterId]/business-units/[businessUnitId]` - Delete business unit

### Business Unit Role Management API
- `GET /api/business-units/[businessUnitId]/users/[userId]/roles` - Get user roles
- `POST /api/business-units/[businessUnitId]/users/[userId]/roles` - Add roles to user
- `DELETE /api/business-units/[businessUnitId]/users/[userId]/roles` - Remove roles from user
- `PUT /api/business-units/[businessUnitId]/users/[userId]/roles` - Sync user roles

### Users API
- `POST /api/users` - Create user
- `GET /api/users` - List users
- `GET /api/users/[userId]` - Get user
- `PUT /api/users/[userId]` - Update user
- `DELETE /api/users/[userId]` - Delete user

### Reports API
- `POST /api/reports` - Generate report
- `GET /api/reports` - List reports
- `GET /api/reports/[reportId]` - Get report
- `DELETE /api/reports/[reportId]` - Delete report

### Report Templates API
- `GET /api/reports/templates` - List all system templates
- `POST /api/reports/templates` - Create new system template
- `GET /api/reports/templates/[templateId]` - Get template details
- `PUT /api/reports/templates/[templateId]` - Update system template
- `DELETE /api/reports/templates/[templateId]` - Delete system template
- `POST /api/reports/templates/[templateId]/validate` - Validate template

### Business Unit Template Management API
- `GET /api/business-units/[businessUnitId]/templates` - List business unit templates
- `POST /api/business-units/[businessUnitId]/templates/assign` - Assign system templates to business unit
- `PUT /api/business-units/[businessUnitId]/templates/[templateId]` - Update business unit template
- `DELETE /api/business-units/[businessUnitId]/templates/[templateId]` - Remove template from business unit
- `POST /api/business-units/[businessUnitId]/templates/[templateId]/customize` - Create customized version
- `PUT /api/business-units/[businessUnitId]/templates/[templateId]/config` - Update template configuration 