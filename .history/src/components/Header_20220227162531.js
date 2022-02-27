import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
	<div className="header-container">
		<div className="title-container">
			<h1 className="title">WATER MY PLANTS APP</h1>
		</div>
		<nav>
			<Link to="/">
                <button id='home'>HOME</button>
            </Link>

            <Link to="/login">
                <button id='login'>LOGIN</button>
            </Link>

            <Link to="/register">
                <button id='home'>REGISTER</button>
            </Link>

            <Link to="/profile">
                <button id='profile'>PROFILE</button>
            </Link>
		</nav>
	</div>;
}