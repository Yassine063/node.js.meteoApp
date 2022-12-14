/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';
import * as hbs from 'hbs';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { WeatherController } from './controllers/weather.controller';
//importer la class astronomy controller
import { AstronomyController } from './controllers/astronomy.controller';
@injectable()
export class Application {

    private readonly _internalError: number = 500;
    private readonly _viewsDir: string = path.join(__dirname, '..', 'templates', 'views');
    private readonly _partialsDir: string = path.join(__dirname, '..', 'templates', 'partials');
    public public: string = path.join(__dirname, '..', 'public');
    public app: express.Application;
    //ajouter un variable astronomy controller ds le constructeur
    public constructor(@inject(TYPES.WeatherController) private _weatherController: WeatherController, @inject(TYPES.AstronomyController) private _astronomyController: AstronomyController) {

        this.app = express();

        this.config();

        this.bindRoutes();
    }

    private config(): void {
        //Configuration de Handlebars
        this.app.set('view engine', 'hbs');
        this.app.set('views', this._viewsDir);
        hbs.registerPartials(this._partialsDir);
        hbs.registerHelper('formatheure',(time)=> time/100);

        // Configuration des middlewares pour toutes les requêtes
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());

        //TODO Configurer les ressources statiques
        this.app.use(express.static(this.public));

    }

    public bindRoutes(): void {
        //La route par défaut est /weather
        this.app.get('/', (req, res) => {
            res.redirect('/weather');
        });

        // Le weather controller se charge des routes /weather/*

        this.app.use('/weather', this._weatherController.router);


        //TODO Ajouter un controller pour les routes /astronomy/*
        this.app.use('/astronomy', this._astronomyController.router);


        // this.app.use('/astronomy', this._weatherController.astronomy);
        // this.app.use('/Pjour', this._weatherController.Pjour);
        // this.app.use('/pheur', this._weatherController.Pheure);

        // En dernier lieu, on fait la gestion d'erreur 

        // si aucune route n'est trouvé
        this.errorHandeling();
    }

    private errorHandeling(): void {
        // Gestion des erreurs
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error('Not Found');
            next(err);
        });

        // Error handler en pour l'environnement de développement
        // Imprime le stacktrace
        if (this.app.get('env') === 'development') {
            this.app.use((err: any, req: express.Request, res: express.Response) => {
                res.status(err.status || this._internalError);
                res.send({
                    message: err.message,
                    error: err,
                });
            });
        }

        // Error handler pour l'environnement de production
        this.app.use((err: any, req: express.Request, res: express.Response) => {
            res.status(err.status || this._internalError);
            res.send({
                message: err.message,
                error: {},
            });
        });
    }
}