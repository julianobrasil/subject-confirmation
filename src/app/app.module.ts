import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SubjectConfirmationModule } from './subject-confirmation/subject-confirmation.module';
import { SubjectConfirmationFormComponent } from './subject-confirmation-form/subject-confirmation-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectConfirmationFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SubjectConfirmationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
