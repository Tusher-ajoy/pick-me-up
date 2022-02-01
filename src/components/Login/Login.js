import { Alert, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import Paper from '@mui/material/Paper';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase.config';
import { UserContext } from '../../App';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';

const app = initializeApp(firebaseConfig);

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let location = useLocation();
    const vehicle = location?.state?.vehicleName || 'car';
    let from = location.state?.from?.pathname || "/";
    const [haveAccount, setHaveAccount] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        cPassword:'',
        error:false
    });

    const handleBlur = (e) =>{
        if(e.target.name === 'name'){
            const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
            if(regName.test(e.target.value)){
                const newUser = {...user};
                newUser[e.target.name] = e.target.value;
                setUser(newUser);
            }
            else{
                const newUser = {...user};
                newUser[e.target.name] = '';
                setUser(newUser);
            }
        }
        if(e.target.name === 'email'){
            const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(regEmail.test(e.target.value)){
                const newUser = {...user};
                newUser[e.target.name] = e.target.value;
                setUser(newUser);
            }
            else{
                const newUser = {...user};
                newUser[e.target.name] = '';
                setUser(newUser);
            }
        }
        if(e.target.name === 'password'){
            const regPassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;
            if(regPassword.test(e.target.value)){
                const newUser = {...user};
                newUser[e.target.name] = e.target.value;
                setUser(newUser);
            }
            else{
                const newUser = {...user};
                newUser[e.target.name] = '';
                setUser(newUser);
            }
        }
        if(e.target.name === 'cPassword'){
            if(user.password === e.target.value){
                const newUser = {...user};
                newUser[e.target.name] = e.target.value;
                setUser(newUser);
            }
            else{
                const newUser = {...user};
                newUser[e.target.name] = '';
                setUser(newUser);
            }
        }
        // console.log(user);
    }
    const handleSubmit = (e) =>{
        if(!haveAccount && user.name && user.email && user.cPassword){
            user.error = false;
            createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const userCre = userCredential.user;
                userCre.displayName = user.name;
                const newUser = {name:userCre.displayName, email:userCre.email, signIn:true}
                setLoggedInUser(newUser);
                updateUserName(user.name);
                navigate(from, { state: { vehicleName: vehicle } });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        }else{
            user.error = true;
        }

        if(haveAccount && user.email && user.password){
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const userCre = userCredential.user;
                const {displayName, email} = userCre;
                const newUser = {name:displayName, email, signIn:true};
                setLoggedInUser(newUser);
                navigate(from, { state: { vehicleName: vehicle } });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        }else{
            user.error = true;
        }
        e.preventDefault();
    }
    const updateUserName = name => {
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
          console.log('user name updated successfully');
        }).catch((error) => {
          console.log(error);
        });
      }
    const handleFbSignIn = () =>{
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const {displayName, email} = result.user;
            const newUser = {name:displayName, email, signIn:true};
            setLoggedInUser(newUser);
            navigate(from, { state: { vehicleName: vehicle } });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // The email of the user's account used.
            const email = error.email;
            console.log(email);
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.log(credential);
        });
    }
    const handleGoogleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const{displayName, email} = result.user;
            const newUser = {name:displayName, email, signIn:true};
            setLoggedInUser(newUser);
            navigate(from, { state: { vehicleName: vehicle } });
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // The email of the user's account used.
            const email = error.email;
            console.log(email);
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential);
        });
    }
    const paperStyle = {padding:'20px', width:'40%', margin: '20px auto'};
    return (
        <div>
            <Header />
            <Grid>
                {user.error && <Alert style={{width:'60%', margin:'0 auto'}} severity="error">Password or email is not correct!</Alert>}
                <Paper elevation={5} style={paperStyle}>
                    <h3>{haveAccount ? 'Login' : 'Create an account'}</h3>
                    <form onSubmit={handleSubmit}>
                        {!haveAccount && <TextField sx={{ mb: 2 }} name="name" onBlur={handleBlur} id="standard-basic" label="Name" variant="standard" fullWidth required />}
                        <TextField sx={{ mb: 2 }} id="standard-basic" name='email' type='email' onBlur={handleBlur} label="Email" variant="standard" fullWidth required />
                        <TextField sx={{ mb: 2 }} id="standard-basic" name='password' onBlur={handleBlur} label="Password" variant="standard" type='password' fullWidth required />
                        {!haveAccount && <TextField sx={{ mb: 2 }} id="standard-basic" onBlur={handleBlur} name='cPassword' label="Confirm Password" type='password' variant="standard" fullWidth required />}
                        {haveAccount && <Grid sx={{ mb: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox name='checkedB' color='primary' />
                                } 
                                label="Remember Me" onBlur={handleBlur}
                            />
                            <Link href="#" style={{color:'#FF6E40', float:'right'}}>
                            {'Forgot Password'}</Link>
                        </Grid>}
                        <Button sx={{ mb: 2 }} type='submit' variant="contained" style={{backgroundColor:'#FF6E40'}} fullWidth>{haveAccount ? 'Login' : 'Create an account'}</Button>
                    </form>
                    <Typography> {haveAccount ? "Don't have an account?" : "Already have an account ?"}
                        <Link style={{color:'#FF6E40',cursor:'pointer'}} onClick={()=>setHaveAccount(!haveAccount)}>
                            {haveAccount ? 'Create an account' :'Login'}
                        </Link>
                    </Typography>
                </Paper>
                <Grid xs={3} style={{margin:'0 auto', textAlign:'center'}}>
                    <p>Or,</p>
                    <Button variant="outlined" onClick={handleFbSignIn} style={{width:'100%', display:'flex', justifyContent:'space-between'}} startIcon={<FacebookRoundedIcon style={{fontSize:'35px'}} />}>
                        Continue with facebook
                    </Button><br />
                    <Button variant="outlined"onClick={handleGoogleSignIn} style={{width:'100%', display:'flex', justifyContent:'space-between', marginBottom:'20px', color:'#DB4437'}} startIcon={<GoogleIcon style={{fontSize:'35px'}} />}>
                        Continue with Google
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;