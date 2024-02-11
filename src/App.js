import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Notification from "./components/notification.js";
import { useNavigate } from "react-router-dom";

import Dashboard from "./pages/dashboard.js";
import LoginPage from "./pages/loginPage.js";
import Navbar from "./components/navbar.js";
import Branch from "./pages/branch.js";
import ServerError from "./pages/serverError.js";
import AddBranch from "./branchComponents/addBranch.js";
import UpdateBranch from "./branchComponents/updateBranch.js";


import "./css/common.css";
import BranchesList from "./branchComponents/branchesList.js";

export const NotificationContext = React.createContext();
export const LoginContext = React.createContext();

function App() {
	console.log("app page rendered")
	axios.defaults.withCredentials = true;

	const [displayNotification, setDisplayNotification] = useState(false);

	const [loginInfo, setLoginInfo] = useState({isLogedIn:false});

	const [notificationDetails, setNotificationDetails] = useState({ showNotification: false, message: "", type: "" });
	const [darkTheme, setDarkTheme] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		console.log("----main useEffect is beeing called------");

		async function fetchMain() {
			try {
				const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/authentication/main`, { value: "emphty" });

				if (res.status === 200) {
					setLoginInfo({ username: res.data.username, storeId: res.data.storeId, superAdmin: res.data.superAdmin,branchId:res.data.branchId,isLogedIn:true});
				}
			} catch (err) {
				if (err.response) {
					const { message, type } = err.response.data;
					
					setNotificationDetails({ message, type, showNotification: true });

					navigate("/login");

					if (err.response.status === 500) {
						navigate("/servererror");
					} else if (err.response.status === 401) {
						navigate("/login");
					}
				} else {
					navigate("/servererror");
					setNotificationDetails({ message: "something went wrong", type: "error", showNotification: true });
				}
			}
		}

		fetchMain();
	}, []);


	useEffect(() => {
		if (notificationDetails.showNotification === false) {
			return;
		}

		setDisplayNotification(true);

		let timeOut = setTimeout(() => {
			setDisplayNotification(false);
			setNotificationDetails({ ...notificationDetails, showNotification: false });
		}, 3000);

		return () => {
			clearTimeout(timeOut);
		};
	}, [notificationDetails.showNotification]);

	return (
		<main className={`app ${darkTheme ? "dark-theme" : "light-theme"}`}>
			{/* <Navbar/> */}
			{displayNotification && <Notification data={{ notificationDetails, setNotificationDetails }} />}

			<LoginContext.Provider value={{loginInfo,setLoginInfo}}>
				<NotificationContext.Provider value={setNotificationDetails}>
					<Routes>
						<Route path="/" element={<Navbar props={{ darkTheme, setDarkTheme }} />}>
							<Route index element={<Dashboard />} />
							<Route path="branch" element={<Branch />}>
								<Route index element={<BranchesList/>}></Route>
                                <Route path="add" element={<AddBranch />} />
                                <Route path="update/:id" element={<UpdateBranch />} />
							</Route>
						</Route>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/servererror" element={<ServerError />} />
					</Routes>
				</NotificationContext.Provider>
			</LoginContext.Provider>
		</main>
	);
}

export default App;
