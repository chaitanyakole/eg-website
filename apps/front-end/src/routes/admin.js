import Dashboard from "pages/front-end/Dashboard";
import Profile from "pages/admin/facilitator/Profile";
import FacilitatorView from "pages/admin/facilitator/View";
import AdminHome from "pages/admin/AdminHome";
import FacilitatorForm from "../pages/admin/FacilitatorForm";
import OrientationScreen from "pages/front-end/orientation/orientationScreen";
import NotFound from "pages/NotFound";

export default [
  { path: "/admin/view/:id", component: FacilitatorView },
  { path: "/admin/facilitator-onbording", component: FacilitatorForm },
  { path: "/admin/profile", component: Profile },
  { path: "/admin", component: AdminHome },
  { path: "/", component: AdminHome },
  { path: "*", component: NotFound },
  { path: "/orientation", component: OrientationScreen },
];
