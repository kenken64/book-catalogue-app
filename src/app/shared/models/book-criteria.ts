export class BookCriteria {
    constructor(
        public keyword: string,
        public searchType: string,
        public currentPerPage: number,
        public itemsPerPage: number
    ){

    }
}