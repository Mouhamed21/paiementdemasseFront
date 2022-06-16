import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Evenement} from "../../modele/evenement";

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

    baseUrl = environment.urlApi ;

    constructor(private httpClient: HttpClient) { }
    httpOptions =
        {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/JSON',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
        };


    getEvenements() {
        return this.httpClient.get(this.baseUrl + '/allevenements');
    }

    postEvenement(evenement:Evenement) {
        evenement.status = "En cours";
        return this.httpClient.post(this.baseUrl + '/new/evenements',  evenement )
    }

    updateEvenement(id:number,evenement:Evenement) {
        return this.httpClient.put(this.baseUrl + '/evenement/' + id,  evenement )
    }
}
