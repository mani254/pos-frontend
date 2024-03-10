import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { NotificationContext } from "../App";

function UpdateStaff() {
	const navigate = useNavigate();
	const [staffData, setStaffData] = useState(null);
	const setNotificationDetails = useContext(NotificationContext);
	const { changed, setChange, branches } = useOutletContext();

	const { id } = useParams();

	useEffect(() => {
		console.log("---- update staff useEffect is beeing called------");

		async function fetchStaff() {
			try {
				const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/staff/getStaffById`, { id });

				if (res.status === 200) {
					setStaffData(res.data.singleStaff);
				}
			} catch (err) {
				if (err.response) {
					const { message, type } = err.response.data;
					setNotificationDetails({ message, type, showNotification: true });

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

		fetchStaff();
	}, []);

	console.log(staffData);
	function handleChange(e) {
		const { name, value } = e.target;
		setStaffData({ ...staffData, [name]: value });
	}

	async function updateStaff(event) {
		event.preventDefault();

		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/staff/update`, staffData);

			if (res.status === 200) {
				setNotificationDetails({ message: `Staff updated sucessfully`, type: "success", showNotification: true });
				setChange(!changed);
				navigate("/staff");
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
			{staffData && (
				<form onSubmit={updateStaff}>
					<div className="input-wrapper required">
						<label htmlFor="branchId">Branch:</label>
						<select id="branchId" name="branchId" defaultValue={staffData.branch} onChange={(e) => handleChange(e)}>
							{branches.map((branch) => {
								return (
									<option key={branch.id} value={branch.id}>
										{branch.branchName}
									</option>
								);
							})}
						</select>
					</div>

					<div className="input-wrapper required">
						<label htmlFor="staff-name">Name:</label>
						<input type="text" id="staff-name" name="name" value={staffData.name} onChange={(e) => handleChange(e)} required />
					</div>
					<div className="input-wrapper required">
						<label htmlFor="phoneNo">Phone No:</label>
						<input type="tel" id="phoneNO" name="phoneNo" value={staffData.phoneNo} onChange={(e) => handleChange(e)} required />
					</div>
					<div className="input-wrapper required">
						<label htmlFor="staff-email">Email:</label>
						<input type="email" id="staff-email" name="email" value={staffData.email} onChange={(e) => handleChange(e)} required />
					</div>

					<div className="input-wrapper required">
						<label htmlFor="staff-id">Staff Id:</label>
						<input type="number" id="staff-id" name="staffId" value={staffData.staffId} onChange={(e) => handleChange(e)} required />
					</div>

					<div className="input-wrapper required">
						<label htmlFor="status">Status:</label>
						<select id="status" name="status" defaultValue={staffData.status ? "true" : "false"} onChange={(e) => handleChange(e)} required>
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

export default UpdateStaff;
