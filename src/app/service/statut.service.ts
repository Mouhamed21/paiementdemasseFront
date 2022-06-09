import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Classe} from "../modele/classe";
import {Statut} from "../modele/statut";

@Injectable({
  providedIn: 'root'
})

export class StatutService {
    baseUrl = environment.urlApi ;
    statuts:any;
  constructor(private httpClient: HttpClient) { }
    httpOptions =
        {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/JSON',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
        };


    getStatuts() {
        return this.httpClient.get(this.baseUrl + '/statuts');
    }
    postStatut(statut:Statut) {
      //debugger

        return this.httpClient.post(this.baseUrl + '/statut',  statut )
    }
}
