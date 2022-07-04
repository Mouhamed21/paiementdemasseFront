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
import { DetailBeneficiaireService } from 'src/app/service/detail-beneficiaire.service';


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
                private statutService:StatutService,private detailBeneficiaireService:DetailBeneficiaireService) {
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
            this.beneficiaireByNumPension.typePiece = "cni"
            console.log(this.beneficiaireByNumPension.detailBeneficiaires)
        })
    }

    updateBeneficiaire(){
        console.log(this.beneficiaireByNumPension)
        // this.beneficiaireService.updateBeneficiaire(this.beneficiaireByNumPension.id).subscribe(res=>{
        //     console.log(res)
        // })
    }

    choix(detail:any){
        console.log( this.detailBeneficiaireChoisi)
        this.detailBeneficiaireChoisi = detail
        console.log(this.beneficiaireByNumPension.id)
        console.log(this.detailBeneficiaireChoisi)

        this.detailBeneficiaireChoisi["beneficiaire"] = new Beneficiaire()
        this.detailBeneficiaireChoisi.beneficiaire.id = this.beneficiaireByNumPension.id
        console.log(this.detailBeneficiaireChoisi)
    }


    verificationPaiement(){
        console.log(this.detailBeneficiaireChoisi)
        if (!this.user.dg_caisse){
            this.existenceCaisse = false
            this.existenceCaisse = true
        }else{
        this.paiement.beneficiaire.id = this.beneficiaireByNumPension.id
        this.paiement.evenement = this.detailBeneficiaireChoisi.fichier.evenement
        this.paiement.idBureau = 1//this.user.dg_structure.id
        this.paiement.idCaisse = 1//this.user.dg_caisse.id
        this.paiement.idUser = 9//this.user.id

        console.log(this.detailBeneficiaireChoisi.statut)

    }
    }

    savePaiement(){
        console.log(this.paiement)
            this.paiementService.savePaiement(this.paiement).subscribe(res=>{
                    console.log(res)
                })
        this.updateDetailBeneficiaire(this.detailBeneficiaireChoisi)
    }

    updateDetailBeneficiaire(detailBeneficiaire){

        detailBeneficiaire.statut = this.listeDesStatuts.find(s => s.libelle == "PAYÉ")
        detailBeneficiaire.paye = true
        console.log(detailBeneficiaire)
        this.detailBeneficiaireService.updateDetailBeneficiaire(detailBeneficiaire).subscribe(res=>{
            console.log(res)
        })
    }

     getUserByEmail(email){
        return this.userService.getUserByEmail(email).subscribe(data => this.user = data)
    }

    getAllStatus(){
        this.statutService.getStatuts().subscribe(res=>{
            this.listeDesStatuts = res
            console.log(this.listeDesStatuts)
        })

    }



}
