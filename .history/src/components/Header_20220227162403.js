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
		</nav>
	</div>;
}
