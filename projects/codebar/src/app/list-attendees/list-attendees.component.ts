import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-list-attendees',
  templateUrl: './list-attendees.component.html',
  styleUrls: ['./list-attendees.component.css']
})
export class ListAttendeesComponent implements OnInit {
  students = [];
  coaches = [];

  constructor() { }

  ngOnInit() {
    this.students = [];
    this.coaches = [];
  }

  generateList() {
      this.students = this.makeList('students-table');
      this.coaches = this.makeList('coaches-table');
  }

  makeList(id: string) {
      let attendees = []
      let checkboxes = document.getElementById(id).querySelectorAll('.is-checked');
      for (let i = 0; i < checkboxes.length; i++) {
        const name = checkboxes[i].parentElement.parentElement.dataset.name;
        if (name != undefined) {
          attendees.push(name);
        }
      }
      return attendees;
  }
}
