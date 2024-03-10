import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const toggleFullScreen = () => {
		if (!isFullScreen) {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				/* Firefox */
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				/* Chrome, Safari & Opera */
				document.documentElement.webkitRequestFullscreen();
			} else if (document.documentElement.msRequestFullscreen) {
				/* IE/Edge */
				document.documentElement.msRequestFullscreen();
			}
			setIsFullScreen(true);
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				/* Firefox */
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				/* Chrome, Safari & Opera */
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				/* IE/Edge */
				document.msExitFullscreen();
			}
			setIsFullScreen(false);
		}
	};
	return (
		//  <div>
		//    <div className="dashboard"><h1>Dashboard</h1></div>
		//  </div>
		<div>
			<button onClick={toggleFullScreen}>{isFullScreen ? "Exit Fullscreen" : "Go Fullscreen"}</button>
			<div>{/* Your POS application components go here */}</div>
		</div>
	);
}

export default Dashboard;
