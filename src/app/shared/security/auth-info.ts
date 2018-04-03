export class AuthInfo {

    constructor(
        public $uid:string,
        public email:string
    ) {

    }

    isLoggedIn() {
        return !!this.$uid; //null or undefined false  // with value return true
    }

}