import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { TokenStorage } from '../services/token.storage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user:User;
  constructor(public userService:UserService,
              private activeRoute: ActivatedRoute,
              private token:TokenStorage) { }
  id:number;
  idCompare:string;
  users=new User("","","","",null,"","");
  public idUser:number=3;
  ngOnInit() {

    this.activeRoute
      .paramMap
      .subscribe((params:ParamMap)=>{
        let id=parseInt(params.get('id'));
        this.id=id;
        this.idCompare=JSON.stringify(id);
      })
      
      this.userService.currentid.subscribe(id => this.idUser = id);
      console.log(this.idUser+"current");
      console.log(this.token.getId()+"getCurrent");
      if(this.token.getId()==this.idCompare){
        this.userService.getUser(this.id).subscribe(
          data => {
            console.log(data);
            this.users = data;
          }
        );
      }
      else{
        console.log("U are not allowed to visit this page");
      }

      
    
  }

}
