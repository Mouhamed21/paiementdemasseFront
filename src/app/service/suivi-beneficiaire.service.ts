import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuiviBeneficiaireService {

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


    getSuiviBeneficiaire() {
        return this.httpClient.get(this.baseUrl + '/allTypeOperation');
    }

    postSuiviBeneficiaire(suiviBeneficiaire) {
        return this.httpClient.post(this.baseUrl + '/suiviBeneficiaire', suiviBeneficiaire)
    }

}
