import React from 'react';
import {
    Link
  } from "react-router-dom";

function Header(props) {

    const logout = () => {
        console.log("Logout");
    }

    return (
        <div>
            <nav className="menuList">
          <ul className="no-bullets menu">
            <li>
              <Link to="/home">Todo List</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/tasks-done">Tasks Done</Link>
            </li>
          </ul>

          <button className="logout" onClick={logout}>
            <Link to="/login">Log Out</Link>
          </button>
            </nav>
        </div>
    );
}

export default Header;