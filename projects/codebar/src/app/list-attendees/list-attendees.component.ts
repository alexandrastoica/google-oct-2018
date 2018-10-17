import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-list-attendees',
  templateUrl: './list-attendees.component.html',
  styleUrls: ['./list-attendees.component.css']
})
export class ListAttendeesComponent implements OnInit {
  attendees = []

  constructor() { }

  ngOnInit() {
    this.attendees = []
  }

  generateList() {
    this.attendees = []
    let checkboxes = document.getElementById('rsvp-table').querySelectorAll('.is-checked');
    for (let i = 0; i < checkboxes.length; i++) {
      const name = checkboxes[i].parentElement.parentElement.dataset.name;
      if (name != undefined) {
        this.attendees.push(name);
      }
    }
  }
}
