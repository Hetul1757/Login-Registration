export class User {
    name: string;
    username: string;
    password: string;
    email:string;
    tel:number;
    gender:string;
    specialist:string;
  
    constructor( name: string,username: string,email:string,password: string,tel:number,gender:string,specialist:string){
      this.name = name;
      this.username = username;
      this.password = password;
      this.email = email;
      this.tel=tel;
      this.gender=gender;
      this.specialist=specialist;
    }
  }

  


  
  