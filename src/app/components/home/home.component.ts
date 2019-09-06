import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HeaderComponent]
})
export class HomeComponent implements OnInit {

  constructor(private headerComponent: HeaderComponent) { }

  ngOnInit() {

    this.headerComponent.showTopMenuBar(null, null);
    // window.addEventListener('resize', () => {
    // let vh = window.innerHeight * 0.01;
    //  document.documentElement.style.setProperty('--vh', `${vh}px`);
    // });
  }


}
