import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SubjectConfirmationModule } from './subject-confirmation/subject-confirmation.module';

@NgModule({
  declarations: [
    AppComponent
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
