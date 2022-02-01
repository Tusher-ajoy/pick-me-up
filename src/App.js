import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import Blog from './components/Blog/Blog';
import NotFound from './components/NotFound/NotFound';
import Contact from './components/Contact/Contact';
import { createContext, useState } from 'react';
import RequireAuth from './components/RequireAuth/RequireAuth';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="destination" element={<RequireAuth> <Destination /> </RequireAuth>} />
        <Route path="blog" element={<RequireAuth> <Blog /> </RequireAuth>} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
