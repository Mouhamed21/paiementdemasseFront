import { Component, OnInit } from '@angular/core';
import {RapportPaiementService} from "../../service/rapportPaiement/rapport-paiement.service";
import {Paiement} from "../../modele/paiement";
import {DatePipe} from "@angular/common";
import {UserServiceService} from "../../service/userService/user-service.service";
import {KeycloakService} from "keycloak-angular";

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
    bureau: string;
    nameBureau: string;
    nameCaisse:string;
    caisse: Object;
    users:any;
    email:any;
    user:any;
    montantTotal:number=0;
    agentPayeur:any;
    resultRecherchesAnnulesBureaus:any;
    resultRecherchesAnnuleBureau:Paiement;

  constructor(private rapportPaiementService: RapportPaiementService, private userService: UserServiceService, public keycloak: KeycloakService,
              public datepipe: DatePipe) {
      this.keycloak.loadUserProfile().then( res =>
      {
          console.log(res);
          this.users = res;
          this.email= res.email;
          console.log(res.email);
          this.getUser(res.email);
      });
  }

  ngOnInit(): void {
      //this.getUser(this.email)
  }

    public getUser(email){
        console.log(email);
        return this.userService.getUserByEmail(email).subscribe(data =>
        {
            console.log(data);
            this.user = data;
            console.log(this.user);
        })
    }


    rechercheByBureau(date1: string, date2: string) {
        this.rapportPaiementService.recherchePaiementsByBureau(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
                                                        this.datepipe.transform(this.date2, 'yyyy-MM-dd'),
            this.user.dg_structure.id).subscribe(response => {
                this.resultRecherches = response;
                //this.getBureauById(JSON.parse(JSON.stringify(response)).idBureau)
                //this.getCaisseById(JSON.parse(JSON.stringify(response)).idCaisse)

            for (let i=0; i<this.resultRecherches.length; i++){
                this.rapportPaiementService.getCaisse(this.resultRecherches[i].idCaisse).subscribe(res=>{
                    this.resultRecherches[i].idCaisse = res
                    //console.log(this.resultRecherches[i].idCaisse)
                })

                this.montantTotal += this.resultRecherches[i].detailBeneficiaire.montant

                this.rapportPaiementService.getAgentPayeurById(this.resultRecherches[i].idUser).subscribe(res=>{
                    this.resultRecherches[i].idUser = res
                    //console.log(this.resultRecherches[i].idCaisse)
                })
            }
            }, err => {
                console.log(err);
            });
        console.log(this.resultRecherches);

        this.rapportPaiementService.recherchePaiementsAnnuleParBureau(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
            this.datepipe.transform(this.date2, 'yyyy-MM-dd'),
            this.user.dg_structure.id).subscribe(res => {
            this.resultRecherchesAnnulesBureaus = res;
            console.log(this.resultRecherchesAnnulesBureaus);
            console.log(JSON.parse(JSON.stringify(res)));
            //console.log(this.resultRecherches.detailBeneficiaire.montant);

            for (let i=0; i<this.resultRecherchesAnnulesBureaus.length; i++){
                this.rapportPaiementService.getCaisse(this.resultRecherchesAnnulesBureaus[i].idCaisse).subscribe(res=>{
                    this.resultRecherchesAnnulesBureaus[i].idCaisse = res
                    //console.log(this.resultRecherches[i].idCaisse)
                })

               // this.montantTotal += this.resultRecherchesAnnulesBureaus[i].detailBeneficiaire.montant

                this.rapportPaiementService.getAgentPayeurById(this.resultRecherchesAnnulesBureaus[i].idUser).subscribe(res=>{
                    this.resultRecherchesAnnulesBureaus[i].idUser = res
                    //console.log(this.resultRecherches[i].idCaisse)
                })
            }
            //console.log(this.montantGlobal)
            //this.nom
           // console.log(this.nom)
            //this.nameBureau = this.bureau.libelle
            console.log(this.resultRecherchesAnnulesBureaus)
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

    getCaisseById(idCaisse: number) {
        this.rapportPaiementService.getCaisse(idCaisse).subscribe(response => {
            //this.bureau = JSON.parse(JSON.stringify(response)) ;
            this.nameCaisse=JSON.parse(JSON.stringify(response)).libelle;
            console.log(this.nameCaisse);
        }, err => {
            console.log(err);
        });
    }

    getAgentPayeurById(idAgentPayeur: number) {
        this.rapportPaiementService.getAgentPayeurById(idAgentPayeur).subscribe(response => {
            this.agentPayeur=JSON.parse(JSON.stringify(response));
        }, err => {
            console.log(err);
        });
    }

}
