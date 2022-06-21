import { Component, OnInit } from '@angular/core';
import {Fichier} from "../../modele/fichier";
import {Subject} from "rxjs";
import {ChargefichierService} from "../../service/chargefichier/chargefichier.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserServiceService} from "../../service/userService/user-service.service";
import {KeycloakService} from "keycloak-angular";
import {ClasseService} from "../../service/classe.service";

@Component({
  selector: 'app-fichier-certifie',
  templateUrl: './fichier-certifie.component.html',
  styleUrls: ['./fichier-certifie.component.scss'],
  providers: [ClasseService,MessageService,ConfirmationService,ChargefichierService]
})
export class FichierCertifieComponent implements OnInit {

    fichiers: any;

    fichier: Fichier = new Fichier()
    submitted: boolean;
    classeDialog: boolean;
    detailDialog: boolean;
    selectedClasses: any;
    editClasseDialog: boolean;
    isLoading:boolean;
    classeSubject = new Subject<void>();
    first = 0;
    rows = 10;
    id:number;
    user:any;
    valSwitch:boolean;
    constructor(private chargefichierService: ChargefichierService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService,private userService: UserServiceService,
                public keycloak: KeycloakService) {
    }



    ngOnInit(): void {
        this.getAllFichierCertifier();

    }

    public getAllFichierCertifier(){
        return this.chargefichierService.getAllFichierCertifier().subscribe((data) =>
        {
            console.log(data);
            this.fichiers = data;
            this.isLoading = true;
        })
    }

    openNew() {
        // this.fichier = {};
        this.submitted = false;
        this.classeDialog = true;
    }

    hideDialog() {
        this.classeDialog = false;
        this.submitted = false;
        this.editClasseDialog = false;
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
        return this.fichiers ? this.first === (this.fichiers.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.fichier ? this.first === 0 : true;
    }

    getDetailFichier(fichier: Fichier) {
        this.fichier = {...fichier};
        this.detailDialog = true;
        this.id = this.fichier.idUserChargement;
        this.valSwitch = this.fichier.certification;
        this.getUserChargement(this.fichier.idUserChargement);
    }

    public getUserChargement(id:number)
    {
        return this.userService.getUserById(id).subscribe(res =>
        {
            console.log(res);
            this.user  = res;
        })
    }

    hideDetailFichierDialog() {
        this.detailDialog = false;
        this.submitted = false;
        this.getAllFichierCertifier();
        //this.editClasseDialog = false;
    }

    onCertifier(fichier: Fichier) {
        this.chargefichierService.certifie(fichier)
            .subscribe(data => {
                //debugger
                //this.valSwitch = fichier.certification;
                fichier.certification = data.certification;
                console.log(fichier.certification);
                console.log(this.valSwitch)
            })
    }

    saveFile() {

    }

    deleteSelectedFichier() {

    }

}
