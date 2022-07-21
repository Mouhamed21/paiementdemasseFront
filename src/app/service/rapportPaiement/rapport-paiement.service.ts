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
        return this.httpClient.get(this.baseUrl + '/paiement/'+date1+'/'+date2+'/user/'+variable3 +'/'+ variable4)
    }

    nombrePaiementsParGuichetier(date1: string, date2: string, variable3: any, variable4:any) {
        return this.httpClient.get(this.baseUrl + '/nbrpaiement/'+date1+'/'+date2+'/user/'+variable3 +'/'+ variable4)
    }

    nombrePaiementsAnnuleParGuichetier(date1: string, date2: string, variable3: any, variable4:any) {
        return this.httpClient.get(this.baseUrl + '/nbrpaiement/'+date1+'/'+date2+'/annule/'+variable3 +'/'+ variable4)
    }

    nombrePaiementsByBureau(date1: string, date2: string, variable3: any) {
        return this.httpClient.get(this.baseUrl + '/nbrpaiement/'+date1+'/'+date2+'/bureau/'+variable3)
    }

    nombrePaiementsAnnuleByBureau(date1: string, date2: string, variable3: any) {
        return this.httpClient.get(this.baseUrl + '/nbrpaiement/'+date1+'/'+date2+'/annule/'+variable3)
    }


    recherchePaiementsAnnuleParGuichetier(date1: string, date2: string, variable3: any, variable4:any) {
        return this.httpClient.get(this.baseUrl + '/paiement/'+date1+'/'+date2+'/annule/'+variable3 +'/'+ variable4)
    }

    recherchePaiementsAnnuleParBureau(date1: string, date2: string, variable3: any) {
        return this.httpClient.get(this.baseUrl + '/paiement/'+date1+'/'+date2+'/annule/'+variable3)
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
