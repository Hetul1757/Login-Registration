import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import { DoCheck } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FileNameDialogComponent } from '../services/file-name-dialog/file-name-dialog.component';
import { TokenStorage } from '../services/token.storage';
import { UpdateDialogComponent } from '../services/update-dialog/update-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  dataRefresher: any;
  dialogRef: MatDialogRef<FileNameDialogComponent>;
  dialogRef1: MatDialogRef<UpdateDialogComponent>;
  
  constructor(public userService:UserService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private token:TokenStorage ) { }
  //users:User[]=[{"name":"","username":"","email":"","password":"","tel":null,"gender":"","specialist":""}];
  users:User[]=[];
  
  displayedColumns = ['name','username','email','tel','gender','specialist','update','delete'];
  dataSource=new MatTableDataSource();
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  id:number;
  //users=new User("","","","",null,"","");
  
  ngOnInit() {
   this.getData();
   //this.refreshData(); 
  }

  //ngDoCheck(){
    //this.getData();
    //this.userService.deleteUser(id).subscribe();
   // console.log("Docheck");
 // }
  //getData();

  choice1: boolean=false;
  choice: boolean=false;
  //name: string;

  openAddFileDialog() {
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
       // this.userService.deleteUser(id).subscribe();
        //window.location.reload();
        }else{
          console.log("dont delete");
        }
    });

  }

  getData(){
    console.log(this.token.getToken());
    this.userService.getUsers().subscribe(
      data => {
        //console.log(data[0].id);
          console.log(data[0]);
        for(var i=0;i<data.length;i++){
          if((data[i].gender)=="Male"){
            this.users.push(data[i]);
          }
        }
        //console.log(data.gender);
        //console.log(data);
        //this.users = data;
        //console.log(this.users.length);
        this.dataSource = new MatTableDataSource(this.users);
       
      }
    );
  }


 /* refreshData(){
    this.dataRefresher =
      setInterval(() => {
        this.getData();
        //Passing the false flag would prevent page reset to 1 and hinder user interaction
      }, 1000);  
  }

  cancelPageRefresh(){
    if(this.dataRefresher){
        clearInterval(this.dataRefresher);
    }    
}*/

cancel(){
  //this.cancelPageRefresh();
  console.log("cancle method");
  }

  delete(id:number){
    this.dialogRef = this.dialog.open(FileNameDialogComponent, {
      width: '250px',
      data: { choice: this.choice }
    });
    
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.choice = result;
      if(this.choice==true){
        //console.log(id);
        //console.log("do delete");
        this.userService.deleteUser(id).subscribe();
        window.location.reload();
        }else{
          //console.log("dont delete");
        }
    });

   
    //this.userService.deleteUser(id).subscribe();
    //console.log("Delete");
    //window.location.reload();
  }

  update(id:number){
    console.log(id);
    this.router.navigate(['user',id,'update']);
  }
}
