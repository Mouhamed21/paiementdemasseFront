import { Component, OnInit } from '@angular/core';
import {RapportPaiementService} from "../../service/rapportPaiement/rapport-paiement.service";
import {Paiement} from "../../modele/paiement";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rapport-paiement',
  templateUrl: './rapport-paiement.component.html',
  styleUrls: ['./rapport-paiement.component.scss']
})
export class RapportPaiementComponent implements OnInit {

    valRadio: string;
    variable3: any;
    date2: string;
    date1: string;
    resultRecherches: any;
    resultRecherche: Paiement;
    bureau: Object;
    nameBureau: string;
    caisse: Object;

  constructor(private rapportPaiementService: RapportPaiementService,
              public datepipe: DatePipe) { }

  ngOnInit(): void {
  }


    recherche(date1: string, date2: string, variable3: string) {
        this.rapportPaiementService.recherchePaiements(this.datepipe.transform(this.date1, 'dd-MM-yyyy'),
                                                        this.datepipe.transform(this.date2, 'dd-MM-yyyy'),
                                                        variable3).subscribe(response => {
                this.resultRecherches = response;
                this.getBureauById(JSON.parse(JSON.stringify(response[0])).idBureau)
                //this.nameBureau = this.bureau.libelle
                console.log(this.resultRecherches)
            }, err => {
                console.log(err);
            });
    }


    getBureauById(idBureau: number) {
      this.rapportPaiementService.getBureau(idBureau).subscribe(response => {
            //this.bureau = JSON.parse(JSON.stringify(response)) ;
            this.nameBureau=JSON.parse(JSON.stringify(response)).libelle;
            console.log(this.nameBureau);
        }, err => {
            console.log(err);
        });
    }

}
