import React, { useState, useEffect, useContext } from "react";
import "../css/branch.css";

import { useLocation, useNavigate } from "react-router-dom";
import { NotificationContext } from "../App";
import axios from "axios";
import { Outlet } from "react-router-dom";



function Branch() {
	const [renderInfo,setRenderInfo]=useState({branchList:true})
	const [branches, setBranches] = useState([]);
	const location=useLocation()
	console.log('branch page is rendered')

	const [changed, setChange] = useState(false);

	const navigate = useNavigate();
	const setNotificationDetails = useContext(NotificationContext);

	useEffect(() => {
		console.log("----branch useEffect is beeing called------");

		async function fetchBranches() {
			try {
				const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/branch/getBranches`, { value: "emphty" });

				if (res.status === 200) {
					setBranches(res.data.branches);
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

		fetchBranches();
	}, [changed]);


	useEffect(()=>{
		console.log('rendering userEffect')
		if(location.pathname==="/branch/add"){
			setRenderInfo({addBranch:true})
		}
		else if (location.pathname.startsWith('/branch/edit')){
			setRenderInfo({editBranch:true})
		}
	},[renderInfo,changed]) 
	
	

	return (
		<div className="details-wrap">
			<div className="details-heading d-c-b">
				{renderInfo.addBranch && <h5>Add Branch</h5>}
				{renderInfo.editBranch && <h5>Edit Branch</h5>}
				{!renderInfo.editBranch && !renderInfo.addBranch && <h5>Branches</h5>}

				{renderInfo.addBranch || renderInfo.editBranch ? (
					<div></div>
				) : (
					<button
						className="b-auto"
						onClick={() => {
							navigate("/branch/add");
						}}>
						Add Branch
					</button>
				)}
			</div>
			<hr />

			<Outlet context={{branches,setBranches,setChange,changed}} />
		</div>
	);
}

export default Branch;
