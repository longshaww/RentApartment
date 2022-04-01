import React, { useState } from "react";
import { NavbarToggler, Collapse, Nav, NavItem, Navbar } from "reactstrap";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<>
			<Navbar expand="md" light>
				<Link to="/">
					<div id="center-logo">
						<img
							id="logo"
							src=""
							alt=""
							className="rounded-circle"
						></img>
						<p
							id="brand-name"
							className="text-dark fs-3 fw-bold"
						>
							Traveloka
						</p>
					</div>
				</Link>
				<NavbarToggler onClick={toggle} />

				<Collapse isOpen={isOpen} navbar>
					<Nav className="m-auto" navbar>
						<NavItem>
							<Link
								to="/collections/new-arrivals"
								className="nav-link"
							>
								NEW ARRIVALS
							</Link>
						</NavItem>
						<NavItem>
							<Link
								to="/collections/tops"
								className="nav-link"
							>
								TOPS
							</Link>
						</NavItem>
						<NavItem>
							<Link
								to="/collections/bottoms"
								className="nav-link"
							>
								BOTTOMS
							</Link>
						</NavItem>
						<NavItem>
							<Link
								to="/collections/outerwears"
								className="nav-link"
							>
								OUTERWEARS
							</Link>
						</NavItem>
						<NavItem>
							<Link
								to="/collections/accessories"
								className="nav-link"
							>
								ACCESSORIES
							</Link>
						</NavItem>
						<NavItem>
							<Link
								to="/collections/sale"
								className="nav-link"
							>
								SALE
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
			<Outlet />
		</>
	);
};

export default Layout;
