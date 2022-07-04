import {Statut} from "./statut";
import {Fichier} from "./fichier";
import { Beneficiaire } from './beneficiaire';

export class DetailBeneficiaire {
    id
    montant
    beneficiaire = new Beneficiaire()
    idUser
    fichier:Fichier = new Fichier()
    statut:Statut = new Statut()
    paye
}
