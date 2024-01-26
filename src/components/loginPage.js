import React, { useState } from "react";
import axios from 'axios';


import "../css/loginPage.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [loginDetails,setLoginDetails]=useState({username:'',password:''})
	const [view, setView] = useState(false);

    const navigate=useNavigate()

    async function loginFunction(e){

        e.preventDefault();

        try{
            const res=await axios.post(`${process.env.REACT_APP_SERVERURL}`,loginDetails)

            if (res.status===200){
                console.log(res.data)
                navigate('/')
            } 
        }
        catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
        }
    }

	return (
		<>
			<section className="login d-center" style={{ backgroundImage: "url('assets/images/login-background.jpg')" }}>
				<div className="login-container">
					<form onSubmit={loginFunction}>
						<div className="input-wrapper">
							<label for="username"> Username:</label>
							<input type="text" name="username" id="username" onChange={(e)=>setLoginDetails({...loginDetails,username:e.target.value})}></input>
						</div>
						<div className="input-wrapper">
							<label for="password"> password:</label>
                            <div className="r-input-wrapper">
							<input type={view ? "text" : "password"} name="password" id="password" onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})}></input>
							<div className="eye-symbol" onClick={()=>setView(!view)}>{view ?<IoIosEyeOff />:<IoIosEye /> }</div>
                            </div>
						</div>
						<button type="submit" className="button">
							Login
						</button>
					</form>
				</div>
			</section>
		</>
	);
}

export default LoginPage;
