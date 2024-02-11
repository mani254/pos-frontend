import React,{useState,useContext} from 'react'
import { FaSearch } from "react-icons/fa";
import { LoginContext } from "../App";

function Header() {

  const [searchInput,setSearchInput]=useState('')
  const {loginInfo}=useContext(LoginContext);
  console.log('header component rendered')

  return (
    <header className='header d-c-b' >

        <div className='search-wrapper'>
            <input type="text" onChange={(e)=>{setSearchInput(e.target.value)}}/>
            <FaSearch className='search-icon' />
        </div>

        <div className='store-name'>
            <h5>{loginInfo.storeId}</h5>
        </div>
        
        <div className='user-info d-center'>
            <p>{loginInfo.username}</p>
            <img src="/assets/images/robot.jpg"/>
        </div>

       
        
    </header>
  )
}

export default Header
