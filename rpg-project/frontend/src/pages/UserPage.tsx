import React, { lazy, Suspense } from "react";
import Loading from "../components/MainComponents/Loading";

const UserPage = () => {
    // <Map />
    const Shop = lazy(() => wait(1000).then(() => import("../components/ShopComponents/Shop")));
    const UserBar = lazy(() => import("../components/User/UserBar"));
    const Sidebar = lazy(() => import("../components/Sidebar"));

    return (
        <Suspense fallback={<Loading />}>
            <div className="d-flex">
                <UserBar />
                <Sidebar />¨
                <Shop />
            </div>
        </Suspense>
    );
};

function wait(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export default UserPage;
