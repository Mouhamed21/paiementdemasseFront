import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChargefichierService {

    baseUrl = environment.urlApi;

    constructor(private httpClient: HttpClient, /*private kcSecurityService: KeycloakSecurityService*/) { }

    searchBeneficiaire(numPension: string, moisEcheance: string) {
        return this.httpClient.get<any>(this.baseUrl + '/beneficiaire/nonpaye/' + numPension + '/' + moisEcheance)
            //,{headers: new HttpHeaders({Authorization:'Bearer '+this.kcSecurityService.kc.token})});
    }

    saveBeneficiaire(beneficiaire:any){
        //debugger
        return this.httpClient.post(this.baseUrl+'/fileupload', beneficiaire)
            //,{headers: new HttpHeaders({Authorization:'Bearer '+this.kcSecurityService.kc.token})})
    }

    getAllFichier(){
        return this.httpClient.get(this.baseUrl+'/fichiers')
            //{headers: new HttpHeaders({Authorization:'Bearer '+this.kcSecurityService.kc.token})})
    }
}
