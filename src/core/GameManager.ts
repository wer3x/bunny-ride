import * as PIXI from 'pixi.js';
import {LoaderResource} from "pixi.js";
import {Loader} from "@pixi/loaders";
import {Dict} from "@pixi/utils";
// Run the game
export class GameManager{
    private _app: PIXI.Application;

    public constructor(){
        this._app = new PIXI.Application({backgroundColor: 0xFFFFFF });
        document.body.appendChild(this._app.view);

        this._app.loader.add('bunnyRider', 'assets/mi_bunny_idle_03.png');
        this._app.loader.load((loader: Loader,
                               resources: Dict<LoaderResource>) => this.onCompleteSignal(loader, resources));
    }

    private onCompleteSignal(
        loader: Loader,
        resources: Dict<LoaderResource>
    ): void{
        console.warn('res: ', resources);
        //create a sprite from a 'gecko.png' image
        const gecko:PIXI.Sprite = new PIXI.Sprite(resources?.bunnyRider?.texture);

        //position the gecko in the center of the screen
        gecko.x = this._app.renderer.width / 2;
        gecko.y = this._app.renderer.height / 2;

        //add an anchor so the rotate pivots the center of the image
        gecko.anchor.x = 0.5;
        gecko.anchor.y = 0.5;

        //add the gecko to the screen
        this._app.stage.addChild(gecko);

        //listen for frame updates
        this._app.ticker.add(() => {
            //each frame spin the gecko around a tiny bit
            gecko.rotation -= 0.01;
        });
    }
}
