import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function Notification(props) {

	const { type, message,showNotification } = props.data.notificationDetails;

	return (
		<div className={`${type} notification-container ${showNotification ? 'show' : 'hide'}`}>
			{console.log("notification Page rendered")}
			<div className="d-center">
				<p>{message}</p>
				<AiFillCloseCircle className="close-icon" onClick={() => props.data.setNotificationDetails({showNotification: false})} />
			</div>
		</div>
	);
}

export default Notification