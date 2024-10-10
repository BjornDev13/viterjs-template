import { IconCalendarPlus } from "@tabler/icons-react";
import { IconCalendarDue } from "@tabler/icons-react";


const Menuitems = [
  {
    navlabel: true,
    subheader: "INICIO",
  },
  {
    id: 1,
    title: "Citas",
    icon: IconCalendarDue,
    href: "/",
  },
  {
    id: 2,
    title: "Calendarios",
    icon: IconCalendarPlus,
    href: "/calendars",
  },

  // {
  //   navlabel: true,
  //   subheader: "QA",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Scripts",
  //   icon: IconCode,
  //   href: "/scripts",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Usuarios de las Apps",
  //   icon: IconApps,
  //   href: "/users-apps",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Utilidades",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Usuarios",
  //   icon: IconUser,
  //   href: "/users",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
