import React, { useContext } from 'react';
import styled from 'styled-components';
import {FaBars} from 'react-icons/fa'
import { NavLink as Link } from 'react-router-dom';
import { UserContext } from '../../App';
// background: #000;
const Nav = styled.nav`
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem calc((90vw - 1000px) / 2);
    z-index: 10;
`
const NavLink = styled(Link)`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    font-weight: 500;
`
const Bars = styled(FaBars)`
    display: none;
    color: #000;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }

`
// margin-right: -24px;
const NavMenu = styled.div`
    display: flex;
    align-items: center;
    

    @media screen and (max-width: 768px) {
        display: none;
    }
`
// margin-right: 24px;
const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    

    @media screen and (max-width: 768px) {
        display: none;
    }
`
const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #FF6E40;
    padding: 10px 20px;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <>
            <Nav>
                <NavLink to="/">
                    <h1>Pick me Up</h1>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/home" activeStyle>Home</NavLink>
                    <NavLink to="/destination" activeStyle>Destination</NavLink>
                    <NavLink to="/blog" activeStyle>Blog</NavLink>
                    <NavLink to="/contact" activeStyle>Contact</NavLink>
                    <NavBtn>
                        {loggedInUser.signIn ? <h3>{loggedInUser.name}</h3> :<NavBtnLink to="/login">Login</NavBtnLink> }
                    </NavBtn>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Header;