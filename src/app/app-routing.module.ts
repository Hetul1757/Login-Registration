import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegComponent } from './reg/reg.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UpdateComponent } from './update/update.component';
import { ErrorDialogComponent } from './services/error-dialog/error-dialog.component';
import { FileNameDialogComponent } from './services/file-name-dialog/file-name-dialog.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'signup',component: RegComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:AdminComponent},
  {path:'user/:id',component:UserComponent},
  {path:'user/:id/update',component:UpdateComponent},
  {path:'check',component:ErrorDialogComponent},
  {path:'checkk',component:FileNameDialogComponent},
  {path:'patient',component:PatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RegComponent,
                                  LoginComponent,
                                  AdminComponent,
                                  UserComponent,
                                  UpdateComponent]
