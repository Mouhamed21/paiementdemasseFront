import { Component, OnInit } from '@angular/core';
import {ClasseService} from "../../service/classe.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ChargefichierService} from "../../service/chargefichier/chargefichier.service";
import {Router} from "@angular/router";
import {Fichier} from "../../modele/fichier";
import {Subject} from "rxjs";

@Component({
  selector: 'app-chargemet-fichier',
  templateUrl: './chargemet-fichier.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  styleUrls: ['./chargemet-fichier.component.scss'],
    providers: [ClasseService,MessageService,ConfirmationService,ChargefichierService]
})
export class ChargemetFichierComponent implements OnInit {

    fichiers: any;

    fichier: Fichier
    submitted: boolean;
    classeDialog: boolean;
    detailDialog: boolean;
    selectedClasses: any;
    editClasseDialog: boolean;
    isLoading:boolean;
    classeSubject = new Subject<void>();
    first = 0;
    rows = 10;

  constructor(private chargefichierService: ChargefichierService, private router: Router,
              private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllFichier();
  }

    public getAllFichier(){
        return this.chargefichierService.getAllFichier().subscribe((data) =>
        {
            console.log(data);
            this.fichiers = data;
            this.isLoading = true;
        })
    }

    openNew() {
        this.fichier = {};
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

    getDetailFichier(fichier: any) {
        this.detailDialog = true;
    }

    hideDetailFichierDialog() {
        this.detailDialog = false;
        this.submitted = false;
        //this.editClasseDialog = false;
    }

    saveFile() {

    }

    deleteSelectedFichier() {

    }
}
