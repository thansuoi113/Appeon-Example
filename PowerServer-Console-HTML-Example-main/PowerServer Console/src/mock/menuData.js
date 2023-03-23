const menuData = [

{
    id: 0,
    title: "Dashboard",
    title_en: "Dashboard",
    icon: "\ue661",
    path: "/dashboard/console",
    children: [
          // {
          //   id: 101,
          //   title: "Dashboard",
          //   title_en: "PowerServer Console",
          //   path: "/dashboard/console"
          // }
        ]
  },
  {
    id: 1,
    title: "Monitor Center",
    title_en: "Monitor Center",
    icon: "\ue6b2",
    path: "",
    children: [
          {
            id: 101,
            title: "Health",
            title_en: "PowerServer Health",
            path: "/health/healthInfo"
          },
          {
            id: 102,
            title: "Sessions",
            title_en: "Session List",
            path: "/session/sessions"
          },
          {
            id: 103,
            title: "Transactions",
            title_en: "Transaction List",
            path: "/transaction/transactions"
          }
        ]
  },
  {
    id: 2,
    title: "Configuration Manager",
    title_en: "Configuration Manager",
    icon: "\ue61e",
    path: "",
    children: [
          {
            id: 201,
            title: "Applications",
            title_en: "Application List",
            path: "/application/applications"
          },
          {
            id: 202,
            title: "Connections",
            title_en: "Connection List",
            path: "/connection/connections"
          }
        ]
  },
  {
    id: 3,
    title: "Settings",
    title_en: "Setting",
    icon: "\ue65d",
    path: "",
    children: [
          {
            id: 301,
            title: "API Server URL",
            title_en: "API Server URL",
            path: "/setting/serverurl"
          }
        ]
  },

]

export {
  menuData
}
