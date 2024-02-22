import { Navigate } from "react-router-dom";
import { AppPath } from "../../common/enums/app-path.enum";
import { RouterProvider } from "../common/router-provider/router-provider";
import { Home } from "../home/home";
import { Login } from "../login/login";

const routes = [
  {
    path: AppPath.ROOT,
    children: [
      {
        path: AppPath.ROOT,
        element: <Home />,
      },
      {
        path: AppPath.LOGIN,
        element: <Login />,
      },
      {
        path: AppPath.ANY,
        element: <Navigate to={AppPath.ROOT} />,
      },
    ],
  },
];

const App = (): JSX.Element => {
  return <RouterProvider routes={routes} />;
};

export { App };
