import { Component, OnInit } from '@angular/core';
import {ClasseService} from "../../service/classe.service";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {ChargefichierService} from "../../service/chargefichier/chargefichier.service";
import {Router} from "@angular/router";
import {Fichier} from "../../modele/fichier";
import {Subject} from "rxjs";
import {UserServiceService} from "../../service/userService/user-service.service";
import {KeycloakService} from "keycloak-angular";
import {Evenement} from "../../modele/evenement";
import {EvenementService} from "../../service/evenementService/evenement.service";
import {Statut} from "../../modele/statut";
import {StatutService} from "../../service/statut.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as xlsx from 'xlsx';
import {Beneficiaire} from "../../modele/beneficiaire";
import {BeneficiaireService} from "../../service/beneficiaire.service";
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
    worksheet: any;
    filelist: any;
    wb: xlsx.WorkBook;
    ws: any[];
    file: any;
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
    cpt:number;
    user:any;
    valSwitch:boolean;
    evenements: any;
    evenementFK: Evenement;
    statuts: any;
    statutFK: Statut;
    uploadForm: FormGroup;
    beneficiaire: Beneficiaire = new Beneficiaire();
    beneficiair: any[];



  constructor(private chargefichierService: ChargefichierService, private router: Router,
              private messageService: MessageService, private confirmationService: ConfirmationService,private userService: UserServiceService,
              public keycloak: KeycloakService, private evenementService: EvenementService,
              private statutService: StatutService, private formBuilder: FormBuilder,
              private beneficiaireService: BeneficiaireService) {
  }



  ngOnInit(): void {
    this.getAllFichierNonCertifier();
   // this.getAllFichier();
    this.getEvenementsEnCours();
    this.getStatuts();

    this.uploadForm = this.formBuilder.group({
        evenement: ['', Validators.required],
        statut: ['', Validators.required],
        myFile: ['', Validators.required]
    });
  }

    onFileSelect(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            // @ts-ignore
            this.uploadForm.get('myFile').setValue(file);
        }
    }

    onFileChange(evt: any) {

        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(evt.target);
        console.log(target.files);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            let bstr = e.target.result;
            this.wb = xlsx.read(bstr, {type: 'binary'});

            /* grab first sheet */
            this.wb.SheetNames.forEach(ele => {
                this.ws = xlsx.utils.sheet_to_json(this.wb.Sheets[ele])
                console.log(this.ws);
            });
            for (let index = 0; index < this.ws.length; index++) {

                    this.ws[index];
                    console.log(this.ws[index]);

                    //this.saveBeneficiaire(this.ws[index]);

            }
            //this.calculemontant(this.ws)
            //console.log(this.ws);
            console.log(this.ws.length);
            for (let i= 0; i<this.ws.length; i++)
            {
                this.beneficiaire.nomPrenom = this.ws[i].NomEtatCivilPrenoms;
                this.beneficiaire.adresse = this.ws[i].Adresse;
                this.beneficiaire.adresseComplementaire = this.ws[i].AdresseComplementaire;
                this.beneficiaire.commune = this.ws[i].Commune;
                this.beneficiaire.civilite = this.ws[i].Civilité;
                this.beneficiaire.codePostal = this.ws[i].CodePostal;
                this.beneficiaire.numPension = this.ws[i].NumPension;
                this.beneficiaire.telephone = this.ws[i].Telephone;
                //this.beneficiaire.dateChargement = new Date();
                console.log(this.beneficiaire);
                this.saveBeneficiaire(this.beneficiaire);
                console.log('save');
               // this.beneficiaire.fileName = this.ws[i].FileName;
            }


        };
        reader.readAsBinaryString(target.files[0]);
    }
    saveBeneficiaire(beneficiaire:Beneficiaire)
    {
        //console.log(this.beneficiaire);
        this.beneficiaireService.saveBeneficiaire(beneficiaire).subscribe(data =>
        {
            console.log(data);
        })
    }

    public getEvenementsEnCours(){
      return this.evenementService.getEvenementsEnCours().subscribe(data => {
          this.evenements = data;
          //console.log(data)
      }, err => {
          console.log(err);
      });
  }

    getEvenement(evenement:Evenement){
        this.evenementFK = JSON.parse(JSON.stringify(evenement));
        console.log(this.evenementFK);
    }

    getStatuts(){
      return this.statutService.getStatuts().subscribe(data => {
          this.statuts = data;
          console.log(data)
      }, err => {
          console.log(err);
      });
    }

    getStatut(statut:Statut){
        this.statutFK = JSON.parse(JSON.stringify(statut));
        console.log(this.statutFK);
    }

    public getAllFichierNonCertifier(){
        return this.chargefichierService.getAllFichierNonCertifier().subscribe((data) =>
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
        this.getAllFichierNonCertifier();
        //this.editClasseDialog = false;
    }

    onCertifier(fichier: Fichier) {
        this.chargefichierService.certifie(fichier)
            .subscribe(data => {
                fichier.certification = data.certification;
                //this.valSwitch = !this.valSwitch;
            })

    }

    saveFile() {
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', this.uploadForm.get('myFile').value);
        // @ts-ignore
        formData.append('evenement', this.uploadForm.get('evenement').value);
        // @ts-ignore
        formData.append('statut', this.uploadForm.get('statut').value);

        this.chargefichierService.saveBeneficiaire(formData)
            .subscribe(response => {
                const that = this;
            }, err => {
                console.log(err);
            });
    }

}
