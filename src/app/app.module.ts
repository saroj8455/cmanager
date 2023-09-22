import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// prime module
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import { InputMaskModule } from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import {HttpClientModule} from "@angular/common/http";
import { DatatblComponent } from './components/datatbl/datatbl.component';
import { TableModule } from 'primeng/table';
import {ToastModule} from "primeng/toast";
import {CustomerService} from "./services/customerservice";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";
import { MultiSelectModule } from 'primeng/multiselect';
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
@NgModule({
  declarations: [
    AppComponent,
    DatatblComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputMaskModule,
    MessagesModule,
    TableModule,
    ToastModule,
    MultiSelectModule,
    CalendarModule,
    InputTextareaModule
  ],
  providers: [CustomerService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
