import {Classe} from "./classe";

export class Eleve {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public dateNaissance?:Date,
        public lieuNaissance?: string,
        public telephone?: number,
        public numeroContact?: number,
        public adresse?: string,
        public email?: string,
        public classe?: Classe
    ) { }
}
