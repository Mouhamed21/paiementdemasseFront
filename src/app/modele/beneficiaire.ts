import {Evenement} from './evenement';
import {Statut} from './statut';

export interface Beneficiaire {
    id: number ;
    numPension: string ;
    civilite: string ;
    nomPrenom: string ;
    adresse: string ;
    adresseComplementaire: string ;
    codePostal: string ;
    commune: string ;
    montantCFA: number ;
    dateChargement: string ;
    fileName: string ;
    nationalite: string;
    typePiece: string ;
    numPiece: string ;
    dateDelivrancePiece: string ;
    dateExpirationPiece: string ;
    dateNaissance: string ;
    telephone: string ;
    evenement?:Evenement;
    status?: Statut ;
}
