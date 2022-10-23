// PIXI.Loader.registerPlugin(PIXI.WebfontLoaderPlugin);
import * as PIXI from 'pixi.js';
import {Howl} from 'howler';
import {LoaderResource} from "pixi.js";
import {Loader} from "@pixi/loaders";
import {Dict} from "@pixi/utils";
import {WebfontLoaderPlugin} from "pixi-webfont-loader";
// Run the game
export class GameManager{
    private _app!: PIXI.Application;
    private _embient!: Howl;

    public constructor(){
        const root: HTMLElement | null = document.querySelector('#root');
        if (!root) {
            return;
        }
        this._setupSounds();
        Loader.registerPlugin(WebfontLoaderPlugin);
        // console.warn('devicePixelRatio: ', devicePixelRatio);
        this._app = new PIXI.Application({
            resizeTo: window,
            backgroundColor: PIXI.utils.string2hex('#5098C8'),
            // resolution: devicePixelRatio
        });
        root?.appendChild(this._app.view);

        this._app.loader
            .add('zubiloBlack', 'assets/fonts/Zubilo Black.otf')
            .add('bunnyRider', 'assets/mi_bunny_idle_03.png')
            .add('btnFullScreen', 'assets/ui/btn_fullscreen_active.png')
            .add('btnFullScreenHover', 'assets/ui/btn_fullscreen_hover.png')
            .add('btnFullScreenPressed', 'assets/ui/btn_fullscreen_press.png')
            .add('collectCoinIcon', 'assets/ui/collect_coin_icon.png')
            .add('coinScorePlate', 'assets/ui/coin_score_plate.png');
        this._app.loader.load((loader: Loader,
                               resources: Dict<LoaderResource>) => this._onCompleteSignal(loader, resources));
    }

    private _onCompleteSignal(
        loader: Loader,
        resources: Dict<LoaderResource>
    ): void{
        console.warn('res: ', resources);
        //create a sprite from a 'gecko.png' image
        const bunny:PIXI.Sprite = new PIXI.Sprite(resources?.bunnyRider?.texture);


        //position the gecko in the center of the screen
        bunny.scale.set(0.5);
        bunny.x = this._app.renderer.width / 2;
        bunny.y = this._app.renderer.height / 2;

        //add an anchor so the rotate pivots the center of the image
        bunny.anchor.set(0.5, 0.5);

        //add the gecko to the screen
        this._app.stage.addChild(bunny);
        const skewText = new PIXI.Text(
            'Bunny Rider',
            {
                fontFamily: 'zubiloBlack',
                fontSize: 32,
                fill: '#003d71'
            }
        );
        skewText.x = this._app.renderer.width / 2;
        skewText.y = this._app.renderer.height / 10;
            // .skew.set(0.65, -0.3);
        skewText.anchor.set(0.5, 0.5);
        this._app.stage.addChild(skewText);

        //listen for frame updates
        this._app.ticker.add(() => {
            //each frame spin the gecko around a tiny bit
            bunny.rotation -= 0.01;
        });
    }


    private _setupSounds(): void {
        this._embient = new Howl({
            src: ['assets/sounds/music.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.5,
        });
        // this.hitSound = new Howl({
        //     src: [this.assetBase + 'hit2.wav']
        // });
    }
}
