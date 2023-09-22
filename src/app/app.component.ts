import {Component, OnInit} from '@angular/core';
import {Contact, ContactModel, IResponse} from "../model/contact-model";
import {ContactService} from "./services/contact.service";
import {Message, MessageService} from "primeng/api";
import {Observable} from "rxjs";



interface Course {
  name: string,
  code: string
}



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
  courses!: Course[];
  selectedCourses!: Course[];
  date!:Date[]
  constructor(private contactService:ContactService,private messageService: MessageService) {
  }

  ngOnInit() {
    this.contactService.readContacts().subscribe((resp)=>{
      this.totalCount = `Total Contacts: ${resp.count}`
      this.contacts = resp.contacts;
      this.messageService.add({ severity: 'success', summary: 'Product Selected', detail: "Read all contacts" })
    })

    this.courses = [
      {name: 'DCA', code: 'DCA'},
      {name: 'PGDCA', code: 'PGDCA'},
      {name: 'TALLY', code: 'TALLY'},
      {name: 'MS-OFFICE', code: 'MS-OFFICE'},
      {name: 'ADCA', code: 'ADCA'}
    ];
  }

  createContact(){
    this.loading = true;
    this.contactService.createContact(this.contactModel).subscribe((res)=>{
      this._id = res._id;
      this.loading = false
      this.messages.push({ severity: 'success', summary: 'Contact Created', detail: "Save to remote DB" })
      // this.messageService.add(this.messages)
      this.messageService.add({ severity: 'success', summary: 'Contact Created', detail: "Save to remote DB" })
    })
  }

  getCurrentContact() {
    return JSON.stringify(this.contactModel);
  }

}
