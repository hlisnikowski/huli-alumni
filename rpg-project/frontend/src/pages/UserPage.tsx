import React, { lazy, Suspense, useContext, useMemo } from "react";
import "../style/shop.css";
import Loading from "../components/MainComponents/Loading";
import { UserProvider, useUserContext } from "../hooks/UserContext";
import GameWindow from "../components/GameWindow";
import { EntityProvider } from "../hooks/EntityContext";
import ETC from "../components/Menu/ETC";

const UserPage = () => {
    // <Map />
    // | wait(1000).then(() =>
    const UserBar = lazy(() => import("../components/User/UserBar"));
    const Sidebar = lazy(() => import("../components/Sidebar"));

    // Render specific view ("Shop, Adventure ...")

    //SHOP
    return (
        <Suspense fallback={<Loading />}>
            <UserProvider>
                <EntityProvider>
                    <div className="d-flex">
                        <Sidebar />
                        <GameWindow />
                        <UserBar />
                    </div>
                </EntityProvider>
            </UserProvider>
        </Suspense>
    );
};

export const VIEW = {
    SHOP: "shop",
    ADVENTURE: "adventure",
    SPELL: "spell",
};

function wait(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export default UserPage;
