import {Statut} from "./statut";
import {Fichier} from "./fichier";

export class DetailBeneficiaire {
    id
    montant
    beneficiaire
    idUser
    fichier:Fichier = new Fichier()
    statut:Statut = new Statut()
    paye
}
