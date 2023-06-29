import { Injectable } from '@angular/core';
import { PersonData } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PocService {

  public personData: PersonData[] = [];
  isView: boolean = false;
  pageIndex: number = 0;
  pageLength: number = 10;

  constructor() {

    // Person data in Json format for display in table
    // This is hard/bound data
    this.personData = [
      {
        Id: 1,
        Name: "James",
        Email: "james@gmail.com",
        Phone: 8583453234,
        Address: ""
      },
      {
        Id: 2,
        Name: "clara",
        Email: "clara@gmail.com",
        Phone: 9983423854,
        Address: ""
      },
      {
        Id: 3,
        Name: "Wayne",
        Email: "wayne@gmail.com",
        Phone: 4348273323,
        Address: ""
      },
      {
        Id: 4,
        Name: "Maya",
        Email: "maya@gmail.com",
        Phone: 9920558566,
        Address: ""
      },
      {
        Id: 5,
        Name: "Yuxuan",
        Email: "yuxuan@gmail.com",
        Phone: 4653487657,
        Address: ""
      },
      {
        Id: 6,
        Name: "Xiu",
        Email: "xiu@gmail.com",
        Phone: 5634768563,
        Address: ""
      },
      {
        Id: 7,
        Name: "Ashton",
        Email: "ashton@gmail.com",
        Phone: 4348273323,
        Address: ""
      },
      {
        Id: 8,
        Name: "Bruno",
        Email: "bruno@gmail.com",
        Phone: 8976545676,
        Address: ""
      },
      {
        Id: 9,
        Name: "Cedric",
        Email: "cedric@gmail.com",
        Phone: 4536457897,
        Address: ""
      },
      {
        Id: 10,
        Name: "Herrod",
        Email: "herrod@gmail.com",
        Phone: 8796543234,
        Address: ""
      },
      {
        Id: 11,
        Name: "Jackson",
        Email: "jackson@gmail.com",
        Phone: 7897654345,
        Address: ""
      },
      {
        Id: 12,
        Name: "Jonas",
        Email: "jonas@gmail.com",
        Phone: 4567898765,
        Address: ""
      },
      {
        Id: 13,
        Name: "Shou",
        Email: "shou@gmail.com",
        Phone: 9876543212,
        Address: ""
      },
      {
        Id: 14,
        Name: "Thor",
        Email: "thor@gmail.com",
        Phone: 7897654345,
        Address: ""
      }
    ];
  }

  // This method return all person data from json
  getAllPersonData() {
    return this.personData;
  }

  // Save or Update person data in person Json data list
  savePerson(person: PersonData) {
    // Check for Save and Update detail
    if (person.Id > 0) {
      // If Person Id is greater then 0 means Update data in list
      this.personData = this.personData.map(p => p.Id !== person.Id ? p : person);
    }
    else {
      // ID is 0 means new data for Save
      person.Id = Math.max(...this.personData.map(o => o.Id)) + 1;
      // Add new data in person data list
      this.personData.push(person);
    }
  }

  // Return particular person data using Id
  getPersonById(id: number): PersonData | undefined {
    // Find particular person data using id
    return this.personData.find(x => x.Id === id);
  }
}
