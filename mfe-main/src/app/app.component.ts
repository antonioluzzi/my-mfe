import { Component } from '@angular/core';
import { registerMicroApps, start } from 'qiankun';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mfe-main';
  
   ngOnInit(): void {
    registerMicroApps([
      {
        name: 'mfe-angular-sub',
         entry: `${environment.production ? '/mfe-angular-sub/' : '//localhost:4900'}`,
        container: '#mfe',
        activeRule: '/mfe-angular-sub',
      }
    ]);
    start();
  }
  
}