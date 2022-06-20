export class Evenement {
    constructor(
        public id?: number,
        public anneeCampagne?: number,
        public dateCloture?:Date,
        public dateCreation?:Date,
        public moisCampagne?: string,
        public status?: string
    ) { }
}

