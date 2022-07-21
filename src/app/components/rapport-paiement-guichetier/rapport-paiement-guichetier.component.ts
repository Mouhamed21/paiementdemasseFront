import { Component, OnInit } from '@angular/core';
import {Paiement} from "../../modele/paiement";
import {RapportPaiementService} from "../../service/rapportPaiement/rapport-paiement.service";
import {UserServiceService} from "../../service/userService/user-service.service";
import {KeycloakService} from "keycloak-angular";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rapport-paiement-guichetier',
  templateUrl: './rapport-paiement-guichetier.component.html',
  styleUrls: ['./rapport-paiement-guichetier.component.scss']
})
export class RapportPaiementGuichetierComponent implements OnInit {

    valRadio: string;
    variable3: any;
    variable4: any;

    date2: string;
    date1: string;
    resultRecherches: any;
    nombrePaiementsReussi:any;
    nombrePaiementsAnnule:any;
    resultRecherche: Paiement;
    resultRecherchesAnnules:any;
    resultRecherchesAnnule:Paiement;
    bureau: Object;
    nameBureau: string;
    nameCaisse:string;
    caisse: Object;
    users:any;
    email:any;
    user:any;
    prenom:string;
    nom:string;
    libelleCaisse:string;
    caisseIdentifiant:any;
    montantGlobal:number=0;

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
    recherchePaiementsGuichetier(date1: string, date2: string) {
        console.log(this.user.id);
        this.variable3 = this.user.id;
        this.variable4 = this.user.dg_structure.id;
        this.prenom = this.user.prenom;
        this.nom = this.user.nom;
        console.log(this.user.prenom)

        this.rapportPaiementService.nombrePaiementsParGuichetier(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
            this.datepipe.transform(this.date2, 'yyyy-MM-dd'),
            this.variable3,this.variable4).subscribe(data => {
            this.nombrePaiementsReussi = data;
            console.log(this.nombrePaiementsReussi);
        });

        this.rapportPaiementService.nombrePaiementsAnnuleParGuichetier(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
            this.datepipe.transform(this.date2, 'yyyy-MM-dd'),
            this.variable3,this.variable4).subscribe(data => {
            this.nombrePaiementsAnnule = data;
            console.log(this.nombrePaiementsAnnule);
        });

        //debugger
        this.rapportPaiementService.recherchePaiementsParGuichetier(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
            this.datepipe.transform(this.date2, 'yyyy-MM-dd'),
            this.variable3,this.variable4).subscribe(response => {
            this.resultRecherches = response;
            console.log(response);
            console.log(JSON.parse(JSON.stringify(response)));
            //console.log(this.resultRecherches.detailBeneficiaire.montant);

            for (let i=0; i<this.resultRecherches.length; i++){
             //this.resultRecherches[i].addAttribute(libelleCaisse) =
                //console.log(this.getCaisseById(this.resultRecherches[i].idCaisse));
                console.log(this.resultRecherches[i].detailBeneficiaire.montant);
                this.montantGlobal += this.resultRecherches[i].detailBeneficiaire.montant;
                this.rapportPaiementService.getCaisse(this.resultRecherches[i].idCaisse).subscribe(res=>{
                    this.resultRecherches[i].idCaisse = res
                    console.log(this.resultRecherches[i].idCaisse)
                })
/*                this.rapportPaiementService.getBureau(this.resultRecherches[i].idBureau).subscribe(res=>{
                    this.resultRecherches[i].idBureau = res
                    console.log(this.resultRecherches[i].idBureau)
                })*/



            }
            console.log(this.montantGlobal)
            //this.nom
            console.log(this.nom)
            //this.nameBureau = this.bureau.libelle
            console.log(this.resultRecherches)
        }, err => {
            console.log(err);
        });

        this.rapportPaiementService.recherchePaiementsAnnuleParGuichetier(this.datepipe.transform(this.date1, 'yyyy-MM-dd'),
            this.datepipe.transform(this.date2, 'yyyy-MM-dd'),
            this.variable3,this.variable4).subscribe(res => {
            this.resultRecherchesAnnules = res;
            console.log(res);
            console.log(JSON.parse(JSON.stringify(res)));
            //console.log(this.resultRecherches.detailBeneficiaire.montant);

            for (let i=0; i<this.resultRecherchesAnnules.length; i++){
                //this.resultRecherches[i].addAttribute(libelleCaisse) =
                //console.log(this.getCaisseById(this.resultRecherches[i].idCaisse));
                //console.log(this.resultRecherches[i].detailBeneficiaire.montant);
                //this.montantGlobal += this.resultRecherches[i].detailBeneficiaire.montant;
                this.rapportPaiementService.getCaisse(this.resultRecherchesAnnules[i].idCaisse).subscribe(res=>{
                    this.resultRecherchesAnnules[i].idCaisse = res
                    console.log(this.resultRecherchesAnnules[i].idCaisse)
                })
            }
            //console.log(this.montantGlobal)
            //this.nom
            console.log(this.nom)
            //this.nameBureau = this.bureau.libelle
            console.log(this.resultRecherchesAnnules)
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
        //debugger
        console.log(idCaisse)
         this.rapportPaiementService.getCaisse(idCaisse).subscribe(response => {
            //this.bureau = JSON.parse(JSON.stringify(response)) ;
            this.nameCaisse=JSON.parse(JSON.stringify(response)).libelle;
            console.log(this.nameCaisse);
            this.caisseIdentifiant = response;

        }, err => {
            console.log(err);
        });
    }

}
