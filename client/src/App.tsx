import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./features/RentHome/pages/home";
import Layout from "./layout/layout";

const App: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
