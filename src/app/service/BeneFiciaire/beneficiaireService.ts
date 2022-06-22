import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Fichier } from 'src/app/modele/fichier';
import { Observable } from 'rxjs';
import {Beneficiaire} from "../../modele/beneficiaire";

@Injectable({
    providedIn: 'root'
})
export class BeneficiaireService {

    baseUrl = environment.urlApi;

    constructor(private httpClient: HttpClient, /*private kcSecurityService: KeycloakSecurityService*/) { }


    getAllBeneficiaire(){
        return this.httpClient.get(this.baseUrl+'/beneficiaire')
        //{headers: new HttpHeaders({Authorization:'Bearer '+this.kcSecurityService.kc.token})})
    }

}
