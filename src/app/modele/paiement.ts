import { Evenement } from './evenement'
import { Beneficiaire } from './beneficiaire'

export class Paiement {
    id
    idCaisse
    idBureau
    datePaiement
    beneficiaire?:Beneficiaire
    idUser
    evenement?:Evenement
}
