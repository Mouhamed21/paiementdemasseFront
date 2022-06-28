import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Beneficiaire } from '../modele/beneficiaire';

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

    getAllBeneficiaire(){
        return this.httpClient.get(this.baseUrl+'/beneficiaire');
        //{headers: new HttpHeaders({Authorization:'Bearer '+this.kcSecurityService.kc.token})})
    }

    getBeneficiaireByNumPension(numPension):Observable<any> {
        return this.httpClient.get(this.baseUrl + '/beneficiaire/find/'+numPension);
    }

    updateBeneficiaire(id, beneficiaire: Beneficiaire){
        return this.httpClient.put(this.baseUrl + '/edit/beneficiaire/'+id, beneficiaire);
    }

    saveBeneficiaire(beneficiaire: Beneficiaire){
        return this.httpClient.post(this.baseUrl + '/beneficiaire/save', beneficiaire);
    }






}
