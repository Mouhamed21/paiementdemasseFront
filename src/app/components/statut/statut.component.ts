import { Component, OnInit } from '@angular/core';
import {Statut} from "../../modele/statut";
import {StatutService} from "../../service/statut.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ClasseService} from "../../service/classe.service";


@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.scss'],
  providers: [ClasseService,MessageService,ConfirmationService]
})
export class StatutComponent implements OnInit {
  statut:Statut;
  statuts:any;
submitted: boolean;
statutDialog: boolean;
  constructor(private statutService: StatutService,private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
      this.getSatuts();
  }

    public getSatuts(){
        console.log('On Init ...');
        return this.statutService.getStatuts().subscribe((data) =>
        {

            console.log(JSON.parse(JSON.stringify(data))._embedded.statuts);
            this.statuts = JSON.parse(JSON.stringify(data))._embedded.statuts;
        })
    }
    public postStatut() {
        this.submitted = true;

        if (this.statut.libelle.trim()) {
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
                this.statutService.postStatut(this.statut).subscribe( data =>
                {

                    console.log(this.statut);
                    this.statutDialog = false;

                    this.getSatuts();
                },
                    error => {
                        console.log(error);
                    }
                ),
                    this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Classe', life: 3000});
            //}

            this.statuts = [...this.statuts];
            this.statutDialog = false;
            this.statut = {};
        }
    }
    openNew() {
        this.statut = {};
        this.submitted = false;
        this.statutDialog = true;
    }
    hideDialog() {
        this.statutDialog = false;
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
        return this.statuts ? this.first === (this.statuts.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.statuts ? this.first === 0 : true;
    }

}
