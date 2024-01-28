import "./css/common.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard.js";
import LoginPage from "./pages/loginPage.js";
import axios from "axios";
import Notification from "./components/notification.js";

export const NotificationContext = React.createContext();

function App() {
	axios.defaults.withCredentials = true;

	const [displayNotification, setDisplayNotification] = useState(false);

	const [notificationDetails, setNotificationDetails] = useState({
		showNotification: false,
		message: "",
		type: "",
	});

	useEffect(() => {
    if (notificationDetails.showNotification === false) {
        return; 
    }

    setDisplayNotification(true);

    let timeOut = setTimeout(() => {
        setDisplayNotification(false);
        setNotificationDetails({...notificationDetails,showNotification:false})
        
    }, 3000);

    return () => {
        clearTimeout(timeOut); 
    };
}, [notificationDetails.showNotification]);

	return (
		<div className="app light-theme">
			{/* <Navbar/> */}
			{displayNotification && <Notification data={{ notificationDetails, setNotificationDetails }} />}

			<NotificationContext.Provider value={setNotificationDetails}>
				<Routes>
					<Route path="/" element={<Dashboard />}></Route>
					<Route path="/login" element={<LoginPage></LoginPage>}></Route>
				</Routes>
			</NotificationContext.Provider>
		</div>
	);
}

export default App;
