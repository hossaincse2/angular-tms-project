import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-reports-management',
  templateUrl: './reports-management.component.html',
  styleUrls: ['./reports-management.component.css']
})
export class ReportsManagementComponent implements OnInit {
  userLevel: number;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.userLevel = this.localStorageService.get("userLevel");
    console.log(this.userLevel);
  }

}
