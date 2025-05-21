import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../pictures/knapweed1.png';
import searchLogo from '../pictures/search.png';

const Navigat = () => {
  return (
    <>
      <header>
        <nav className="wrapper">
          <div className="box1 thin">
            <Link to="/personal">Patients</Link>|
            <Link to="/blogs">Médecins</Link>|<Link to="/blogs">FAO</Link>|
            <Link className="buttonStyleDark" to="/signup">
              INSCRIPTION
            </Link>
            |
            <Link className="buttonStyleDark" to="/login">
              CONNECTION
            </Link>
          </div>
          <div className="box2 fat">
            <Link to="/">PORTAL SANTE</Link>
          </div>
          <div className="box3">
            <img src={logo} height="181px" />
          </div>
          <div className="box4 fat">
            <Link className="searchLink" to="/search">
              TROUVER UN MEDECIN <img src={searchLogo} height="41px" />
            </Link>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Navigat;
