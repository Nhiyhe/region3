import React, {useContext} from 'react';
import { AuthContext } from "../context/AuthContext";
import ProvinceListItem from './ProvinceListItem';
import AdminListItem from './AdminListItem';
import './Navbar.css';

const Navbar = () => {
    const {isAuthenticated, logout} = useContext(AuthContext);
    return (
        <div className="Navbar">
            <ul className="Navbar-ul">                
                <ProvinceListItem to="/dashboard">Dashboard</ProvinceListItem>
                <AdminListItem to="/provinces">Provinces</AdminListItem>
                <ProvinceListItem to="/zones">Zones</ProvinceListItem>
                <ProvinceListItem to="/countries">Country</ProvinceListItem>
                <ProvinceListItem to="/parishes">Parish</ProvinceListItem>
                <ProvinceListItem to="/pastors">Pastors</ProvinceListItem>
                {/* {isAuthenticated() && <li className="Navbar-logout" onClick={() => logout() }>Logout</li>}  */}
            </ul>

            <ul className="Navbar-icons">
                {isAuthenticated() && <button className="Navbar-logout-btn" onClick={() => logout() }>Logout</button>} 
            </ul>
        </div>
    )
}

export default Navbar;