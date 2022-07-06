import { Injectable } from '@angular/core';
import {Evenement} from "../../modele/evenement";
import {Paiement} from "../../modele/paiement";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RapportPaiementService {

    baseUrl = environment.urlApi ;

  constructor(private httpClient: HttpClient) { }

    recherchePaiements(date1: string, date2: string, variable3: any) {
        return this.httpClient.get(this.baseUrl + '/paiement/'+date1+'/'+date2+'/bureau/'+variable3 )
    }

    getBureau(idBureau: number) {
        return this.httpClient.get(this.baseUrl + '/bureau/'+idBureau )
    }

    getCaisse(idCaisse: number) {
        return this.httpClient.get(this.baseUrl + '/bureau/'+idCaisse )
    }

}