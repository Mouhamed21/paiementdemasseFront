import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Classe} from "../modele/classe";
import {environment} from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ClasseService {

    baseUrl = environment.urlApi + '/classe';
    constructor(private httpClient: HttpClient) {
    }

    getClasses() {
        return this.httpClient.get(`${this.baseUrl}`);
    }
    getClasseById(id:number) {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    postClasse(classe: Classe) {
        return this.httpClient.post(`${this.baseUrl}`, classe)
    }

    updateClasse(id: number, classe: Classe) {
        return this.httpClient.put(`${this.baseUrl}/${id}`, classe)
    }

    deleteClasse(id: number) {
        return this.httpClient.delete(`${this.baseUrl}/${id}`)
    }

    deleteAllClasse(classeSelectionne: any) {
        //return this.httpClient.delete(`${this.urlApi}`, classeSelectionne)
        return this.httpClient.patch(`${this.baseUrl}`, classeSelectionne)
    }
}
