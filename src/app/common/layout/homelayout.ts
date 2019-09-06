import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <header>
        <app-topmenu > </app-topmenu>
    </header>
    <main class='main-content'>
        <router-outlet> </router-outlet>
    </main>
    <footer></footer>

  `,
    styleUrls : ['./homelayout.component.css']
})
export class HomeLayoutComponent { }
