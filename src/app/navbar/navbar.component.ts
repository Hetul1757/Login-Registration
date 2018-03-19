import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service'; 
import { TokenStorage } from '../services/token.storage';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
//import {TokenStorage} from '../services/token.storage';

const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public ts:string;
  message:boolean;
  id:string;
  constructor(private authenticationService:AuthenticationService,
              private token:TokenStorage,
              private router:Router,
              public userService:UserService) { }
   
  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
  }
 
  myProfile(){
    this.id=this.token.getId();
    //let value=JSON.stringify(this.id);
    //this.userService.currentid.subscribe(id => this.id = id);
    console.log(this.id+"given");
    this.router.navigate(['user',this.id]);
  }
  
    //loggedIn=this.userService.loggedIn;  
  
  
  logout(){
    this.token.signOut();
    this.userService.changeMessage(false);
    this.userService.changeId(null);
    this.router.navigate(['login']);
  }
}

