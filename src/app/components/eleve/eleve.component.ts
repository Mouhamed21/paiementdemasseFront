import { Component, OnInit } from '@angular/core';
import {EleveService} from "../../service/eleve.service";
import {ClasseService} from "../../service/classe.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {Eleve} from "../../modele/eleve";
import {Classe} from "../../modele/classe";

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss'],
  providers: [ClasseService,MessageService,ConfirmationService,EleveService]
})
export class EleveComponent implements OnInit {
    eleves: any;
    classe:Classe;
    classes:any;
    id:number;
    eleve: Eleve;
    submitted: boolean;
    eleveDialog: boolean;
    validerEmail: boolean;
    filteredClasse: Classe[];
    filteredClasses: Classe[];
    eleveDialog2:boolean;
    selectedEleves: any;
    nbrEleves:any;
  constructor(private classeService: ClasseService, private eleveService: EleveService, private router: Router,
              private messageService: MessageService, private confirmationService: ConfirmationService ) { }

  ngOnInit(): void {

      this.getEleves();
      this.getClasses();
      this.getEffectifEcole();
       this.eleveService.getElevesByClasse(this.id).subscribe((data) =>
      {

          this.eleves = data;
          console.log(this.eleves);

      })
  }
    updatedate(event) {
        this.eleve.dateNaissance = new Date(event);
    }
    public getClasses(){
        console.log('On Init ...');
        return this.classeService.getClasses().subscribe((data) =>
        {
            console.log(data);
            this.classes = data;
        })
    }
    public getEffectifEcole(){
        return this.eleveService.getEffectifEcole().subscribe((data) =>
        {
            this.nbrEleves = data;
            console.log(this.nbrEleves);
        })
    }

    public getEleves(){
      this.eleveService.getEleves().subscribe(data => this.eleves = data);
  }
    first = 0;

    rows = 10;
    editEleve(eleve: Eleve) {
        this.eleve = {...eleve};
        this.eleveDialog2 = true;
    }
    public postEleve() {

        if (this.isValidEmail(this.eleve.email) === false){

            this.validerEmail=false;
            if (this.eleve.email){
                this.validerEmail=false;
                this.messageService.add({severity:'error', summary: 'Echéc', detail: "L'Email n'est pas valide", life: 3000});
            }

        }
        else {

            this.validerEmail=true;

        }
        console.log(this.eleve);
        this.submitted = true;
        if (this.validerEmail == true || !this.eleve.email){
            if (this.eleve.prenom.trim() && this.eleve.nom.trim() && this.eleve.dateNaissance.toString().trim() && this.eleve.lieuNaissance.trim()
                && this.eleve.adresse.trim()) {
                if (this.eleve.id) {
                   // this.eleve.classe = this.eleve.classe;
                    console.log(this.eleve);
                    //debugger
                    this.eleveService.updateEleve(this.eleve.id,this.eleve).subscribe(
                        data => {
                            console.log(data);
                            //this.editEleveDialog = false;
                            this.eleve = {};
                            this.getEleves();
                        },
                        error => {
                            console.log(error);
                        }
                    );
                    this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mise à jour Eleve avec succé', life: 3000});
                }
                else {
                    // this.classe.eleves=[];
                    //debugger
                     console.log(this.classe);
                    this.eleve.classe = this.classe;
                    console.log(this.eleve);

                    this.eleveService.postEleve(this.eleve).subscribe( data =>
                        {

                            this.eleve = {};
                            this.eleveDialog = false;
                            this.getEleves();
                            this.getEffectifEcole();
                        },
                        error => {
                            console.log(error);
                        });
                    this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Eleve', life: 3000});
                }

                this.eleves = [...this.eleves];
                this.eleveDialog = false;
                this.eleveDialog2 = false;
                this.eleve = {};
            }
        }

    }

    openNew() {
        this.eleve = {};
        this.submitted = false;
        this.eleveDialog = true;
    }
    hideDialog() {
        this.eleveDialog = false;
        this.eleveDialog2 = false;
        this.submitted = false;
        //this.editEleveDialog = false;
        // this.editClasseDialog = false;
    }
    filterclasse(event) {
        const filtered: Classe[] = [];
        const query = event.query;
        for (let i = 0; i < this.classes.length; i++) {
            const classe = this.classes[i];
            if (this.eleve.classe.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(classe);
            }
        }
        this.filteredClasse = filtered;
    }
    filterClasse(event) {
        const filtered: Classe[] = [];
        const query = event.query;
        for (let i = 0; i < this.classes.length; i++) {
            const clas = this.classes[i];
            if (clas.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(clas);
            }
        }
        this.filteredClasses = filtered;
    }
    deleteEleve(eleve: Eleve){
        this.confirmationService.confirm({
            message: 'Etes-vous sûr de vouloir supprimer ' + eleve.prenom + ' ' +eleve.nom +' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.eleves = this.eleves.filter(val => val.id !== eleve.id);
                this.eleveService.deleteEleve(eleve.id).subscribe(data =>
                    {
                        this.getEleves();
                        this.getEffectifEcole();
                    },
                    error => {
                        console.log(error);
                    }
                );


                this.eleve = {};
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Eleve Supprimé', life: 3000});

            }

        });


    }
    deleteSelectedEleves() {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer les eleves sélectionnés',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.eleves = this.eleves.filter(val => !this.selectedEleves.includes(val));
                console.log(this.selectedEleves);
                this.eleveService.deleteAllEleves(this.selectedEleves).subscribe(data =>
                    {
                        this.getEleves();
                        this.getEffectifEcole();
                    },
                    error => {
                        console.log(error);
                    }
                );
                this.selectedEleves = null;
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Eleve(s) Supprimé(s)', life: 3000});
                this.getEleves();
                this.getEffectifEcole();
            }
        });
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    isLastPage(): boolean {
        return this.eleves ? this.first === (this.eleves.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.eleves ? this.first === 0 : true;
    }

    public isValidEmail(email: string): boolean {
        try {
            let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
            let valid = pattern.test(email);
            console.log(valid);
            return valid;
        } catch (TypeError) {
            return false;
        }
    }

}
