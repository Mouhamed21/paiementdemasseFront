import { Beneficiaire } from './beneficiaire'
import { Typeoperation } from './typeoperation'

export class SuiviBeneficiaire {
    id
    motif
    idUser
    beneficiaire:Beneficiaire = new Beneficiaire()
    typeOperation:Typeoperation = new Typeoperation()
    date

}
