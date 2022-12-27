
import { IconName, IoIosArrowUp } from "react-icons/io";
import "./App.css";
import { FloatButton } from "antd";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import HomeTemplate from "./Templates/HomeTemplate/HomeTemplate";
import RegisterTemplate from "./Templates/RegisterTemplate/RegisterTemplate";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { createBrowserHistory } from "history";
import FilmDetail from "./Pages/FilmDetail/FilmDetail";
import Checkout from "./Pages/Checkout/Checkout";
import LoadingGif from "./Components/LoadingGIF/LoadingGif";
import Home from "./Pages/Home/Home";
import AdminTemplate from "./Templates/AdminTemplate/AdminTemplate";
import UserManagement from "./Components/Admin/UserManagement/UserManagement";
import AddUser from "./Components/Admin/UserManagement/AddUser";
import DrawerANTD from "./Components/Drawer/DrawerANTD";
import UpdateInfo from "./Pages/UpdateInfo/UpdateInfo";
import FilmManagement from "./Components/Admin/FilmManagement/FilmManagement";
import AddFilm from "./Components/Admin/FilmManagement/AddFilm";
import Profile from "./Pages/Profile/Profile";
import ModalAntd from "./Components/Modal/ModalAntd";
export const history = createBrowserHistory({ window });
function App() {
  return (
    <HistoryRouter history={history}>
      <LoadingGif></LoadingGif>
      <DrawerANTD></DrawerANTD>
      <ModalAntd></ModalAntd>
      <Routes>
        <Route path="" element={<HomeTemplate></HomeTemplate>}>
          <Route index path="" element={<Home></Home>}></Route>
          <Route path="home" element={<Home></Home>}></Route>
          <Route path="profile" element={<Profile></Profile>}></Route>
        </Route>
        <Route path="" element={<RegisterTemplate></RegisterTemplate>}>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="signup" element={<SignUp></SignUp>}></Route>
        </Route>
        <Route
          path="/filmDetail/:id"
          element={<FilmDetail></FilmDetail>}
        ></Route>
        <Route path="admin" element={<AdminTemplate></AdminTemplate>}>
          <Route
            path="userManagement"
            element={<UserManagement></UserManagement>}
          ></Route>

          <Route path="addUser" element={<AddUser></AddUser>}></Route>
          <Route
            path="filmManagement"
            element={<FilmManagement></FilmManagement>}
          ></Route>
          <Route path="addFilm" element={<AddFilm></AddFilm>}></Route>
        </Route>
        <Route path="/checkout/:id" element={<Checkout></Checkout>}></Route>
        <Route path="updateInfo" element={<UpdateInfo></UpdateInfo>}></Route>
        <Route path="*" element={<Home></Home>}></Route>
      </Routes>

      <FloatButton.BackTop icon={<IoIosArrowUp></IoIosArrowUp>} />
    </HistoryRouter>
  );
}

export default App;
