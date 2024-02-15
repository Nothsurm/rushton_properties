import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/updateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/forgotPassword" element={<ForgotPassword />}/>
        <Route path="/resetPassword/:token" element={<ResetPassword />}/>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/listing/:listingId' element={<Listing />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}/>
          <Route path='/create-listing' element={<CreateListing />}/>
          <Route path='/update-listing/:listingId' element={<UpdateListing />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

