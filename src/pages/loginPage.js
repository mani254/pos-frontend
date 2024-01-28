import React, { useContext, useState } from "react";
import axios from "axios";

import "../css/loginPage.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { NotificationContext } from "../App";

function LoginPage() {
	const [loginDetails, setLoginDetails] = useState({ username: "", password: "" });
	const [view, setView] = useState(false);
	const  setNotificationDetails  = useContext(NotificationContext);

	const navigate = useNavigate();

	async function loginFunction(e) {
		e.preventDefault();

		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/authentication/login`, loginDetails);

			if (res.status === 200) {
				const { message, type } = res.data;
				setNotificationDetails({ message, type, showNotification: true });
				navigate("/");
			}
		} catch (err) {
			if (err.response) {
				const { message, type } = err.response.data;
				const status = err.response.status;
				setNotificationDetails({ message, type, showNotification: true });

				if (err.response.status === 500) {
					navigate("/servererror");
				}
			} else {
				navigate("/servererror");
				setNotificationDetails({ message: "something went wrong", type: "error", showNotification: true });
			}
		}
	}

	return (
		<section className="login d-center" style={{ backgroundImage: "url('assets/images/login-background.jpg')" }}>
			<div className="login-container">
				<form onSubmit={loginFunction}>
					<div className="input-wrapper">
						<label htmlFor="username"> Username:</label>
						<input type="text" name="username" id="username" onChange={(e) => setLoginDetails({ ...loginDetails, username: e.target.value })}></input>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password"> password:</label>
						<div className="r-input-wrapper">
							<input type={view ? "text" : "password"} name="password" id="password" onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}></input>
							<div className="eye-symbol" onClick={() => setView(!view)}>
								{view ? <IoIosEyeOff /> : <IoIosEye />}
							</div>
						</div>
					</div>
					<button type="submit" className="button">
						Login
					</button>
				</form>
			</div>
		</section>
	);
}

export default LoginPage;
