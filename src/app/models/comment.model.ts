export class Comment{
    
    constructor(
        public postId: number,
        public id: number,
        public name: string,
        public email: string,
        public body: string,
        public date?: Date,
        public storage?: boolean
        ){}
}