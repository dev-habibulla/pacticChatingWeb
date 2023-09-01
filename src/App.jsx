import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
<Route>
    <Route
      path="/"
      element={<Register/>}
    />
    <Route
      path="/login"
      element={<Login/>}
   />

    <Route
      path="/home"
      element={<Home/>}
   />
    <Route
      path="/forgotpassword"
      element={<ForgotPassword/>}
   />
     
    </Route>
  )
);



function App() {
  return (
    <>
  <RouterProvider router={router} />
  <ToastContainer/>
    </>
  );
}

export default App;
