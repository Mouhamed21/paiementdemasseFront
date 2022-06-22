import { Component, OnInit } from '@angular/core';
import {ChargefichierService} from "../../service/chargefichier/chargefichier.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserServiceService} from "../../service/userService/user-service.service";
import {KeycloakService} from "keycloak-angular";
import {EvenementService} from "../../service/evenementService/evenement.service";
import {StatutService} from "../../service/statut.service";
import {FormBuilder} from "@angular/forms";
import {BeneficiaireService} from "../../service/BeneFiciaire/beneficiaireService";
import {ClasseService} from "../../service/classe.service";
import {Beneficiaire} from "../../modele/beneficiaire";
import {Fichier} from "../../modele/fichier";

@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrls: ['./beneficiaire.component.scss'],
  providers: [ClasseService,MessageService,ConfirmationService,BeneficiaireService]
})
export class BeneficiaireComponent implements OnInit {
    beneficiaires: any;
    beneficiaire: Beneficiaire;
    first = 0;
    rows = 10;

    detailDialog: boolean;

    constructor(private beneficiaireService: BeneficiaireService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService,private userService: UserServiceService,
                public keycloak: KeycloakService, private evenementService: EvenementService,
                private statutService: StatutService, private formBuilder: FormBuilder) {
    }

  ngOnInit(): void {
        this.getAllBeneficiaire();
  }
    public getAllBeneficiaire(){
        return this.beneficiaireService.getAllBeneficiaire().subscribe((data) =>
        {
            console.log(data);
            this.beneficiaires = data;
        })
    }
    hideDetailFichierDialog() {
        this.detailDialog = false;
        //this.editClasseDialog = false;
    }
    getDetailBeneficiaire(beneficiaire: Beneficiaire) {
        this.beneficiaire = {...beneficiaire};
        this.detailDialog = true;
        this.getAllBeneficiaire();
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.beneficiaires ? this.first === (this.beneficiaires.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.beneficiaire ? this.first === 0 : true;
    }

}
