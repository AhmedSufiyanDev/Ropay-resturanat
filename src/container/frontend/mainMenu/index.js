import React, { useEffect } from 'react';
import { mainPattern } from '../../../assets/images/images';
import '../scss/mainMenu.scss';
import { riyaPayImage } from '../../../assets/images/newImages';

function MainMenu(props) {
    useEffect(() => {
        // Get the root element
        const rootElement = document.getElementById('root');
        // Set the background image of the root element
        if (rootElement) {
            rootElement.style.backgroundImage = `url(${mainPattern})`;
            // rootElement.style.backgroundSize = 'cover'; // Optional: ensures the image covers the entire element
            // rootElement.style.backgroundRepeat = 'no-repeat'; // Optional: prevents the image from repeating
            // rootElement.style.backgroundPosition = 'center'; // Optional: centers the image
        }

        // Cleanup the background image when the component unmounts
        return () => {
            if (rootElement) {
                rootElement.style.backgroundImage = '';
            }
        };
    }, []);

    return (
        <div className='center-item'>
            <div className="main-bg">
                <div className="main-spl-menu">
                    <div className="button-container">
                        <button className='pay-btn'>Pay Now</button>
                        <button className='menu-btn' onClick={() => props.history.push('/home')}>Main Menu</button>
                    </div>
                    <div>
                        <div className='main-menu-logo'>
                            <img src={riyaPayImage} alt="RiyaPay Logo" />
                        </div>
                        <div className='main-menu-text'>
                            <p>By Using RiaPay, you agree to the <span className='main-menu-text-cond'>terms & Conditions</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainMenu;
