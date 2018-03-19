import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { Router} from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  public users:User[];
  constructor(public userService:UserService, private router: Router) { }

  ngOnInit() {
    //this.getAllUsers();
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  name = new FormControl('', [
    Validators.required,
    Validators.pattern('.{8,}')
  ]);
  uname = new FormControl('', [
    Validators.required,
    Validators.pattern('.{8,}')
  ]);

  pwd = new FormControl('', [
    Validators.required,
    Validators.pattern('.{8,}')
  ]);
  tel = new FormControl('', [
    Validators.required,
    Validators.pattern('.{8,}')
  ]);
  specialist = new FormControl('', [
    Validators.required
  ]);
  gender = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
  
  onSubmit=function(){
    console.log(this.name.value);
    console.log(this.uname.value);
    console.log(this.email.value);
    console.log(this.pwd.value);
    console.log(this.tel.value);
    console.log(this.gender.value);
    console.log(this.specialist.value);
    //console.log(this.gender.hasError());
    console.log(this.email.hasError('required'));
    this.users=new User(this.name.value,this.uname.value,this.email.value,this.pwd.value,this.tel.value,this.gender.value,this.specialist.value);
    //console.log(this.users.name);
    this.userService.create(this.users).subscribe();
  }

  isError():boolean{
    return (this.email.hasError('required') || 
            this.email.hasError('email')    ||
            this.name.hasError('required')  ||
            this.name.hasError('pattern')   ||
            this.uname.hasError('required') ||
            this.uname.hasError('pattern')  ||
            this.pwd.hasError('required')   ||
            this.pwd.hasError('pattern')    ||
            this.tel.hasError('required')   ||
            this.tel.hasError('pattern')    ||
            this.gender.hasError('required')||
            this.specialist.hasError('required')    
          );
  }

 login(){
  this.router.navigate(['login']);
 }

  specialists = [
    {value: 'Surgeon', viewValue: 'Surgeon'},
    {value: 'Cardiologists', viewValue: 'Cardiologists'},
    {value: 'Dermatologists', viewValue: 'Dermatologists'},
    {value: 'Endocrinologists', viewValue: 'Endocrinologists'},
    {value: 'Gastroenterologists', viewValue: 'Gastroenterologists'}
  ];

  genders = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'}
  ];
}


