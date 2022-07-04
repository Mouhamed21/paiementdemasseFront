import { Injectable } from '@angular/core';
import {Beneficiaire} from "../modele/beneficiaire";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DetailBeneficiaire} from "../modele/detail-beneficiaire";

@Injectable({
  providedIn: 'root'
})
export class DetailBeneficiaireService {

    baseUrl = environment.urlApi;

  constructor(private httpClient: HttpClient) { }

    saveDetailBeneficiaire(detailBeneficiaire:DetailBeneficiaire[]){
        return this.httpClient.post(this.baseUrl + '/detailbeneficiaire/save', detailBeneficiaire);
    }

    updateDetailBeneficiaire(detailBeneficiaire){

        return this.httpClient.put(this.baseUrl+ '/detailbeneficiare/update/'+detailBeneficiaire.id,detailBeneficiaire)
    }
}
