import React from "react";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import Shop from "../components/ShopComponents/Shop";
import UserBar from "../components/User/UserBar";
const UserPage = () => {
    // <Map />
    return (
        <div className="d-flex">
            <UserBar />
            <Sidebar />
            <Shop />
        </div>
    );
};

export default UserPage;
