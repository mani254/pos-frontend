import React, { useContext } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useOutlet, useOutletContext } from 'react-router-dom';
import { NotificationContext } from '../App';
import axios from 'axios';

function BranchesList() {


    const {branches,setBranches}=useOutletContext()
    const navigate=useNavigate()
    const setNotificationDetails=useContext(NotificationContext)

    async function updateStatus(_id) {

		const updatedBranches = branches.map((branch) => {
			if (branch._id === _id) {
				return {
					...branch,
					status: !branch.status,
				};
			}
			return branch;
		});
		setBranches(updatedBranches);

		let currentBranch = branches.find((branch) => branch._id === _id);
		currentBranch.status = !currentBranch.status;

		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/branch/updateBranch`, currentBranch);

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

    function editBranchFun(id) {
		navigate(`/branch/update/${id}`);
	}

    async function deleteBranch(id){

        const updatedArray = branches.filter(obj => obj._id !== id);
        setBranches(updatedArray);

        try {
			const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/branch/deleteBranch`, {branchId:id});

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

  return (
    <>{branches&& <table>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Branch Name</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {branches.map((branch, index) => (
                <tr key={branch._id}>
                    <td>{index + 1}</td>
                    <td>{branch.name}</td>
                    <td>
                        <div className={`toggle-switch ${branch.status ? "active" : ""}`} onClick={() => updateStatus(branch._id)}>
                            <div className="toggle-label"> </div>
                        </div>
                    </td>
                    <td style={{}}>
                        <FaEdit className="icon edit" onClick={() => editBranchFun(branch._id)} />
                        <MdDeleteForever className="icon delete" onClick={() => deleteBranch(branch._id)} />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>}</>
    
  )
}

export default BranchesList
