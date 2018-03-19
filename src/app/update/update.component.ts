import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { UpdateDialogComponent } from '../services/update-dialog/update-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  //public user:User;
  public users:User;
  id:number;
  user=new User("","","","",null,"","");
  dialogRef1: MatDialogRef<UpdateDialogComponent>;

  constructor(public userService:UserService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog,) { }
    
  choice1: boolean=false;
  ngOnInit() {

    this.activeRoute
    .paramMap
    .subscribe((params:ParamMap)=>{
      let id=parseInt(params.get('id'));
      this.id=id;
    })

    this.userService.getUser(this.id).subscribe(
      data => {
        console.log(data);
        this.user = data;
      }
    );

  }

  email = new FormControl('', [
    
  ]);
  name = new FormControl('', [
   
  ]);
  uname = new FormControl('', [
   
  ]);

  pwd = new FormControl('', [

  ]);
  tel = new FormControl('', [
   
  ]);
  specialist = new FormControl('', [
    
  ]);
  gender = new FormControl('', [
    
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
    console.log(this.users);
    //this.userService.create(this.users).subscribe();
  }

  update(){
    this.dialogRef1 = this.dialog.open(UpdateDialogComponent, {
      width: '250px',
      data: { choice1: this.choice1 }
    });
    
    this.dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.choice1 = result;
      if(this.choice1==true){
        //console.log(id);
        console.log("do delete");
        this.users=new User(this.name.value,this.uname.value,this.email.value,this.pwd.value,this.tel.value,this.gender.value,this.specialist.value);
    this.userService.updateUser(this.users,this.id).subscribe();
       // this.userService.deleteUser(id).subscribe();
        //window.location.reload();
        }else{
          console.log("dont delete");
        }
    });
    
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
    //console.log(this.name.value);
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
