import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../img/Bg.png'
import Header from '../Header/Header';
import './Home.css';
const homeStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
    width:'100%',
}

const Home = () => {
    const navigate = useNavigate();
    const handleClicked = (vehicles) =>{
        navigate('/destination', { state: { vehicleName: vehicles } });
    }
    return (
        <div style={homeStyle} className='home'>
            <Header />
            <div className='cardContainer'>
                <div className='card' onClick={()=>handleClicked('bike')}>
                    <img src={require('../../img/Frame.png')} alt="" />
                    <h6>BIKE</h6>
                </div>
                <div className='card' onClick={()=>handleClicked('car')}>
                    <img src={require('../../img/Frame-2.png')} alt="" />
                    <h6>CAR</h6>
                </div>
                <div className='card' onClick={()=>handleClicked('bus')}>
                    <img src={require('../../img/Frame-1.png')} alt="" />
                    <h6>BUS</h6>
                </div>
                <div className='card' onClick={()=>handleClicked('train')}>
                    <img src={require('../../img/Group.png')} alt="" />
                    <h6>TRAIN</h6>
                </div>
            </div>
        </div>
    );
};

export default Home;