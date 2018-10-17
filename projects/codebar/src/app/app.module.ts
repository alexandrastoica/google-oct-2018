import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { GroupingsComponent } from './groupings/groupings.component';
import { ListAttendeesComponent } from './list-attendees/list-attendees.component';
import { GroupComponent } from './group/group.component';

import { GoogleSheetsService } from './google-sheets.service';

const appRoutes: Routes = [
 // { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    GroupingsComponent,
    ListAttendeesComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [GoogleSheetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
