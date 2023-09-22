import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IContact, IResponse} from "../../model/contact-model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http:HttpClient) { }

  private baseurl = "http://localhost:3000/contact"

  createContact(contact:IContact) {
    return this._http.post<IContact>(this.baseurl,contact);
  }

  readContacts() {
    return this._http.get<IResponse>(this.baseurl)
  }
}
