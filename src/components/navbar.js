import React, { memo } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";

function Navbar({ darkTheme, setDarkTheme }) {
	console.log("Navbar component is rendered");
	const location = useLocation();
	return (
		<div className="main-page">
			<nav className="navbar d-c-b flex-column">
				<div>
					<div className="logo-wrapper">
						<img src={`/assets/images/${darkTheme ? "logo-dark.png" : "logo.png"}`} className="logo" alt="retail-nest-logo" />
					</div>

					<ul className="nav-links">
						<NavItem to="/" icon="dashboard" label="Dashboard" location={location} />
						<NavItem to="/branch" icon="branch" label="Branch" location={location} />
						<NavItem to="/billing" icon="billing" label="Billing" location={location} />
						<NavItem to="/products" icon="products" label="Products" location={location} />
						<NavItem to="/procurements" icon="procurements" label="Procurements" location={location} />
						<NavItem to="/orders" icon="orders" label="Orders" location={location} />
						<NavItem to="/customers" icon="customers" label="Customers" location={location} />
						<NavItem to="/staff" icon="staff" label="Staff" location={location} />
						{/* Add more NavItems as needed */}
					</ul>
				</div>

				<div className="theme">
					<div className="switch-wrapper">
						<input type="checkbox" className="theme-box a-t-l" id="theme-box" onChange={() => setDarkTheme(!darkTheme)}></input>
						<div className="switch"></div>
					</div>
				</div>
			</nav>
			<section className="content-section">
				<Outlet />
			</section>
		</div>
	);
}
export default memo(Navbar);

const NavItem = memo(({ to, icon, label, location }) => (
	<NavLink to={to}>
		<li className={`d-v-center ${location.pathname === to ? "active" : ""}`}>
			<img src={`/assets/images/${icon}.png`} alt={`${label} Icon`} />
			{label}
		</li>
	</NavLink>
));
