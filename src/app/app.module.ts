import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorage } from './services/token.storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/app.interceptor';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegComponent } from './reg/reg.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/auth.service';
import { ErrorDialogComponent } from './services/error-dialog/error-dialog.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UpdateComponent } from './update/update.component';
import { FileNameDialogComponent } from './services/file-name-dialog/file-name-dialog.component';
import { PatientComponent } from './patient/patient.component';
import { UpdateDialogComponent } from './services/update-dialog/update-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegComponent,
    LoginComponent,
    routingComponents,
    ErrorDialogComponent,
    AdminComponent,
    UserComponent,
    UpdateComponent,
    FileNameDialogComponent,
    PatientComponent,
    UpdateDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [UpdateDialogComponent,FileNameDialogComponent],
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    TokenStorage,
    AuthenticationService,
    ErrorDialogComponent
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
