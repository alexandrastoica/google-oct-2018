import { Component, OnInit, AfterContentInit } from '@angular/core';
import { GoogleSheetsService } from '../google-sheets.service';

@Component({
  selector: 'app-list-attendees',
  templateUrl: './list-attendees.component.html',
  styleUrls: ['./list-attendees.component.css']
})
export class ListAttendeesComponent implements OnInit {
  students = [];
  coaches = [];
  data;

  constructor(public gs: GoogleSheetsService) { }

  ngOnInit() {
    this.students = [];
    this.coaches = [];

    this.gs.getData().subscribe(data => {
      this.data = data
      console.log(this.data)
    });

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

  select(el) {
      console.log(el)
      el.className += ' selected';
  }
}
