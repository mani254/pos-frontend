import React, { useState, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

import { NotificationContext } from "../App";

function AddStaff() {
	const [staffData, setStaffData] = useState({ name: "", phoneNo: "", email: "", staffId: "", status: true,branchId:'' });
	const { changed, setChange, branches } = useOutletContext();
	const setNotificationDetails = useContext(NotificationContext);
	const navigate = useNavigate();

	async function addStaff(event) {
		event.preventDefault();
		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/staff/add`, staffData);
			if (res.status === 200) {
				setNotificationDetails({ message: `Staff Added sucessfully`, type: "success", showNotification: true });
				setChange(!changed);
				navigate("/staff");
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
	console.log(staffData);

	function handleChange(e) {
		const { name, value } = e.target;
		setStaffData({ ...staffData, [name]: value });
	}

	return (
		<>
			<form onSubmit={addStaff}>
			<div className="input-wrapper required">
			<label htmlFor="branchId">Branch:</label>
				<select id="branchId" name="branchId" onChange={(e)=>handleChange(e)}>
					<option value="">Select a branch</option> {/* Placeholder or default option */}
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
					<select id="status" name="status" defaultValue={"true"} onChange={(e) => handleChange(e)} required>
						<option value="true">Active</option>
						<option value="false">Inactive</option>
					</select>
				</div>

				<button type="submit">Add Branch</button>
			</form>
		</>
	);
}

export default AddStaff;
