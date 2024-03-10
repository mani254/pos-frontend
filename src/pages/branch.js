import React, { useState, useEffect, useContext } from "react";
import "../css/branch.css";

import { useLocation, useNavigate } from "react-router-dom";
import { NotificationContext } from "../App";
import axios from "axios";
import { Outlet } from "react-router-dom";

// import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';
import Header from "../components/header.js";

function Branch() {
	const [renderInfo, setRenderInfo] = useState({ branchList: true });
	const [branchesCopy, setBranchesCopy] = useState([]);
	const [branches, setBranches] = useState([]);
	const [changed, setChange] = useState(false);

	const location = useLocation();

	const navigate = useNavigate();
	const setNotificationDetails = useContext(NotificationContext);

	useEffect(() => {
		console.log("----branch main useEffect is beeing called------");

		async function fetchBranches() {
			try {
				const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/branch/getBranches`, { value: "emphty" });
				if (res.status === 200) {
					setBranchesCopy(res.data.branches);
					setBranches(res.data.branches);
				}
			} catch (err) {
				if (err.response) {
					const { message, type } = err.response.data;
					setNotificationDetails({ message, type, showNotification: true });
					navigate("/login");
				} else {
					navigate("/servererror");
					setNotificationDetails({ message: "something went wrong", type: "error", showNotification: true });
				}
			}
		}

		fetchBranches();
	}, [changed]);

	useEffect(() => {
		// console.log('rendering userEffect ')
		if (location.pathname === "/branch/add") {
			setRenderInfo({ addBranch: true });
		} else if (location.pathname.startsWith("/branch/update")) {
			setRenderInfo({ editBranch: true });
		} else {
			setRenderInfo({ branchList: true });
		}
	}, [location.pathname]);

	// async function bulkUpload(data) {

	// 	try {
	// 		const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/branch/bulkUpload`,data);

	// 		if (res.status === 200) {
	// 			setNotificationDetails({ message: `Branches Added sucessfully`, type: "success", showNotification: true });
	//             setChange(!changed)
	//             navigate('/branch')
	// 		}
	//         if(res.status==201){
	// 			setChange(!changed)
	// 				setNotificationDetails({ message:res.data.message, type:res.data.type, showNotification: true });
	//         }
	// 	} catch (err) {
	// 		if (err.response) {
	// 			const { message, type } = err.response.data;
	// 			setNotificationDetails({ message, type, showNotification: true });
	// 			if (err.response.status === 500) {
	// 				navigate("/servererror");
	// 			} else if (err.response.status === 401) {
	// 				navigate("/login");
	// 			}
	// 		} else {
	// 			navigate("/servererror");
	// 			setNotificationDetails({ message: "something went wrong", type: "error", showNotification: true });
	// 		}
	// 	}
	// }

	// const exportToExcel = (data) => {
	// 	const workbook = XLSX.utils.book_new();

	// 	const formatedData=data.map(item=>({
	// 		branchName:item.name,
	// 		username:item.admin.username,
	// 		password:item.admin.password,
	// 		address:item.address,
	// 		status:item.status,
	// 		createdAt:item.createdAt,
	// 		updatedAt:item.updatedAt

	// 	}))

	// 	const worksheet = XLSX.utils.json_to_sheet(formatedData);
	// 	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
	// 	const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
	// 	const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
	// 	FileSaver.saveAs(fileData, 'data.xlsx');
	//   };

	//   const handleFileUpload = (e) => {
	//     const file = e.target.files[0];
	//     const reader = new FileReader();
	//     reader.onload = (evt) => {
	//         const bstr = evt.target.result;
	//         const wb = XLSX.read(bstr, { type: 'binary' });
	//         const wsname = wb.SheetNames[0];
	//         const ws = wb.Sheets[wsname];
	//         const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
	// 		console.log(data)

	// 		const formattedData = data.slice(1).map(row => ({
	// 			name: row[0],
	// 			admin:{
	// 				username: row[1],
	// 				password: row[2],
	// 			},
	// 			address: row[3],
	// 			status: row[4],
	// 		}));

	//         bulkUpload(formattedData)
	//     };
	//     reader.readAsBinaryString(file);
	// };

	return (
		<>
			{console.log(branches)}
			{branchesCopy.length >= 1 && <Header props={{ sortReference: branchesCopy, keysToSearch: ["name", "adress", "admin.username", "admin.email", "_id", "status"], setParentState: setBranches, changed, setChange }} />}
			<div className="details-wrap">
				<div className="details-heading d-c-b">
					{renderInfo.addBranch && (
						<>
							<h5>Add Branch</h5>
						</>
					)}

					{renderInfo.editBranch && <h5>Edit Branch</h5>}

					{!renderInfo.editBranch && !renderInfo.addBranch && <h5>Branches</h5>}

					{renderInfo.addBranch || renderInfo.editBranch ? (
						<div></div>
					) : (
						<>
							<button
								className="b-auto"
								onClick={() => {
									navigate("/branch/add");
								}}>
								Add Branch
							</button>
							{/* <button onClick={()=>{exportToExcel(branches)}}>download Excel</button> */}
							{/* <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" /> */}
						</>
					)}
				</div>
				{console.log("main branch page rendered")}
				<hr />
				<Outlet context={{ branches, setBranches, setChange, changed }} />
			</div>
		</>
	);
}

export default Branch;
