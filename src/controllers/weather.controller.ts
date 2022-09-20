import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { WeatherProvider } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class WeatherController {
    public constructor(@inject(TYPES.WeatherService) private _weatherService: WeatherProvider, private _defaultLocation = 'Montreal') { }

    public get router(): Router {
        /*
        * Un Router est un regroupement isolé de middlewares.
        * Ce Router est associé à la route /weather.
        * https://expressjs.com/en/4x/api.html#router
        */
        const router: Router = Router();
        
        
        //route page d'aceuil:
        router.get('/', async (req: Request, res: Response) => {

            //chercher les ville ds l'input de notre document
            this._defaultLocation = 'montreal';
            const villes = req.query.villes;


            if (typeof villes === 'string') {
                this._defaultLocation = villes;
                // si l'utilisateur la ville que l'utilisateur a entre
                const json: JSON[] = await this._weatherService.readWeather(villes);
                res.render('index', { ville: json });
            }
            // si non utiliser la ville par defautl: montreal
            const json = await this._weatherService.readWeather(this._defaultLocation);
            //convertir les donner json pour les afficher en format HTML (render)
            res.render('index', { ville: json });
        });

        // route prochaine heure
        router.get('/pheur', async (req: Request, res: Response) => {

            // const villes = req.query.villes;

            // if (typeof villes === 'string') {
            //     const json: JSON[] = await this._weatherService.readWeather(villes);
            //     //creer une propriete ville qu'on va l'utiliser ds le {{#each}}{{/each}}
            //     res.render('pheur', { ville: json });
            // }
            const json = await this._weatherService.readWeather(this._defaultLocation);

            res.render('pheur', { ville: json });

        });

        //route prochaine jour
        router.get('/pjour', async (req: Request, res: Response) => {

            const json = await this._weatherService.readWeather(this._defaultLocation);

            res.render('pjour', { ville: json });

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

