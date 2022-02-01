import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Header from '../Header/Header';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import AvailableOption from '../AvailableOption/AvailableOption';
import { useLocation } from 'react-router-dom';
import car from '../../img/Frame-2.png';
import bike from '../../img/Frame.png';
import train from '../../img/Group.png';
import bus from '../../img/Frame-1.png';


const Destination = () => {
    const [availableOption, setAvailableOption] = useState({isSearch:false});
    const {state} = useLocation();
    const {vehicleName} = state;
    const fakeData = {
        car:[
            {name:'Car', people:'4', cost:'$64', key:1, img:car},
            {name:'car', people:'4', cost:'$64', key:2, img:car},
            {name:'car', people:'4', cost:'$64', key:3, img:car}
        ],
        bus:[
            {name:'Bus', people:'45', cost:'$190', key:1, img:bus},
            {name:'Bus', people:'40', cost:'$130', key:2, img:bus},
            {name:'Bus', people:'35', cost:'$100', key:3, img:bus}
        ],
        bike:[
            {name:'Bike', people:'1', cost:'$50', key:1, img:bike},
            {name:'Bike', people:'1', cost:'$50', key:2, img:bike},
            {name:'Bike', people:'1', cost:'$50', key:3, img:bike}
        ],
        train:[
            {name:'Train', people:'150', cost:'$290', key:1, img:train},
            {name:'Train', people:'150', cost:'$300', key:2, img:train},
            {name:'Train', people:'120', cost:'$250', key:3, img:train},
        ]
    }
    const containerDivStyle = {
        width:'85%',
        margin:'0 auto'
    }
    const textFieldStyle = {
        width: '100%',
        marginBottom:'20px',
        backgroundColor:'white',
        borderRadius:'5px'
    }
    const formStyle = {
        padding:'15px',
        backgroundColor:'lightGray',
        borderRadius:'5px'
    }
    const handleSubmit = (e) =>{
        const pickFrom = e.target[0].value;
        const pickTo = e.target[1].value;
        const setPickFromAndTo = {...availableOption};
        setPickFromAndTo['pickFrom'] = pickFrom;
        setPickFromAndTo['pickTo'] = pickTo;
        setPickFromAndTo.isSearch = true;
        setAvailableOption(setPickFromAndTo);
        e.preventDefault();
    }
    const containerStyle = {
        width: '100%',
        height: '450px',
        borderRadius: '10px'
      };
      
    const center = {
        lat: 23.810331,
        lng: 90.412521
      };
    return (
        <>
            <Header />
            <div style={containerDivStyle}>
                <hr />
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {!availableOption.isSearch ? <form onSubmit={handleSubmit} style={formStyle}>
                            <TextField id="filled-basic" name='pickFrom' style={textFieldStyle} label="Pick From" variant="filled" required/>
                            <TextField id="filled-basic" name='pickTo' style={textFieldStyle} label="Pick To" variant="filled" required/>
                            <Button variant="contained" type='submit' style={{width:'100%', backgroundColor:'#ff6600'}}>Search</Button>
                        </form> :
                        <>
                        <Grid style={{backgroundColor:'#ff6600', padding:'10px', color:'#fff', borderRadius:'5px', marginBottom:'20px'}}>
                            <h3>{availableOption.pickFrom} to {availableOption.pickTo}</h3>
                        </Grid>
                        {/* <AvailableOption></AvailableOption> */}
                        {fakeData[vehicleName].map((c) => <AvailableOption key={c.key} vehicles={c}></AvailableOption>)}
                        </>
                        }
                    </Grid>
                    <Grid item xs={8}>
                        <LoadScript
                        googleMapsApiKey="AIzaSyA7RS8jz1E6ai4FZvWHGgaThS9BGlH90eA"
                        >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={10}
                        >
                            { /* Child components, such as markers, info windows, etc. */ }
                            <></>
                        </GoogleMap>
                        </LoadScript>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Destination;