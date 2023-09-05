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
import Messege from "./pages/Messege";
import Notifications from "./pages/Notifications";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

     <Route path="/" element={<RootLayout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/messege" element={<Messege />} />
      <Route path="/notifications" element={<Notifications />} />
     </Route>

      
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
