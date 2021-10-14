import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';
import { Logout } from '../../components';

const Header = () => {
    let token = localStorage.getItem('access_token');
    let isLoggedIn = token ? (
        <Logout />
    ) : (
        <div>
            <NavLink to="/login" className="nav-item nav-link">
                Login
            </NavLink>

            <NavLink to="/register" className="nav-item nav-link">
                Register
            </NavLink>
        </div>
    );

    return (
        <nav className="navbar static-top navbar-expand-lg navbar-dark bg-dark">
            <NavLink exact to="/" className="navbar-brand">
                Oyster Card
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink to="/flights" className=" nav-item nav-link">
                        Flights
                    </NavLink>

                    <NavLink to="/hotels" className="nav-item nav-link">
                        Accommodation
                    </NavLink>

                    <NavLink to="/experiences" className="nav-item nav-link">
                        Experiences
                    </NavLink>

                    {isLoggedIn}

                    {/* <NavLink to="/login" className="nav-item nav-link">
                        Login
                    </NavLink>

                    <NavLink to="/register" className="nav-item nav-link">
                        Register
                    </NavLink>

                    <Logout /> */}
                </div>
            </div>
        </nav>
    );
};

export default Header;
