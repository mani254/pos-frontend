import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><img src="" alt="Dashboard Icon" /><Link className='link'>Dashboard</Link></li>
        <li><img src="" alt="Branch Icon" /><Link className='link'>Branch</Link></li>
        <li><img src="" alt="Billing Icon" /><Link className='link'>Billing</Link></li>
        <li><img src="" alt="Products Icon" /><Link className='link'>Products</Link></li>
        <li><img src="" alt="Procurements Icon" /><Link className='link'>Procurements</Link></li>
        <li><img src="" alt="Orders Icon" /><Link className='link'>Orders</Link></li>
        <li><img src="" alt="Customers Icon" /><Link className='link'>Customers</Link></li>
        <li><img src="" alt="Staff Icon" /><Link className='link'>Staff</Link></li>
      </ul>
      
    </nav>
  );
}

export default Navbar;
