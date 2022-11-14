import React, { useState, useEffect } from "react";
import Logo from "../../images/netflix_logo.png";
import "./Nav.css";

import {DebounceInput} from 'react-debounce-input';
import {auth} from '../../firebase'
import {useNavigate} from 'react-router-dom'

function Nav ({handleChange, isModified}) {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });

        return () => {
            window.removeEventListener("scroll", null);
            console.log("removed");
        };
    }, []);

    const handleSignout = () => {
        auth.signOut();
        navigate('/')
    }

    return (
        <div className={` ${(show || isModified) ? "nav__black" : "nav"}`}>
            <div className={` ${(show || isModified) ? "nav__left" : "nav__left-hide"}`}>
                <img className="nav__logo" src={`${Logo}`} alt="Netflix Logo" />
                <p>Home</p>
                <p>TVShows</p>
                <p>Movies</p>
                <p>New & Popular</p>
                <p>MyList</p>
            </div>

            <div className={`${(show || isModified) ? "nav__right" : "nav__right-hide"}`}>
                <form role="search" method="get" className="search-form" action="">
                    <label>
                        <DebounceInput
                            type="search"
                            className="search-field"
                            placeholder="Search …"
                            minLength={2}
                            debounceTimeout={400}
                            onChange={e => handleChange(e.target.value)}
                        />
                    </label>
                    <input type="submit" className="search-submit" value="Search" />
                </form>
                <p>Kids</p>
                <i class="fa-solid fa-bell"></i>
                <img
                    className="nav__avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="Netflix Avatar"
                />
                <button className="signout__button" onClick={()=> handleSignout()}>Sign Out</button>
            </div>
        </div>
        
    );
};

export default Nav;
