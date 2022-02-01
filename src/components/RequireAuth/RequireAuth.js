import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const RequireAuth = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let location = useLocation();
    const {state} = location;
    let vehicle = '';
    if(state===null){
        vehicle = 'car'
    }
    else{
         const {vehicleName} = state;
         vehicle = vehicleName;
    }
    if (!loggedInUser.email){
        return <Navigate to="/login" state={{ from: location, vehicleName: vehicle }} replace />;
    }
    return children;
};

export default RequireAuth;