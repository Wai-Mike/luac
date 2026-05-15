Create department dashboard pages inside:

resources/js/Pages/DepartmentDashboards/

Create these files:

1. ExecutiveOfficeDashboard.jsx
2. FinanceAdministrationDashboard.jsx
3. ICTInformationDashboard.jsx
4. ProgramsWelfareDashboard.jsx
5. ExternalLegalAffairsDashboard.jsx

Each dashboard should use AppLayout and include:
- Page title
- Department overview
- KPI cards
- Recent activities
- Pending tasks
- Quick actions
- Department reports section

====================================
EXECUTIVE OFFICE DASHBOARD
====================================
KPIs:
- Total executive members
- Pending resolutions
- Active meetings
- Departments monitored

Quick actions:
- Create meeting
- Add resolution
- Assign task
- View reports

Sections:
- Recent executive decisions
- Department performance summary
- Upcoming meetings

====================================
FINANCE & ADMINISTRATION DASHBOARD
====================================
KPIs:
- Total contributions
- Total expenses
- Current budget
- Pending approvals

Quick actions:
- Add expense
- Add contribution
- Create budget
- Generate finance report

Sections:
- Recent transactions
- Budget utilization
- Pending financial requests

====================================
ICT & INFORMATION DASHBOARD
====================================
KPIs:
- Total system users
- Active users
- Open support tasks
- Website/system status

Quick actions:
- Add user
- View activity logs
- Manage website updates
- Create ICT task

Sections:
- Recent system activities
- User access summary
- Technical support requests

====================================
PROGRAMS & WELFARE DASHBOARD
====================================
KPIs:
- Active programs
- Upcoming events
- Beneficiaries
- Pending welfare requests

Quick actions:
- Create program
- Add event
- Register beneficiary
- Generate program report

Sections:
- Recent programs
- Welfare activities
- Upcoming education/sports/culture events

====================================
EXTERNAL & LEGAL AFFAIRS DASHBOARD
====================================
KPIs:
- Active partnerships
- Legal documents
- Pending agreements
- Compliance reviews

Quick actions:
- Add partner
- Upload agreement
- Add legal record
- Create compliance review

Sections:
- Recent partnerships
- Legal document reviews
- Pending MOUs/contracts

====================================
UI REQUIREMENTS
====================================
Use Tailwind CSS.

Create reusable components if missing:
- DepartmentStatCard
- DepartmentQuickAction
- DepartmentActivityList
- DepartmentSectionCard

Each dashboard should be modern, clean, responsive, and consistent with the main admin dashboard.

Use placeholder data first if backend props are not available.

Use Inertia Link for navigation.

Also add routes for these pages:

/departments/executive-office/dashboard
/departments/finance-administration/dashboard
/departments/ict-information/dashboard
/departments/programs-welfare/dashboard
/departments/external-legal-affairs/dashboard

Add sidebar links under a group called:
Department Dashboards