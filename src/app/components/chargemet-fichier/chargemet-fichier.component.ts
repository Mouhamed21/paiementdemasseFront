import { Component, OnInit } from '@angular/core';
import {ClasseService} from "../../service/classe.service";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {ChargefichierService} from "../../service/chargefichier/chargefichier.service";
import {Router} from "@angular/router";
import {Fichier} from "../../modele/fichier";
import {Subject, window} from "rxjs";
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
import { DetailBeneficiaireService } from 'src/app/service/detail-beneficiaire.service';
import { DetailBeneficiaire } from 'src/app/modele/detail-beneficiaire';
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
    panier=[];
    panierDetail:any;
    //panierDetail: any[];
    panierDetailBeneficiaire:DetailBeneficiaire[] = [] ;
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
    detailBeneficiaire: DetailBeneficiaire = new DetailBeneficiaire();
    users:any;
    email:any;
    charger:boolean;
    test=[];
    montant=[];
    montants:number;
    montantglobal=0;
    panierMontant:any[];
    montantGlobal:number = 0;
    //data = [];
    //chargement fichier
    evenementChoisi : Evenement = new Evenement()
    statutChoisi : Statut = new Statut()
    fichierChoisi : Fichier = new Fichier()
    nameFichier:any;
    ficchiers:any;
    
    
    test1



    fichiersUploades

    constructor(private chargefichierService: ChargefichierService, private router: Router,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private userService: UserServiceService,
                public keycloak: KeycloakService, private evenementService: EvenementService,
                private statutService: StatutService, private formBuilder: FormBuilder,
                private beneficiaireService: BeneficiaireService, private detailBeneficiaireService:DetailBeneficiaireService) {
        this.keycloak.loadUserProfile().then( res =>
        {
            console.log(res);
            this.users = res;
            this.email= res.email;
            console.log(res.email);
            this.getUser(res.email);

        });
    }



    ngOnInit(): void {
        this.getAllFilesUploaded()
        this.getAllFichierNonCertifier();
        // this.getAllFichier();
        this.getEvenementsEnCours();
        this.getStatuts();
        this.getAllFichierName();

        this.uploadForm = this.formBuilder.group({
            evenement: ['', Validators.required],
            statut: ['', Validators.required],
            myFile: ['', Validators.required]
        });
    }


    onFileChange(event) {
        // console.log()
        console.log(event.target.files)

            const target: DataTransfer = <DataTransfer>(event.target);
            console.log(target.files);

//verification existence fichier
//             if (this.nameFichier[f] == target.files[0].name)
//             {
//                 console.log('Vous ne pouvez pas charger ce fichier car il a déja été chargé');
//
//                 this.charger = false;
//                 break;
//             }
//             else
//             {
            console.log(target.files[0].name);
            this.fichierChoisi.nomFichier = target.files[0].name

            console.log('Good');
            this.charger=true;
            this.chargefichierService.uploadFile(event.target.files[0]).subscribe(data =>
            {
                console.log(data);
            })

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
                /* wire up file reader */

                for (let index = 0; index < this.ws.length; index++) {
                    console.log(this.ws.length)
                    console.log(index)

                    this.ws[index];
                    console.log(this.ws[index]);
                    console.log(this.ws[index].MontantCFA)
                    console.log(this.montantGlobal)
                    this.montantGlobal += this.ws[index].MontantCFA
                    console.log(this.montantGlobal)
                }
                console.log(this.ws.length);
                console.log(this.montantGlobal);

            };
            reader.readAsBinaryString(target.files[0]);
            // }
    }

    public getUser(email){
        console.log(email);
        return this.userService.getUserByEmail(email).subscribe(data =>
        {
            console.log(data);
            this.user = data;
        })
    }
    public getAllFichierName(){
        return this.chargefichierService.getAllFichierName().subscribe((data) =>
        {
            console.log(data);
            this.nameFichier = data;
            //console.log(this.nameFichier);
        })
    }
    saveBeneficiaire(beneficiaire: Beneficiaire) {
        if (this.charger == true) {

            for (let i of this.ws) {
                console.log(i)
              
                //remplissage panier beneficiaire
                this.beneficiaire.numPension = i.NumPension
                this.beneficiaire.nomPrenom = i.NomEtatCivilPrenoms;
                this.beneficiaire.adresse = i.Adresse;
                this.beneficiaire.adresseComplementaire = i.AdresseComplementaire;
                this.beneficiaire.commune = i.Commune;
                this.beneficiaire.civilite = i["Civilité"];
                console.log(i.Civilite)
                this.beneficiaire.codePostal = i["Code Postal"];
                this.beneficiaire.numPension = i.NumPension;
                this.beneficiaire.telephone = i.Telephone;
                this.panier.push({...this.beneficiaire});

                //remplissage panier detail beneficiaire
                this.detailBeneficiaire.beneficiaire.numPension = i.NumPension
                this.detailBeneficiaire.montant = i.MontantCFA
                this.detailBeneficiaire.statut = this.statutChoisi;
                this.detailBeneficiaire.paye = false;
                this.detailBeneficiaire.idUser = this.user.id;
                this.panierDetailBeneficiaire.push({...this.detailBeneficiaire});
                console.log(this.panierDetailBeneficiaire)

                this.detailBeneficiaire = new DetailBeneficiaire()
            }


            //sauvegarde et recuperation fichier
            this.fichierChoisi.montantGlobal = this.montantGlobal;
            console.log(this.montantGlobal)
            this.fichierChoisi.certification = false;
            this.fichierChoisi.evenement = this.evenementChoisi;
            this.fichierChoisi.statut = this.statutChoisi;
            this.fichierChoisi.idUserChargement = this.user.id;
            this.fichierChoisi.nbrLigne = this.ws.length;
            console.log( this.fichierChoisi.montantGlobal)

            this.chargefichierService.saveFichier(this.fichierChoisi).subscribe(res => {
                console.log(res)
                // this.fichiers = res;
                this.test1 = res

                //on lit le fichier aux detailsBeneficiaire
                console.log(this.panierDetailBeneficiaire)
                this.panierDetailBeneficiaire.filter(d=>{
                    console.log(d.beneficiaire)
                    d.fichier = this.test1//res//this.fichiers
                })

                //sauvegarde table beneficiaire
                this.beneficiaireService.saveBeneficiaire(this.panier).subscribe(data => {
                    console.log(data);

                    //sauvegarde table detail beneficiaire
                    this.detailBeneficiaireService.saveDetailBeneficiaire(this.panierDetailBeneficiaire).subscribe(data => {
                        console.log(data);

                        this.getAllFichierNonCertifier()


                    })


                })


            })

                this.messageService.add({
                    severity: 'success',
                    summary: 'Réussi',
                    detail: 'Fichier Charger',
                    life: 3000
                });
            this.beneficiaire = null;
            this.fichierChoisi = null;
            this.detailBeneficiaire = null

            this.beneficiaire = new Beneficiaire();
            this.detailBeneficiaire = new DetailBeneficiaire();
            this.fichierChoisi = new Fichier();
            this.statutChoisi = new Statut()
            this.evenementChoisi = new Evenement()
            this.classeDialog = false;
            // debugger
            // this.getAllFichierNonCertifier()
            
            
        }
        // this.getAllFichierNonCertifier();


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
            console.log(this.fichiers)
            this.isLoading = true;
        })
    }

    openNew() {
        // this.fichier = {};

        console.log('avant')
        this.submitted = false;
        this.classeDialog = true;
        console.log('apres')
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
        console.log(this.evenementChoisi)
        console.log(this.statutChoisi)
        // const formData = new FormData();
        // // @ts-ignore
        // formData.append('file', this.uploadForm.get('myFile').value);
        // // @ts-ignore
        // formData.append('evenement', this.uploadForm.get('evenement').value);
        // // @ts-ignore
        // formData.append('statut', this.uploadForm.get('statut').value);
        //
        // this.chargefichierService.saveBeneficiaire(formData)
        //     .subscribe(response => {
        //         const that = this;
        //     }, err => {
        //         console.log(err);
        //     });
    }


    uploadFile(file:File){
        this.chargefichierService.uploadFile(file).subscribe(res=>{
            console.log(res)
        })
    }

    //recuperer tous les fichiers deja uploadés
    getAllFilesUploaded(){
        return this.chargefichierService.getAllFilesUploaded().subscribe(res=>{
            this.fichiersUploades = res
            console.log(this.fichiersUploades)
        })
    }

    comparaisonFichiers(fileName){
        this.fichiersUploades.filter(f =>{

            console.log(f)
        })
    }




}



// // this.test = data;
//
// //this.panierDetail.push({...data});
// this.panierDetail = data
// // this.panierDetail.forEach(res => {
// //     this.test = res;
// //     console.log(this.test);
// // });
// console.log(this.panierDetail);
// this.montantGlobal = 0;
// for (let k = 0; k < this.montant.length; k++) {
//     this.montantglobal = this.montant[k];
//     this.montantGlobal = this.montantGlobal + this.montantglobal;
// }
// console.log(this.montantGlobal);
// this.fichierChoisi.montantGlobal = this.montantGlobal;
// this.fichierChoisi.certification = false;
// this.fichierChoisi.dateChargement = new Date();
// this.fichierChoisi.evenement = this.evenementChoisi;
// this.fichierChoisi.statut = this.statutChoisi;
// this.fichierChoisi.idUserChargement = this.user.id;
// this.fichierChoisi.nbrLigne = this.ws.length;
// console.log(this.fichierChoisi)
// this.chargefichierService.saveFichier(this.fichierChoisi).subscribe(res => {
//     console.log(res)
//     this.fichiers = res;
//     for (let tes of this.panierDetail) {
//         console.log('tete');
//         //console.log(this.panierDetail[tes]);
//         console.log(tes);
//         console.log(res);
//         console.log(this.montant);
//         console.log(this.user.id);
//         console.log(this.montant);
//         this.detailBeneficiaire.beneficiaire = tes;
//
//         //console.log(this.panierDetail[tes].montant);
//
//     }
//     for (let k = 0; k < this.montant.length; k++) {
//         this.montants = this.montant[k];
//
//         // console.log(this.panierDetail[tes].montant);
//         this.detailBeneficiaire.montant = this.montants;
//         console.log(this.detailBeneficiaire.montant);
//         this.detailBeneficiaire.fichier = this.fichiers;
//         this.detailBeneficiaire.statut = this.fichierChoisi.statut;
//         this.detailBeneficiaire.paye = false;
//         this.detailBeneficiaire.idUser = this.user.id;
//         console.log(this.detailBeneficiaire);
//         this.panierDetailBeneficiaire.push({...this.detailBeneficiaire});
//     }
//     console.log(this.panierDetailBeneficiaire);
//
//
//     this.detailBeneficiaireService.saveDetailBeneficiaire(this.panierDetailBeneficiaire).subscribe(data => {
//         console.log(data);
//
//     })
// })
// //this.saveFichier(this.fichierChoisi);

