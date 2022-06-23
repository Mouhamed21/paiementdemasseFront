import { Component, OnInit } from '@angular/core';
import { Beneficiaire } from 'src/app/modele/beneficiaire';
import { BeneficiaireService } from 'src/app/service/beneficiaire.service';
import { Pipe,PipeTransform } from '@angular/core'
import { DatePipe } from '@angular/common';
import {DetailBeneficiaire} from "../../modele/detail-beneficiaire";
import { PaiementService } from 'src/app/service/paiement.service';
import { KeycloakService } from 'keycloak-angular';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { Paiement } from 'src/app/modele/paiement';
import { StatutService } from 'src/app/service/statut.service';


@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.component.html',
    styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

    numPensionArechercher
    beneficiaireByNumPension:Beneficiaire = new Beneficiaire()
    displayDialog: boolean
    displayResults:boolean = true
    // evenementChoisi:DetailBeneficiaire = new DetailBeneficiaire()
    detailBeneficiaireChoisi:DetailBeneficiaire = new DetailBeneficiaire()
    paiement:Paiement=new Paiement()

    //concernant l'utilisateur connecté
    user
    email
    existenceCaisse:boolean = true

    //concernant les statuts
    listeDesStatuts
    statutSelected

    //concenant les pieces
    typePieceSelected
    typesDePieces = ["CNI","PASSPORT"]





    activeIndex1: number = 0;
    activeIndex2: number = 0;

    constructor(private beneficiaireService:BeneficiaireService,private paiementService:PaiementService,
                private keycloakService:KeycloakService,private  userService:UserServiceService,
                private statutService:StatutService) {
        this.keycloakService.loadUserProfile().then( res =>
        {
            console.log(res);
            this.user = res;
            this.email= res.email;
            console.log(res.email);
            this.getUserByEmail(res.email);

        });    }

    ngOnInit(): void {
        this.getAllStatus()
        // this.getBeneficiaireByNumPension(23658974)
        console.log(23658974)
    }

    getBeneficiaireByNumPension(numPension):any{
        this.beneficiaireService.getBeneficiaireByNumPension(numPension).subscribe(res=>{
            this.beneficiaireByNumPension = res
            console.log(this.beneficiaireByNumPension)
            this.beneficiaireByNumPension.typePiece = "cni"
            console.log(this.beneficiaireByNumPension.detailBeneficiaires)
        })
    }

    choix(choixEvenement:any){
        this.detailBeneficiaireChoisi = choixEvenement
        console.log(this.detailBeneficiaireChoisi)
    }

    updateBeneficiaire(){
        // this.beneficiaireByNumPension.typePiece = this.typePieceSelected
        console.log(this.beneficiaireByNumPension)
        // this.beneficiaireService.updateBeneficiaire(this.beneficiaireByNumPension.id,this.beneficiaireByNumPension).subscribe(res=>{
        //     console.log(res)
        // })
    }

    verificationPaiement(){
        if (!this.user.dg_caisse){
            this.existenceCaisse = false
        }

        //A METTRE TOUTES LES VERIFICATIONS POUR LE PAIEMENT

    }

    savePaiement(){
        this.paiement.beneficiaire.id = this.beneficiaireByNumPension.id
        this.paiement.evenement = this.detailBeneficiaireChoisi.fichier.evenement
        this.paiement.idBureau = this.user.dg_structure.id
        this.paiement.idCaisse = this.user.dg_caisse.id
        this.paiement.idUser = this.user.id
        this.detailBeneficiaireChoisi.paye = true
        // this.detailBeneficiaireChoisi.statut = this.statutSelected
        // this.detailBeneficiaireChoisi.statut = this.listeDesStatuts.filter(s=>s.libelle =0)


        console.log("OKKKK")

        console.log(this.paiement)
        //     this.paiementService.savePaiement(this.paiement).subscribe(res=>{
        //     console.log(res)
        // })
    }

     getUserByEmail(email){
        return this.userService.getUserByEmail(email).subscribe(data =>
        {
            this.user = data;
        })
    }

    getAllStatus(){
        this.statutService.getStatuts().subscribe(res=>{
            this.listeDesStatuts = res
            console.log(this.listeDesStatuts)
        })
    }



}
