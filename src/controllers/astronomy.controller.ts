import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { WeatherProvider } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class AstronomyController {
    public constructor(@inject(TYPES.WeatherService) private _weatherService: WeatherProvider, private _defaultLocation = 'Montreal') { }

    public get router(): Router {
        /*
        * Un Router est un regroupement isolé de middlewares.
        * Ce Router est associé à la route /weather.
        * https://expressjs.com/en/4x/api.html#router
        */
        //creer une roue pour l'astronomie:
        const router: Router = Router();

        router.use(async (req: Request, res: Response ) => {
            const villes = req.query.villes;


            if (typeof villes === 'string') {
              
                const json: JSON[] = await this._weatherService.readWeather(villes);

                res.render('astronomy', { ville: json });
            }
            const json = await this._weatherService.readWeather(this._defaultLocation);

            res.render('astronomy', { ville: json });
        });



        return router;
    }














    // public get astronomy() : Router {
    //     /*
    //     * Un Router est un regroupement isolé de middlewares.
    //     * Ce Router est associé à la route /weather.
    //     * https://expressjs.com/en/4x/api.html#router
    //     */
    //     const router: Router = Router();

    //     router.use(async (req:Request, res: Response) => {
    //         const json = await this._weatherService.readWeather(this._defaultLocation);
    //         console.log(json);
    //         res.render('./astronomy',json);
    //     });

    //     return router;
    // }
    // public get Pjour() : Router {
    //     /*
    //     * Un Router est un regroupement isolé de middlewares.
    //     * Ce Router est associé à la route /weather.
    //     * https://expressjs.com/en/4x/api.html#router
    //     */
    //     const router: Router = Router();

    //     router.use(async (req:Request, res: Response) => {
    //         const json = await this._weatherService.readWeather(this._defaultLocation);
    //         console.log(json);
    //         res.render('./Pjour',json);
    //     });

    //     return router;
    // }
    // public get Pheure() : Router {
    //     /*
    //     * Un Router est un regroupement isolé de middlewares.
    //     * Ce Router est associé à la route /weather.
    //     * https://expressjs.com/en/4x/api.html#router
    //     */
    //     const router: Router = Router();

    //     router.use(async (req:Request, res: Response) => {
    //         const json = await this._weatherService.readWeather(this._defaultLocation);
    //         console.log(json);
    //         res.render('./Pheur',json);
    //     });

    //     return router;
    // }
}

