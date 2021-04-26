/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Typography from "views/Typography.js";
import Maps from "views/Maps.js";

const dashboardRoutes = [
  {
    path: "/user",
    name: "Meet Authors",
    icon: "nc-icon nc-badge",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Covid Dashboard",
    icon: "nc-icon nc-grid-45",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Covid Maps",
    icon: "nc-icon nc-map-big",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Prediction Analysis",
    icon: "nc-icon nc-single-copy-04",
    component: Typography,
    layout: "/admin",
  },
];

export default dashboardRoutes;
