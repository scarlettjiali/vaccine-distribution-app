/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import People from "@material-ui/icons/People";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Schedule from "@material-ui/icons/Schedule";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Typography from "views/Typography/Typography.js";
import Maps from "views/Maps/Maps.js";

const dashboardRoutes = [
  {
    path: "/user",
    name: "Authors Introduction",
    icon: People,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Covid Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Vaccination Appointment",
    icon: Schedule,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Analysis",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
];

export default dashboardRoutes;
