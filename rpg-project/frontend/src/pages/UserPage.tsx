import React, { lazy, Suspense } from "react";
import Loading from "../components/MainComponents/Loading";
import { UserProvider } from "../hooks/UserContext";

const UserPage = () => {
    // <Map />
    const Shop = lazy(() => wait(1000).then(() => import("../components/ShopComponents/Shop")));
    const UserBar = lazy(() => import("../components/User/UserBar"));
    const Sidebar = lazy(() => import("../components/Sidebar"));

    return (
        <Suspense fallback={<Loading />}>
            <div className="d-flex">
                <UserProvider>
                    <UserBar />
                    <Sidebar />
                    <Shop />
                </UserProvider>
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
