import React, { useState } from 'react';
import './Header.css';
import Registration from '../RegistrationForm/Registration';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openForm = () => {
        setIsFormOpen(true);
        setIsMenuOpen(false); 
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    return (
        <>
            <header>
                <div className="navbar">
                    <div className="logo">
                        <a href="#">Jobcc</a>
                    </div>
                    <ul className={`links ${isMenuOpen ? 'open' : ''}`}>
                        <li className="Hero"><a href="#Home">Home</a></li>
                        <li className="Hero"><a href="#about">About</a></li>
                        <li className="Hero"><a href="#services">Features</a></li>
                        <li className="Hero"><a href="#Review">Reviews</a></li>
                    </ul>
                    <a href="#" className="actionBtn" onClick={openForm}>
                        Join Now
                    </a>
                    <div className="toggleBtn" onClick={toggleMenu}>
                        <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                    </div>
                </div>
                <div className={`dropDownmenu ${isMenuOpen ? 'open' : ''}`}>
                    <li className="Hero"><a href="#Home">Home</a></li>
                    <li className="about"><a href="#about">About</a></li>
                    <li className="services"><a href="#services">Features</a></li>
                    <li className="contact"><a href="#Review">Reviews</a></li>
                    <li><a href="#" className="actionBtn" onClick={openForm}>Get Started</a></li>
                </div>
            </header>
            {isFormOpen && <Registration closeForm={closeForm} />}
        </>
    );
}

export default Header;
