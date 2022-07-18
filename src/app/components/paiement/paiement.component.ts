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
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import html2PDF from 'jspdf-html2canvas';

//pour effectur le paiement il faut que
//  l'evenement soit en cours
//  le fichier soit certifié et non expiré
//  le user possede une caisse

@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.component.html',
    styleUrls: ['./paiement.component.scss'],
    providers: [MessageService]
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


    //pagination
    activeIndex1: number = 0;
    activeIndex2: number = 0;


    //date d'aujourd'hui
    today = new Date()

    //impression
    displayImpressionDialog=false




    constructor(private beneficiaireService:BeneficiaireService,private paiementService:PaiementService,
                private keycloakService:KeycloakService,private  userService:UserServiceService,
                private statutService:StatutService,private detailBeneficiaireService:DetailBeneficiaireService,
                private messageService: MessageService) {
        this.keycloakService.loadUserProfile().then( res =>
        {
            this.user = res;
            this.email= res.email;
            this.getUserByEmail(res.email);

        });    }

    ngOnInit(): void {
        this.getAllStatus()
        console.log(1611326)
    }

    getBeneficiaireByNumPension(numPension):any{
        this.beneficiaireService.getBeneficiaireByNumPension(numPension).subscribe(res=>{
            this.beneficiaireByNumPension = res
            console.log(this.beneficiaireByNumPension)
        })
    }

    updateBeneficiaire(){
        console.log(this.beneficiaireByNumPension)
        this.beneficiaireService.updateBeneficiaire(this.beneficiaireByNumPension.numPension,this.beneficiaireByNumPension).subscribe(res=>{
            console.log(res)
        })
    }

    choix(detail:any){
        this.detailBeneficiaireChoisi = detail

        this.detailBeneficiaireChoisi["beneficiaire"] = new Beneficiaire()
        this.detailBeneficiaireChoisi.beneficiaire.numPension = this.beneficiaireByNumPension.numPension
    }


    verificationPaiement(){
        console.log(this.detailBeneficiaireChoisi)
        if (!this.user.dg_caisse){
            this.existenceCaisse = false
            this.existenceCaisse = true
        }else{
        this.paiement.beneficiaire.numPension = this.beneficiaireByNumPension.numPension
        this.paiement.evenement = this.detailBeneficiaireChoisi.fichier.evenement
        this.paiement.idBureau = this.user.dg_structure.id
        this.paiement.idCaisse = this.user.dg_caisse.id
        this.paiement.idUser = this.user.id


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
            // console.log(this.listeDesStatuts)
        })
    }

    showSuccess(){
        this.messageService.add({key: 'tc', severity:'success', summary: 'PAIEMENT EFFECTUÉ AVEC SUCCÈS', detail: 'Génération du recu en cours'});
    }


    exportPdf() {
     
        var data = document.getElementById('impression');
        html2canvas(data).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg')

            const pdf = new jsPDF({
                orientation:"portrait"
            })
            const imageProps = pdf.getImageProperties(imgData)

            const pdfw = pdf.internal.pageSize.getWidth()

            const pdfh = (imageProps.height * pdfw) / imageProps.width

            pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh)

            pdf.save('MYPdf.pdf')
        })
        
        this.showSuccess()





}





}
