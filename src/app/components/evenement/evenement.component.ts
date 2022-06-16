import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {Evenement} from "../../modele/evenement";
import {EvenementService} from "../../service/evenementService/evenement.service";
import {Classe} from "../../modele/classe";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss'],
  providers: [EvenementService,MessageService,ConfirmationService, DatePipe]

})
export class EvenementComponent implements OnInit {

    evenement:Evenement;
    evenements:any;
    submitted: boolean;
    evenementDialog: boolean;
    evenementEditDialog: boolean;
    constructor(private evenementService: EvenementService,private messageService: MessageService,
                private confirmationService: ConfirmationService,public datepipe: DatePipe) { }

    ngOnInit(): void {
        this.getEvenements();
    }

    updatedate(event) {
        this.evenement.dateCloture = new Date(event);
    }

    public getEvenements(){
        console.log('On Init ...');
        return this.evenementService.getEvenements().subscribe((data) =>
        {
            console.log(data);
            this.evenements = data;
        })
    }
    editEvenement(evenement: Evenement) {
        this.evenement = {...evenement};
        this.evenementEditDialog = true;
    }
    public postEvenement() {
        this.submitted = true;

        if (this.evenement.anneeCampagne.toString().trim() && this.evenement.dateCloture.toString().trim()
        && this.evenement.dateCreation.toString().trim() && this.evenement.moisCampagne.trim() &&
            this.evenement.status.trim()) {
                    if (this.evenement.id) {
                        this.evenementService.updateEvenement(this.evenement.id,this.evenement).subscribe(
                            data => {
                                console.log(data);
                                this.evenementDialog = false;
                                this.evenement = {};
                                this.getEvenements();
                            },
                            error => {
                                console.log(error);
                            }
                        );
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Evenement', life: 3000});
                    }
             else {
            //debugger
            this.evenementService.postEvenement(this.evenement).subscribe( data =>
                {
                    console.log(this.evenement);
                    this.evenementDialog = false;
                    this.getEvenements();
                },
                error => {
                    console.log(error);
                }
            ),
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Evenements', life: 3000});
            }

            this.evenements = [...this.evenements];
            this.evenementDialog = false;
            this.evenementEditDialog = false;
            this.evenement = {};
        }
    }
    openNew() {
        this.evenement = {};
        this.submitted = false;
        this.evenementDialog = true;
    }
    hideDialog() {
        this.evenementDialog = false;
        this.submitted = false;
        this.evenementEditDialog = false;
        //this.editClasseDialog = false;
    }
    first = 0;

    rows = 10;
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
        return this.evenements ? this.first === (this.evenements.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.evenements ? this.first === 0 : true;
    }

}
