import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

import {Subject} from "rxjs";
import {ConfirmationService, MenuItem} from 'primeng/api';
import { MessageService } from 'primeng/api';
import {ClasseService} from "../../service/classe.service";
import {Classe} from "../../modele/classe";
import {EleveService} from "../../service/eleve.service";
import {Eleve} from "../../modele/eleve";


@Component({
    selector: 'app-classe',
    templateUrl: './classe.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    styleUrls: ['./classe.component.scss'],
    providers: [ClasseService,MessageService,ConfirmationService,EleveService]
})
export class ClasseComponent implements OnInit {
    eleves: any;
    classes: any;
    classe: Classe;
    clas:any;

    elev:any;
    eleve: Eleve;
    submitted: boolean;
    classeDialog: boolean;
    selectedClasses: any;
    editClasseDialog: boolean;
    eleveDialog:boolean;
    isLoading:boolean;
    classeSubject = new Subject<void>();
    breadcrumbItems: MenuItem[];
    constructor(private classeService: ClasseService, private eleveService: EleveService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getClasses();

        this.eleveService.getEleves().subscribe(data => this.eleves = data);
/*        this.breadcrumbItems = [];
        this.breadcrumbItems.push({ label: 'Classes' });
        this.breadcrumbItems.push({ label: 'Eleve' });*/

    }

    public getClasses(){
        console.log('On Init ...');
        return this.classeService.getClasses().subscribe((data) =>
        {
            console.log(data);
            this.classes = data;
            this.isLoading = true;
        })
    }
    public getOneClasse(classe: Classe){
        return this.router.navigate(['/uikit/classe', classe.id]);
    }


    first = 0;

    rows = 10;


    openNew() {
        this.classe = {};
        this.submitted = false;
        this.classeDialog = true;
    }
    openEdit(cl:Classe) {
        console.log('dddd');
        this.clas=cl;
        console.log(this.clas);
        //this.classe = {};
        this.submitted = false;
        this.editClasseDialog = true;
    }
    // openEleve(cl:Classe) {
    //     console.log('eee');
    //     this.clas=cl;
    //     console.log(this.clas);
    //     this.submitted = false;
    //     this.eleveDialog = true;
    // }

    editClasse(classe: Classe) {
        this.classe = {...classe};
        this.classeDialog = true;
    }
    public postClasse() {
        this.submitted = true;

        if (this.classe.nom.trim()) {
            if (this.classe.id) {
                this.classeService.updateClasse(this.classe.id,this.classe).subscribe(
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
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Classe', life: 3000});
            }
            else {
                this.classeService.postClasse(this.classe).subscribe( data =>
                {
                        console.log(this.classe);
                        this.classeSubject.next();
                        this.classeDialog = false;

                        this.getClasses();
                }),
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Classe', life: 3000});
            }

            this.classes = [...this.classes];
            this.classeDialog = false;
            this.classe = {};
        }
    }


    // public postClasse(){
    //     this.submitted=true;
    //     return this.classeService.postClasse(this.classe).subscribe( data =>
    //         {
    //             console.log(this.classe);
    //             this.classeSubject.next();
    //             this.classeDialog = false;
    //
    //             this.getClasses();
    //         },
    //         error => {
    //             console.log(error);
    //         });
    // }

    // public updateClasse(id:number, classe: Classe) {
    //     this.submitted=true;
    //     return this.classeService.updateClasse(id,classe).subscribe(
    //         data => {
    //             console.log(data);
    //             this.editClasseDialog = false;
    //             this.classe = {};
    //             this.getClasses();
    //         },
    //         error => {
    //             console.log(error);
    //         }
    //     );
    // }

    deleteClasse(classe: Classe) {
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + classe.nom + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.classes = this.classes.filter(val => val.id !== classe.id);
                this.classeService.deleteClasse(classe.id).subscribe(data =>
                    {
                        this.getClasses();
                    },
                    error => {
                        console.log(error);
                    });
                this.classe = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Classe Supprimée', life: 3000});
            }
        });
    }

    deleteSelectedClasses() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les classes sélectionnées?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.classes = this.classes.filter(val => !this.selectedClasses.includes(val));
                console.log(this.selectedClasses);
                this.classeService.deleteAllClasse(this.selectedClasses).subscribe(data =>
                    {
                        this.getClasses();
                    },
                    error => {
                        console.log(error);
                    });
                this.selectedClasses = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Classe(s) Supprimée(s)', life: 3000});
            }
        });
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
        return this.classes ? this.first === (this.classes.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.classes ? this.first === 0 : true;
    }
}
