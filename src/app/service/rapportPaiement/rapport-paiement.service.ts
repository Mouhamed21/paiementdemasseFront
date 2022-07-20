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

    recherchePaiementsByBureau(date1: string, date2: string, bureau: any) {
        return this.httpClient.get(this.baseUrl + '/paiement/'+date1+'/'+date2+'/bureau/'+bureau )
    }

    recherchePaiementsParGuichetier(date1: string, date2: string, variable3: any, variable4:any) {
        return this.httpClient.get(this.baseUrl + '/paiement/'+date1+'/'+date2+'/user/'+variable3 +'/'+ variable4 )
    }


    getBureau(idBureau: number) {
        return this.httpClient.get(this.baseUrl + '/bureau/'+idBureau )
    }

    getCaisse(id: number) {
        return this.httpClient.get(this.baseUrl + '/caisse/'+id )
    }

    getAgentPayeurById(id: number) {
        return this.httpClient.get(this.baseUrl + '/user/'+id )
    }

}
