import {Component, OnInit} from '@angular/core';
import {Contact, ContactModel, IResponse} from "../model/contact-model";
import {ContactService} from "./services/contact.service";
import {Message} from "primeng/api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cmanager';
  value=""
  messages:Message[] =[]
  _id?:string="";
  loading: boolean = false;
  totalCount="";
  contacts:Contact[]=[]
  $resp:Observable<IResponse> = this.contactService.readContacts();

  contactModel = new ContactModel("","","","")

  constructor(private contactService:ContactService) {
  }

  ngOnInit() {
    this.contactService.readContacts().subscribe((resp)=>{
      this.totalCount = `Total Contacts: ${resp.count}`
      this.contacts = resp.contacts;
    })
  }

  createContact(){
    this.loading = true;
    this.contactService.createContact(this.contactModel).subscribe((res)=>{
      this._id = res._id;
      this.loading = false
    })
  }

  getCurrentContact() {
    return JSON.stringify(this.contactModel);
  }

}
