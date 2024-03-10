import React, { useState, useEffect, useContext } from "react";
import "../css/branch.css";

import { useLocation, useNavigate } from "react-router-dom";
import { NotificationContext } from "../App";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

function Staff() {
	const [renderInfo, setRenderInfo] = useState({ staffList: true });
	const [branchFilter, setBranchFilter] = useState("all");
	const [filteredStaff, setFilterdStaff] = useState([]);
	const [branches, setBranches] = useState([]);
	const [staff, setStaff] = useState([]);
	const [staffCopy, setStaffCopy] = useState([]);
	const [changed, setChange] = useState(false);

	const location = useLocation();
	console.log("staff page is rendered");

	const navigate = useNavigate();
	const setNotificationDetails = useContext(NotificationContext);

	// useEffect to fetch the staff Data
	useEffect(() => {
		async function fetchData() {
			try {
				const staffRes = await axios.post(`${process.env.REACT_APP_SERVERURL}/staff/getStoreStaff`, { value: "null" });
				const branchRes = await axios.post(`${process.env.REACT_APP_SERVERURL}/branch/getBranchNames`, { value: "null" });

				if (staffRes.status === 200) {
					setStaffCopy(staffRes.data.storeStaff);
					setStaff(staffRes.data.storeStaff);
				} else if (staffRes.status === 201) {
					setNotificationDetails({ message: staffRes.data.message, type: staffRes.data.message, showNotification: true });
				}

				if (branchRes.status === 200) {
					setBranches(branchRes.data.branches);
				} else if (branchRes.status === 201) {
					setNotificationDetails({ message: branchRes.data.message, type: branchRes.data.message, showNotification: true });
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
		fetchData();
	}, [changed]);

	useEffect(() => {
		console.log(staffCopy, "staffCopy");
		if (branchFilter == "all") {
			setStaff(staffCopy);
			setFilterdStaff(staffCopy);
			console.log("helo");
			return;
		}
		let filStaff = staffCopy.filter((singleStaff) => singleStaff.branch == branchFilter);
		setStaff(filStaff);
		setFilterdStaff(filStaff);
	}, [branchFilter, staffCopy]);

	useEffect(() => {
		if (location.pathname === "/staff") {
			setRenderInfo({ staffList: true });
		} else if (location.pathname === "/staff/add") {
			setRenderInfo({ addStaff: true });
		} else if (location.pathname.startsWith("/staff/update")) {
			setRenderInfo({ editStaff: true });
		}
	}, [location.pathname]);

	console.log(branches);
	return (
		<>
			{console.log(staffCopy.length, staffCopy)}
			{filteredStaff.length > 0 && <Header props={{ sortReference: filteredStaff, keysToSearch: ["name", "phoneNo", "email", "status", "staffId", "_id"], setParentState: setStaff }} />}

			<div className="details-wrap">
				<div className="details-heading d-c-b">
					{renderInfo.addStaff && <h5>Add Staff</h5>}
					{renderInfo.editStaff && <h5>Edit Staff</h5>}
					{renderInfo.staffList && <h5>Staff</h5>}

					{renderInfo.staffList && (
						<>
							<select type="select" defaultValue={branchFilter} style={{ width: "150px" }} onChange={(e) => setBranchFilter(e.target.value)}>
								<option value="all">Select Branch</option>
								{branches.map((branch) => {
									return (
										<option key="branch.id" value={branch.id}>
											{branch.branchName}
										</option>
									);
								})}
							</select>

							<button
								className="b-auto"
								onClick={() => {
									navigate("/staff/add");
								}}>
								Add Staff
							</button>
						</>
					)}
				</div>
				<hr />

				<Outlet context={{ staff, setStaff, setChange, changed, branches }} />
			</div>
		</>
	);
}

export default Staff;
