﻿import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './NavMenu.css';

import { Logo } from '../logo/Logo'

export function NavMenuChat() {
    const user = useSelector(state => state.user)
    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <span className="me-2"><Logo width={50} height={30} fontSzie={"fs-6"} /></span> <NavbarBrand tag={Link} to="/"> Welcome <span className="text-capitalize">{user.info.name === "" ? user.userId : user.info.name}</span></NavbarBrand>
                {/*  <NavbarToggler  className="mr-2" />*/}
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Chat</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/findfriend">Find Friend</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/signout">Sign Out</NavLink>
                        </NavItem>
                        <NavItem>
                            <a href="/swagger" target="_blank">swagger</a>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header >
    )

}