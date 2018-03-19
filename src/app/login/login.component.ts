import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/auth.service';
import {TokenStorage} from '../services/token.storage';
import {MatDialog} from '@angular/material';

const TOKEN_KEY = 'AuthToken';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id:number;
  message:boolean;
  model: any = {};
  loading = false;
  error = '';

  constructor(  private router: Router,
    private authenticationService: AuthenticationService,
    private token: TokenStorage,
    public dialog: MatDialog,
    private userService:UserService ) { }

  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.message = message)
  }

  newMessage() {
    this.userService.changeMessage(true);
  }

  uname = new FormControl('', [
    Validators.required,
    Validators.pattern('.{8,}')
  ]);

  pwd = new FormControl('', [
    Validators.required,
    Validators.pattern('.{8,}')
  ]);

  matcher = new MyErrorStateMatcher();

  isError():boolean{
    return (this.uname.hasError('required') ||
            this.uname.hasError('pattern')  ||
            this.pwd.hasError('required')   ||
            this.pwd.hasError('pattern')   
          );
  }
  
  login(): void {
    this.authenticationService.attemptAuth(this.uname.value, this.pwd.value).subscribe(
      data => {
        this.token.saveToken(data.token);
        console.log(data.id);
        this.id=data.id;
        this.userService.changeMessage(true);
        this.userService.changeId(this.id);
        let value=JSON.stringify(this.id);
        console.log(value);
        //console.log("happy");
        //console.log(21);
        this.token.saveId(value);
        this.router.navigate(['user',data.id]);
        //this.error="Correct Username passwod combination";
      },
      error => {this.error="Wrong UserName or Password";
                console.log("wrong ");}
    );
  }

  register():void {
    this.router.navigate(['signup']);
  }
 /* login(): void {
    this.authService.attemptAuth(this.uname.value, this.pwd.value).subscribe(
      data => {
        //this.token.saveToken(data);
        this.router.navigate(['user']);
      }
    );
  }*/

}
