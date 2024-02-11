import React,{useState} from 'react';
import { NavLink,useLocation,Outlet } from 'react-router-dom';



import Header from './header';

function Navbar(props) {

  console.log('navbar component is rendered')
  const {darkTheme,setDarkTheme}=props.props
  
  const location =useLocation()

  return (
    <div className="main-page">
    <nav className="navbar d-c-b flex-column">
    
      <div>
        <div className="logo-wrapper">
            <img  src={`/assets/images/${darkTheme?"logo-dark.png":"logo.png"}`} className='logo'   alt="retail-nest-logo"/>
            
        </div>

        <ul className="nav-links">
        <NavLink to="/dashboard"><li className={`d-v-center ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <img src="/assets/images/dashboard.png" alt="Dashboard Icon" />
          Dashboard
        </li>
        </NavLink>
        <NavLink to="/branch"><li className={`d-v-center ${location.pathname === '/branch' ? 'active' : ''}`}>
          <img src="/assets/images/branch.png" alt="Branch Icon" />
          Branch
        </li></NavLink>
        <NavLink to="/billing"><li className={`d-v-center ${location.pathname === '/billing' ? 'active' : ''}`}>
          <img src="/assets/images/billing.png" alt="Billing Icon" />
          Billing
        </li></NavLink>
        <NavLink to="/products"> <li className={`d-v-center ${location.pathname === '/products' ? 'active' : ''}`}>
          <img src="/assets/images/products.png" alt="Products Icon" />
          Products
        </li></NavLink>
        <NavLink to="/procurements"><li className={`d-v-center ${location.pathname === '/procurements' ? 'active' : ''}`}>
          <img src="/assets/images/procurements.png" alt="Procurements Icon" />
          Procurements
        </li></NavLink>
        <NavLink to="/orders"><li className={`d-v-center ${location.pathname === '/orders' ? 'active' : ''}`}>
          <img src="/assets/images/orders.png" alt="Orders Icon" />
          Orders
        </li></NavLink>
        <NavLink to="/customers"><li className={`d-v-center ${location.pathname === '/customers' ? 'active' : ''}`}>
          <img src="/assets/images/customers.png" alt="Customers Icon" />
          Customers
        </li></NavLink>
        <NavLink to="/staff"><li className={`d-v-center ${location.pathname === '/staff' ? 'active' : ''}`}>
          <img src="/assets/images/staff.png" alt="Staff Icon" />
          Staff
        </li></NavLink>
      </ul>
      </div>

      <div className="theme">
        <div className="switch-wrapper">
          <input type="checkbox" className='theme-box a-t-l' id="theme-box" onChange={()=>setDarkTheme(!darkTheme)}></input>
          <div className='switch'></div>
        </div>
      </div>
    </nav>
    <section className="content-section">
      <Header></Header>
      <Outlet/>
    </section>
    </div>
  );
}

export default Navbar;
