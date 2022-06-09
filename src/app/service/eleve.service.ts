import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Classe} from "../modele/classe";
import {Eleve} from "../modele/eleve";

@Injectable({
  providedIn: 'root'
})
export class EleveService {
    baseUrl = environment.urlApi + '/eleve';
    baseUrl1 = environment.urlApi + '/eleve/classe';
    baseUrl2 = environment.urlApi + '/eleve/effectifClasse';
    baseUrl3 = environment.urlApi + '/eleve/effectifEcole';
  constructor(private httpClient: HttpClient) { }

    getEleves() {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getElevesByClasse(id:number){
        return this.httpClient.get(`${this.baseUrl1}/${id}`);
    }
    getEffectifClasse(id:number){
        return this.httpClient.get(`${this.baseUrl2}/${id}`);
    }

    getEffectifEcole(){
        return this.httpClient.get(`${this.baseUrl3}`);
    }

    postEleve(eleve: Eleve) {
        return this.httpClient.post(`${this.baseUrl}`, eleve)
    }

    updateEleve(id: number, eleve: Eleve) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, eleve)
    }

    deleteEleve(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllEleves(eleveSelectionne: any) {
        //return this.httpClient.delete(`${this.urlApi}`, classeSelectionne)
        return this.httpClient.patch(`${this.baseUrl}`, eleveSelectionne)
    }
}
