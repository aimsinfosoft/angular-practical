import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PocService } from '../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  personData: any;
  dtOptions: DataTables.Settings = {};
  datatable: any;

  constructor(public service: PocService, private router: Router) { }

  ngOnInit(): void {
    // Initially get all person data for display in table
    this.getPersonData();

    // Searching, Pagination option for datatable
    if (this.service.pageIndex == 0) {
      this.dtOptions = {
        pagingType: 'full_numbers',
        stateSave: false,
        pageLength: 10,
        processing: true,
        language: {
          searchPlaceholder: "Search by Name/Email",
        }
      };
    } else {
      this.dtOptions = {
        pagingType: 'full_numbers',
        stateSave: true,
        pageLength: 10,
        processing: true,
        language: {
          searchPlaceholder: "Search by Name/Email",
        }
      };
    }
  }

  // Get and Set json data into table
  getPersonData() {
    // Get json data from service
    this.personData = this.service.getAllPersonData();
  }

  // Edit person
  editPerson() {
    var table = $('#person_table').DataTable();
    var info = table.page.info().page;
    this.service.pageIndex = info;
    this.dtOptions = {
      pagingType: 'full_numbers',
      stateSave: true,
      pageLength: 10,
      processing: true,
      language: {
        searchPlaceholder: "Search by Name/Email",
      }
    };

  }

  // View person detail
  viewPerson(id: number) {
    this.service.isView = true;
    this.router.navigate(['person-info', id])
  }

  // Delete person detail from list
  deletePerson(id: number) {
    // Display confirmation box for confirm delete for particular person detail
    var c = confirm("Are you sure you want to delete this record?");

    // If you want to detete
    if (c == true) {
      // Remove person data from list using id
      this.personData = this.personData.filter((p: { Id: number; }) => p.Id != id);
    }
  }
}
