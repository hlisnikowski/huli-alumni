import { RefObject } from "react";

const nature = (name: string): string => `tiles/nature/${name}`;
const walls = (name: string): string => `tiles/walls/${name}`;
const chars = (name: string): string => `tiles/chars/${name}`;

export default class TileMap {
    tileSize: number;
    imgs: HTMLImageElement[];

    constructor(tileSize: number) {
        this.tileSize = tileSize;

        this.imgs = [
            this.#image(nature("ground")),
            this.#image(walls("wall_left_top")),
            this.#image(walls("wall_top")),
            this.#image(walls("wall_right_top")),
            this.#image(walls("wall_left")),
            this.#image(walls("wall_right")),
            this.#image(walls("wall_left_down")),
            this.#image(walls("wall_right_down")),
            this.#image(chars("human")), // 8
            this.#image(nature("flowers")), // 9
            this.#image(nature("grass")), // 10
        ];
    }

    #image(fileName: string) {
        const img = new Image();
        img.src = `src/assets/game/${fileName}.png`;
        return img;
    }
    // 0 - ground
    // 1 - WLT 2 - WT 3 - WRT
    // 4 - WL  5 - WR
    // 6 - WLD 2 WT 7 WRD
    // 8 Human
    map = [
        [0, 1, 2, 2, 2, 3, 0, 0],
        [10, 4, 0, 0, 0, 5, 0, 9],
        [0, 4, 9, 0, 0, 5, 10, 0],
        [0, 4, 0, 9, 0, 5, 0, 0],
        [0, 6, 2, 2, 9, 7, 10, 0],
        [10, 9, 0, 0, 9, 0, 0, 0],
        [9, 0, 8, 0, 9, 9, 0, 9],
        [0, 0, 0, 0, 0, 10, 0, 0],
    ];

    smooth = (ctx: CanvasRenderingContext2D) => {
        ctx.imageSmoothingEnabled = false;
    };

    draw(canva: RefObject<HTMLCanvasElement>, ctx: CanvasRenderingContext2D) {
        if (!ctx.imageSmoothingEnabled) {
            this.#setCanvaSize(canva, ctx);
            this.#clearCanvas(canva, ctx);
            this.#drawMap(ctx);
        }
    }

    #drawMap(ctx: CanvasRenderingContext2D) {
        for (let row = 0; row < this.map.length; row++)
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                let image = this.imgs[tile];
                ctx?.drawImage(image, column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
            }
    }

    #clearCanvas(canva: RefObject<HTMLCanvasElement>, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canva.current!.width, canva.current!.height);
    }

    #setCanvaSize(canva: RefObject<HTMLCanvasElement>, ctx: CanvasRenderingContext2D) {
        if (canva.current) {
            canva.current.height = this.map.length * this.tileSize;
            canva.current.width = this.map[0].length * this.tileSize;
            this.smooth(ctx);
        } else console.log("No canvas");
    }
}
