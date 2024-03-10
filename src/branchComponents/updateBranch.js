import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { NotificationContext } from "../App";

function UpdateBranch() {
	const navigate = useNavigate();
	const [branchData, setBranchData] = useState(null);
	const setNotificationDetails = useContext(NotificationContext);
	const { branches, setBranches } = useOutletContext();

	const { id } = useParams();

	useEffect(() => {
		console.log("---- update branch useEffect is beeing called------");

		async function fetchBranch() {
			try {
				const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/branch/getBranch`, { id });

				if (res.status === 200) {
					setBranchData(res.data.branch);
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

		fetchBranch();
	}, []);

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

	async function updateBranch(event) {
		event.preventDefault();

		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/branch/updateBranch`, branchData);

			if (res.status === 200) {
				setNotificationDetails({ message: `Branch updated sucessfully`, type: "success", showNotification: true });
				// setChange(!changed);
				let bcopy = branches;
				const index = bcopy.findIndex((obj) => obj._id == branchData._id);
				if (index !== -1) {
					bcopy[index] = { ...bcopy[index], ...branchData };
				}

				setBranches(bcopy);

				navigate("/branch");
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

	return (
		<>
			{branchData && (
				<form onSubmit={updateBranch}>
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
						<select id="status" name="status" onChange={(e) => handleChange(e)} defaultValue={branchData.status ? "true" : "false"} required>
							<option value="true">Active</option>
							<option value="false">Inactive</option>
						</select>
					</div>

					<button type="submit">update Branch</button>
				</form>
			)}
		</>
	);
}

export default UpdateBranch;
