export interface IContact {
  _id?: string;
  first_name: string,
  last_name: string,
  email: string,
  phone: string
}

export interface IResponse {
  count: number
  contacts: Contact[]
}

export interface Contact {
  _id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  create_at: string
  __v: number
}


export class ContactModel {
  constructor(public first_name: string,public last_name:string, public email:string, public phone:string) {
  }
}
