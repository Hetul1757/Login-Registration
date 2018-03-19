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

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  dialogRef: MatDialogRef<FileNameDialogComponent>;
  users:User[]=[];
  displayedColumns = ['name','username','email','tel','gender','specialist','update','delete'];
  dataSource=new MatTableDataSource();
  id:number;
  choice: boolean=false;

  constructor(public userService:UserService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private token:TokenStorage) { }

  ngOnInit() {
    this.getData();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openAddFileDialog() {
    this.dialogRef = this.dialog.open(FileNameDialogComponent, {
      width: '250px',
      data: { choice: this.choice }
    });
    
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.choice = result;
    });
  }

  getData(){
    console.log(this.token.getToken());
    this.userService.getUsers().subscribe(
      data => {
        //console.log(data[0].id);
          console.log(data[0]);
        for(var i=0;i<data.length;i++){
          if((data[i].gender)=="Female"){
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
