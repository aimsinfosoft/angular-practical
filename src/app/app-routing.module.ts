import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonInfoComponent } from './person-info/person-info.component';
import { PersonListComponent } from './person-list/person-list.component';

const routes: Routes = [
  { path: '', component: PersonListComponent },
  { path: 'person-info/:id', component: PersonInfoComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
