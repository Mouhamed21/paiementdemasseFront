import { Evenement } from './evenement'
import { Beneficiaire } from './beneficiaire'
import { DetailBeneficiaire } from './detail-beneficiaire'

export class Paiement {
    id
    idCaisse
    idBureau
    datePaiement
    detailBeneficiaire:DetailBeneficiaire = new DetailBeneficiaire()
    idUser
    evenement:Evenement = new Evenement()
}
