import { Component, OnInit } from '@angular/core';
import { PocService } from '../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonData } from '../models/person';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {
  persondetail: any;
  isVisible: boolean = true;
  personModal: PersonData = {
    Id: 0,
    Name: '',
    Email: '',
    Phone: 0,
    Address: ""
  };
  personData = new FormGroup({
    Id: new FormControl(),
    Name: new FormControl(''),
    Email: new FormControl(''),
    Phone: new FormControl(''),
    Address: new FormControl('')
  });
  constructor(private pocService: PocService,
    private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) {

    // Form builder check validation of input field
    this.personData = fb.group({
      'Id': 0,
      'Name': ['', Validators.compose([Validators.required, Validators.pattern(/^[^-\s][a-zA-Z0-9_\s-]+$/)])],
      'Email': ['', Validators.compose([Validators.required, Validators.email])],
      'Phone': ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      'Address': ['']

    });
  }

  ngOnInit(): void {

    // Get Person Id from router and set in form group
    // Check Id for Save or update form
    this.personData.controls['Id'].setValue(Number(this.route.snapshot.params['id']));

    // Check Id for fill the detail of person in form if person click on edit
    if (this.personData.get('Id')?.value > 0) {



      // Id is greater then 0 means Person want to update data
      // Take particular person data using Id and set into model
      this.persondetail = this.pocService.getPersonById(this.personData.get('Id')?.value);
      if (this.persondetail) {
        // If person data is exit then set data into form
        this.personData.patchValue({
          Id: this.persondetail.Id,
          Name: this.persondetail.Name,
          Email: this.persondetail.Email,
          Phone: this.persondetail.Phone,
          Address: this.persondetail.Address
        });
        if (this.pocService.isView == true) {
          this.personData.disable();
          this.isVisible = false;
          this.pocService.isView = false;
        }
      }

    }
  }

  // Save person data of form into list
  savePerson(formData: FormGroup) {
    // Check all form group validation is completed or not
    if (formData.valid) {
      // If all form input data is valid then add form data into model
      this.personModal.Id = formData.value.Id,
        this.personModal.Name = formData.value.Name.trim(),
        this.personModal.Email = formData.value.Email.trim(),
        this.personModal.Phone = formData.value.Phone,
        this.personModal.Address = formData.value.Address.trim()

      // Pass Model data into save method for save or update person detail
      this.pocService.savePerson(this.personModal);

      // After save or Update detail navigate to main page
      this.router.navigateByUrl('');
    }
  }
}
