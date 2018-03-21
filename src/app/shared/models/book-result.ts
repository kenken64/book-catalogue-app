export class BookResult {
    constructor(
        public id: number,
        public author_lastname: string,
        public author_firstname: string,
        public title: string,
        public cover_thumbnail: string,
        public modified_date: string,
        public created_date: string,
        public is_deleted: number
    ){

    }            
}
