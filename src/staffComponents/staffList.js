import React, { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import { NotificationContext } from "../App";
import axios from "axios";

function StaffList() {
	const { staff, setStaff, branches } = useOutletContext();
	const navigate = useNavigate();
	const setNotificationDetails = useContext(NotificationContext);

	async function updateStatus(id) {
		const updatedStaff = staff.map((staff) => {
			if (staff._id === id) {
				return {
					...staff,
					status: !staff.status,
				};
			}
			return staff;
		});
		setStaff(updatedStaff);

		let currentStaff = staff.find((staff) => staff._id === id);
		currentStaff.status = !currentStaff.status;

		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/staff/update`, currentStaff);

			if (res.status === 200) {
				setNotificationDetails({ message: ` Status updated sucessfully`, type: "success", showNotification: true });
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

	function editStaffFun(id) {
		navigate(`/staff/update/${id}`);
	}

	async function deleteStaff(staffId, branchId) {
		const updatedArray = staff.filter((obj) => obj._id !== staffId);
		setStaff(updatedArray);

		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/staff/delete`, { staffId, branchId });

			if (res.status === 200) {
				setNotificationDetails({ message: `Staff deleted Successfully`, type: "success", showNotification: true });
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

	return (
		<>
			{staff && (
				<table>
					<thead>
						<tr>
							<th>S.No</th>
							<th>Name</th>
							<th>Phone No</th>
							<th>Email</th>
							<th>Branch</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{staff.map((staff, index) => (
							<tr key={staff._id}>
								<td>{index + 1}</td>
								<td>{staff.name}</td>
								<td>{staff.phoneNo}</td>
								<td>{staff.email}</td>
								<td>{branches.find((branch) => branch.id === staff.branch).branchName}</td>
								<td>
									<div className={`toggle-switch ${staff.status && "active"}`} onClick={() => updateStatus(staff._id)}>
										<div className="toggle-label"> </div>
									</div>
								</td>
								<td style={{}}>
									<FaEdit className="icon edit" onClick={() => editStaffFun(staff._id)} />
									<MdDeleteForever className="icon delete" onClick={() => deleteStaff(staff._id, staff.branch)} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
}

export default StaffList;
