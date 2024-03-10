import React from "react";

function RequestFullscreen({ isFullScreen, setIsFullScreen }) {
	console.log(isFullScreen, setIsFullScreen);
	function setFullScreen() {
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
		}
	}

	function exitFullscreen() {
		// if (document.exitFullscreen) {
		// 	document.exitFullscreen();
		// } else if (document.mozCancelFullScreen) {
		// 	/* Firefox */
		// 	document.mozCancelFullScreen();
		// } else if (document.webkitExitFullscreen) {
		// 	/* Chrome, Safari & Opera */
		// 	document.webkitExitFullscreen();
		// } else if (document.msExitFullscreen) {
		// 	/* IE/Edge */
		// 	document.msExitFullscreen();
		// }
		setIsFullScreen(false);
	}
	// const toggleFullScreen = (isFullScreen) => {
	// 	if (!isFullScreen) {
	// 		if (document.documentElement.requestFullscreen) {
	// 			document.documentElement.requestFullscreen();
	// 		} else if (document.documentElement.mozRequestFullScreen) {
	// 			/* Firefox */
	// 			document.documentElement.mozRequestFullScreen();
	// 		} else if (document.documentElement.webkitRequestFullscreen) {
	// 			/* Chrome, Safari & Opera */
	// 			document.documentElement.webkitRequestFullscreen();
	// 		} else if (document.documentElement.msRequestFullscreen) {
	// 			/* IE/Edge */
	// 			document.documentElement.msRequestFullscreen();
	// 		}
	// 		setIsFullScreen(isFullScreen + 1);
	// 	} else {
	// 		if (document.exitFullscreen) {
	// 			document.exitFullscreen();
	// 		} else if (document.mozCancelFullScreen) {
	// 			/* Firefox */
	// 			document.mozCancelFullScreen();
	// 		} else if (document.webkitExitFullscreen) {
	// 			/* Chrome, Safari & Opera */
	// 			document.webkitExitFullscreen();
	// 		} else if (document.msExitFullscreen) {
	// 			/* IE/Edge */
	// 			document.msExitFullscreen();
	// 		}
	// 		setIsFullScreen(isFullScreen + 1);
	// 	}
	// };

	return (
		<div className="requestfullscreen d-center">
			<div class="request-wrapper">
				<h6>Do you want to use the application in the fullscreen</h6>
				<div className="d-flex buttons-wrapper">
					<button onClick={setFullScreen}>Yes</button>
					<button onClick={exitFullscreen}>NO</button>
				</div>
			</div>
		</div>
	);
}

export default React.memo(RequestFullscreen);
