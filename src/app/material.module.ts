import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatInputModule,MatSelectModule,MatRadioModule,MatCardModule,MatTabsModule,MatDialogModule,MatTableModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatInputModule,MatSelectModule,MatRadioModule,MatCardModule,MatTabsModule,MatDialogModule,MatTableModule],
  })

  export class MaterialModule { }