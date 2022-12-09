import React, { useEffect, useRef } from "react";
import TileMap from "../models/TileMap";

import "../style/map.css";
import ground from "../assets/game/tiles/wall_top.png";

const Map = () => {
    const canva = useRef<HTMLCanvasElement>(null);
    const background = useRef<HTMLDivElement>(null);

    const tileSize = 42;
    const tileMap = new TileMap(tileSize);

    const draw = () => {
        let ctx = canva.current?.getContext("2d");

        if (ctx) {
            ctx.imageSmoothingEnabled = false;
            if (!ctx.imageSmoothingEnabled) tileMap.draw(canva, ctx);
        }
    };

    useEffect(() => {
        draw();
        const w = canva.current!.width + 12;
        const h = canva.current!.height + 14;
        background.current!.style.width = w + "px";
        background.current!.style.height = h + "px";
    }, []);

    setInterval(draw, 1000 / 1);

    return (
        <>
            <div ref={background} className="canva">
                <canvas style={{ imageRendering: "pixelated" }} ref={canva} id="map"></canvas>
            </div>
        </>
    );
};

export default Map;
