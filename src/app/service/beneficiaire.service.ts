import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BeneficiaireService {

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

    getBeneficiaireById(id) {
        return this.httpClient.get(this.baseUrl + '/beneficiaire/'+id);
    }

    getBeneficiaireByNumPension(numPension):Observable<any> {
        return this.httpClient.get(this.baseUrl + '/beneficiaire/find/'+numPension);
    }

    updateBeneficiaire(id){
        return this.httpClient.get(this.baseUrl + '/edit/beneficiaire/'+id);
    }





}
