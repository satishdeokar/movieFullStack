import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatDatepickerModule } from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImportantLinkComponent } from './components/important-link/important-link.component';
import { DataTableComponent } from './widget/data-table/data-table.component';

const components = [
  HeaderComponent,
  FooterComponent,
  ImportantLinkComponent,
  DataTableComponent
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  exports: [
    components,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,

  ]
})
export class SharedModule { }
