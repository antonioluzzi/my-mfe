import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilderComponent } from '@formio/angular';
import { Formio } from 'formiojs';

@Component({
  selector: 'mfe-angular-sub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy{
  @ViewChild('builder', { static: true }) builder!: FormBuilderComponent;
  json = {};
  public form = {
    components: []
  };

  constructor(
    // private service: FormioService,
  ) {}
  ngOnDestroy(): void {
  

  }

  ngOnInit() {
    this.builder.formio
  }

  onChange(event:any) {
    this.json = event.form;
  }

  onSubmit() {
    Formio;
    debugger;
  //  this.builder.formio.saveComponent(this.form);
  }
}
