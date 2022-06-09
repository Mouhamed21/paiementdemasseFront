import { Component, OnInit } from '@angular/core';
import {Statut} from "../../modele/statut";
import {StatutService} from "../../service/statut.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Typeoperation} from "../../modele/typeoperation";
import {TypeoperationService} from "../../service/typeoperation.service";
import {ClasseService} from "../../service/classe.service";

@Component({
  selector: 'app-typeoperation',
  templateUrl: './typeoperation.component.html',
  styleUrls: ['./typeoperation.component.scss'],
  providers: [ClasseService,MessageService,ConfirmationService]

})
export class TypeoperationComponent implements OnInit {

    typeoperation:Typeoperation;
    typeOperations:any;
    submitted: boolean;
    typeoperationDialog: boolean;
    constructor(private typeoperationService: TypeoperationService,private messageService: MessageService,
                private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getTypeOperations();
    }

    public getTypeOperations(){
        console.log('On Init ...');
        return this.typeoperationService.getTypeOperations().subscribe((data) =>
        {
            console.log(JSON.parse(JSON.stringify(data))._embedded.typeOperations);
            this.typeOperations = JSON.parse(JSON.stringify(data))._embedded.typeOperations;
        })
    }
    public postTypeOperation() {
        this.submitted = true;

        if (this.typeoperation.libelle.trim()) {
            /*        if (this.statut.id) {
                        this.statutService.updateStatut(this.statut.id,this.statut).subscribe(
                            data => {
                                console.log(data);
                                this.editClasseDialog = false;
                                this.classe = {};
                                this.getClasses();
                            },
                            error => {
                                console.log(error);
                            }
                        );
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Classe', life: 3000});*!/
                    }*/
            // else {
            //debugger
            this.typeoperationService.postTypeOperation(this.typeoperation).subscribe( data =>
                {

                    console.log(this.typeoperation);
                    this.typeoperationDialog = false;

                    this.getTypeOperations();
                },
                error => {
                    console.log(error);
                }
            ),
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Classe', life: 3000});
            //}

            this.typeOperations = [...this.typeOperations];
            this.typeoperationDialog = false;
            this.typeoperation = {};
        }
    }
    openNew() {
        this.typeoperation = {};
        this.submitted = false;
        this.typeoperationDialog = true;
    }
    hideDialog() {
        this.typeoperationDialog = false;
        this.submitted = false;
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
        return this.typeOperations ? this.first === (this.typeOperations.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.typeOperations ? this.first === 0 : true;
    }

}
