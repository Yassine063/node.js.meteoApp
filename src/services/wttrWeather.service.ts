/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires

import { WeatherProvider } from '../interfaces';
import { injectable } from 'inversify';
const fetch = require('node-fetch');
//import fetch from 'node-fetch';

@injectable()
/*
* Cette classe fait la communication avec l'API de wttr
*/
export class wttrWeatherService implements WeatherProvider {
    constructor() {
        //empty
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async readWeather(location: string): Promise<JSON[]> {
        //TODO Extraire le JSON à l'aide du service wttr

        //creer un tableau pour les ville que l'utilisateur a entrer
        const villes = location.split(',');
        //declarer un tableau pour mettre nos donnees json qu'on va recuperer
        const dataVille: JSON[] = [];
        //parcourir notre tableau des villeset chercher nos fichier json pour chaque ville
        for (const i of villes) {

            const response = await fetch('https://wttr.in/' + i + '?format=j1');
            const data = await response.json();
            //remplir notre tableau json
            dataVille.push(data);
        }

        // const response = await fetch('https://wttr.in/paris?format=j1');

        // const json = await response.json();

        return dataVille;

    }

}   