const dashboardNav = [
  {
    title: "Overview",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Hotels",
    href: "/admin/hotels",
    icon: Building2,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
    children: [
      {
        title: "Generated Reports",
        href: "/admin/reports",
      },
      {
        title: "Hotel Reports",
        href: "/admin/reports?tab=bu-reports",
      },
      {
        title: "Report Assignments",
        href: "/admin/reports?tab=assignments",
      },
      {
        title: "Templates",
        href: "/admin/reports?tab=templates",
      },
      {
        title: "Requests",
        href: "/admin/reports?tab=requests",
      },
    ],
  },
  // ... other nav items
] 