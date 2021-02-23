import React, {useContext} from 'react';
import { AuthContext } from "../context/AuthContext";
import ProvinceListItem from './ProvinceListItem';
import AdminListItem from './AdminListItem';
import './Navbar.css';
import { Link } from 'react-router-dom';
import UserListItem from './UserListItem';

const Navbar = () => {
    const {isAuthenticated, logout} = useContext(AuthContext);
    return (
        <div className="Navbar">
            { !isAuthenticated() && <Link to="/" className="Navbar-btn-name"> REGION 3 </Link>}
            <ul className="Navbar-ul">                
                <ProvinceListItem to="/dashboard">Dashboard</ProvinceListItem> 
                <AdminListItem to="/provinces">Provinces</AdminListItem>
                <AdminListItem to="/zones">Zones</AdminListItem>
                <AdminListItem to="/countries">Countries</AdminListItem>
                <AdminListItem to="/parishes">Parishes</AdminListItem>
                <AdminListItem to="/pastors">Pastors</AdminListItem>
                <ProvinceListItem to="/financial/reports">Financial Reports</ProvinceListItem>
                <ProvinceListItem to="/non-financial/reports">Non-Financial Reports</ProvinceListItem>

                <UserListItem to="/dashboard">DASHBOARD</UserListItem>
                <UserListItem to="/parish/monetaries">MONETARY</UserListItem>
                <UserListItem to="/parish/attendances">DATA RECORDS</UserListItem>
                <UserListItem to="/parish/testimonies">TESTIMONY</UserListItem>
                <UserListItem to="/parish/outreaches">OUTREACH</UserListItem>                
                <UserListItem to="/parish/welfares">WELFARE CHECK</UserListItem>
                {/* {isAuthenticated() && <li className="Navbar-logout" onClick={() => logout() }>Logout</li>}  */}
            </ul>

            <ul className="Navbar-icons">
                {isAuthenticated() && <button className="Navbar-logout-btn" onClick={() => logout() }>Logout</button>} 
            </ul>
        </div>
    )
}

export default Navbar;