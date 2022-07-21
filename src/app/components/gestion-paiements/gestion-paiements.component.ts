import { Component, OnInit } from '@angular/core';
import { BeneficiaireService } from 'src/app/service/beneficiaire.service';
import { PaiementService } from 'src/app/service/paiement.service';
import { KeycloakService } from 'keycloak-angular';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { Paiement } from 'src/app/modele/paiement';
import { RapportPaiementService } from 'src/app/service/rapportPaiement/rapport-paiement.service';
import { TypeoperationService } from 'src/app/service/typeoperation.service';
import { StatutService } from 'src/app/service/statut.service';
import { SuiviBeneficiaireService } from 'src/app/service/suivi-beneficiaire.service';
import { DetailBeneficiaireService } from 'src/app/service/detail-beneficiaire.service';
import { MessageService } from 'primeng/api';
import { SuiviBeneficiaire } from 'src/app/modele/suivi-beneficiaire';
import { DetailBeneficiaire } from 'src/app/modele/detail-beneficiaire';

@Component({
  selector: 'app-gestion-paiements',
  templateUrl: './gestion-paiements.component.html',
  styleUrls: ['./gestion-paiements.component.scss'],
    providers: [MessageService]

})
export class GestionPaiementsComponent implements OnInit {

    numPension


    paiements:Paiement[]
    displayResults:boolean = false

    paiementDialog=false

    paiementChoisi:Paiement

    motif

    listeDesStatuts

    listeDesOperations

    operationChoisie

    suiviBeneficiaire:SuiviBeneficiaire = new SuiviBeneficiaire()

    user
    email


    detailBeneficiaire:DetailBeneficiaire = new DetailBeneficiaire()



    constructor(private beneficiaireService:BeneficiaireService,private paiementService:PaiementService,
              private keycloakService:KeycloakService,private  userService:UserServiceService,private rapportPaiementService: RapportPaiementService,
                private typeoperationService:TypeoperationService,private statutService:StatutService,
                private suiviBeneficiaireService:SuiviBeneficiaireService,private detailBeneficiaireService:DetailBeneficiaireService,
                private messageService: MessageService, ) {
        this.keycloakService.loadUserProfile().then( res =>
        {
            this.user = res;
            this.email= res.email;
            this.getUserByEmail(res.email);
        });
    }

  ngOnInit(): void {
        this.getAllTypesOperations()
        this.getAllStatus()
      console.log(1611326)
  }

    paiementsByBeneficiaire(numPension){
        this.paiementService.paiementsByBeneficiaire(numPension).subscribe(res=>{
            this.paiements = res

            for (let i=0; i<this.paiements.length; i++){
                this.rapportPaiementService.getCaisse(this.paiements[i].idCaisse).subscribe(res=>{
                    this.paiements[i].idCaisse = res
                })
                this.rapportPaiementService.getAgentPayeurById(this.paiements[i].idUser).subscribe(res=>{
                    this.paiements[i].idUser = res
                })
                this.rapportPaiementService.getBureau(this.paiements[i].idBureau).subscribe(res=>{
                    this.paiements[i].idBureau = res
                })
            }
            console.log(this.paiements)
        })
    }


    editPaiement(paiement){
        this.paiementChoisi = paiement
        console.log(this.paiementChoisi)
        this.paiementDialog = true
    }

    getAllTypesOperations(){
        this.typeoperationService.getTypeOperations().subscribe(res=>{
            this.listeDesOperations = res
        })
    }

    getAllStatus(){
        this.statutService.getStatuts().subscribe(res=>{
            this.listeDesStatuts = res
        })
    }

    postSuiviBeneficiaire(){
        this.suiviBeneficiaire.idUser = this.user.id
        this.suiviBeneficiaire.beneficiaire = this.paiementChoisi.detailBeneficiaire.beneficiaire
        this.suiviBeneficiaire.date = new Date()

        this.detailBeneficiaire = this.paiementChoisi.detailBeneficiaire
        if (this.suiviBeneficiaire.typeOperation.libelle == "ANNULATION")
            this.annulerUnPaiement()
        if (this.suiviBeneficiaire.typeOperation.libelle == "SUSPENSION")
            this.suspendreUnPaiement()

        this.suiviBeneficiaireService.postSuiviBeneficiaire(this.suiviBeneficiaire).subscribe(res=>{
            this.paiementDialog=false
            console.log(res)
        })
    }


    annulerUnPaiement(){
        this.detailBeneficiaire.statut = this.listeDesStatuts.find(s => s.libelle == "ANNULÉ")
        this.updateDetailBeneficiaire(this.detailBeneficiaire)
    }

    suspendreUnPaiement(){
        this.detailBeneficiaire.statut = this.listeDesStatuts.find(s => s.libelle == "SUSPENDU")
        this.updateDetailBeneficiaire(this.detailBeneficiaire)
    }


    updateDetailBeneficiaire(detailBeneficiaire){
        detailBeneficiaire.paye = 0
        this.detailBeneficiaireService.updateDetailBeneficiaire(detailBeneficiaire).subscribe(res=>{
            this.showSuccess()
            console.log(res)
        })
    }

    getUserByEmail(email){
        return this.userService.getUserByEmail(email).subscribe(data => this.user = data)
    }


    showSuccess(){
        this.messageService.add({key: 'tc', severity:'success', summary: 'MODIFICATION EFFECTUÉE AVEC SUCCÈS', detail: ''});
    }



}
