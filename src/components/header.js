import React, { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { LoginContext } from "../App";
import { useLocation } from "react-router-dom";

function Header(values) {
	const { sortReference = [], keysToSearch = [], setParentState = () => {} } = values.props || {};

	const [searchInput, setSearchInput] = useState("");
	const { loginInfo } = useContext(LoginContext);

	const location = useLocation();
	// console.log("header component rendered");
	//   useEffect(() => {
	//     const timeoutId = setTimeout(() => {
	//         if (searchInput.trim() === '') {
	//             // setParentState(referenceCopy)
	//             setParentState(sortReference)
	//         } else {
	//             const filteredData = sortReference.filter(item => {
	//             return keysToSearch.some(key =>
	//                 String(item[key]).toLowerCase().includes(searchInput.toLowerCase())
	//             );
	//         });
	//         setParentState(filteredData);
	//         }
	//     }, 500);

	//     return () => clearTimeout(timeoutId);
	// }, [searchInput]);

	//use effect to handle the search input

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			console.log(sortReference, "sortReference");

			if (searchInput.trim() === "") {
				setParentState(sortReference);
			} else {
				const filteredData = sortReference.filter((item) => {
					return keysToSearch.some((key) => {
						if (key.includes(".")) {
							const nestedKeys = key.split(".");
							let nestedObject = item;
							for (let nestedKey of nestedKeys) {
								if (nestedObject && nestedObject.hasOwnProperty(nestedKey)) {
									nestedObject = nestedObject[nestedKey];
								} else {
									return false;
								}
							}
							return String(nestedObject).toLowerCase().includes(searchInput.toLowerCase());
						} else {
							return String(item[key]).toLowerCase().includes(searchInput.toLowerCase());
						}
					});
				});
				setParentState(filteredData);
			}
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [searchInput]);

	return (
		<header className="header d-c-b">
			{console.log("header page rendered")}
			<div className="search-wrapper">
				<input
					type="text"
					onChange={(e) => {
						setSearchInput(e.target.value);
					}}
				/>
				<FaSearch className="search-icon" />
			</div>

			<div className="store-name">
				<h5>{loginInfo.storeName}</h5>
			</div>

			<div className="user-info d-center">
				<p>{loginInfo.username}</p>
				<img src="/assets/images/robot.jpg" />
			</div>
		</header>
	);
}

export default Header;
