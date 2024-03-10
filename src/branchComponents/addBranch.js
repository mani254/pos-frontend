import React, { useContext, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationContext } from "../App";

function AddBranch() {
	const [branchData, setBranchData] = useState({ name: "", address: "", status: true, admin: { email: "", password: "", username: "" } });
	const { changed, setChange } = useOutletContext();
	const setNotificationDetails = useContext(NotificationContext);
	const navigate = useNavigate();

	async function addBranch(event) {
		event.preventDefault();

		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/branch/addBranch`, branchData);

			if (res.status === 200) {
				setNotificationDetails({ message: `Branch Added sucessfully`, type: "success", showNotification: true });
				setChange(!changed);
				navigate("/branch");
			}
			if (res.status == 201) {
				setNotificationDetails({ message: res.data.message, type: res.data.type, showNotification: true });
			}
		} catch (err) {
			if (err.response) {
				const { message, type } = err.response.data;
				setNotificationDetails({ message, type, showNotification: true });
				if (err.response.status === 401) {
					navigate("/login");
				}
			} else {
				navigate("/servererror");
				setNotificationDetails({ message: "something went wrong", type: "error", showNotification: true });
			}
		}
	}

	function handleChange(e) {
		const { name, value } = e.target;
		if (name === "username" || name === "password" || name === "email") {
			setBranchData({
				...branchData,
				admin: {
					...branchData.admin,
					[name]: value,
				},
			});
		} else {
			setBranchData({ ...branchData, [name]: value });
		}
	}

	return (
		<>
			<form onSubmit={addBranch}>
				<div className="input-wrapper required">
					<label htmlFor="branch-name">Branch Name:</label>
					<input type="text" id="branch-name" name="name" value={branchData.name} onChange={(e) => handleChange(e)} required />
				</div>

				<div className="input-wrapper required">
					<label htmlFor="admin-username">Admin Username:</label>
					<input type="text" id="admin-username" name="username" value={branchData.admin.username} onChange={(e) => handleChange(e)} required />
				</div>
				<div className="input-wrapper required">
					<label htmlFor="admin-username">Admin Email:</label>
					<input type="email" id="admin-email" name="email" value={branchData.admin.email} onChange={(e) => handleChange(e)} required />
				</div>

				<div className="input-wrapper required">
					<label htmlFor="admin-password">Admin Password:</label>
					<input type="password" id="admin-password" name="password" value={branchData.admin.password} onChange={(e) => handleChange(e)} required />
				</div>

				<div className="input-wrapper required">
					<label htmlFor="branch-address">Address:</label>
					<input type="text" id="branch-address" name="address" value={branchData.address} onChange={(e) => handleChange(e)} required />
				</div>

				<div className="input-wrapper required">
					<label htmlFor="status">Status:</label>
					<select id="status" name="status" defaultValue="true" onChange={(e) => handleChange(e)} required>
						<option value="true">Active</option>
						<option value="false">Inactive</option>
					</select>
				</div>

				<button type="submit">Add Branch</button>
			</form>
		</>
	);
}

export default AddBranch;
