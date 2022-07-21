import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Paiement } from '../modele/paiement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

    baseUrl = environment.urlApi;

    constructor(private httpClient: HttpClient) { }
    httpOptions =
        {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/JSON',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
        };

    savePaiement(paiement) {
        return this.httpClient.post(this.baseUrl+"/paiement", paiement)
    }

    paiementsByBeneficiaire(numPension):Observable<any>{
        return this.httpClient.get(this.baseUrl+"/paiement/beneficiaire/"+numPension)
    }
}
