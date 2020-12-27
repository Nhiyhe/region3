import React, {useContext} from 'react';
import './Navbar.css';
import { AuthContext } from "../context/AuthContext";
import ProvinceListItem from './ProvinceListItem';
import AdminListItem from './AdminListItem';


const Navbar = () => {

    const {isAuthenticated, logout} = useContext(AuthContext);
    return (
        <div className="Navbar">
            <ul className="Navbar-ul">                
                <ProvinceListItem to="/dashboard">Dashboard</ProvinceListItem>
                <AdminListItem to="/provinces">Provinces</AdminListItem>
                <ProvinceListItem to="/zones">Zones</ProvinceListItem>
                <ProvinceListItem to="/country">Country</ProvinceListItem>
                <ProvinceListItem to="/parish">Parish</ProvinceListItem>
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