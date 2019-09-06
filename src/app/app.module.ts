import { LocalStorageService } from 'angular-web-storage';
import { HttpHelper } from './common/helper/httpHelper';
import { DataTableModule } from 'angular2-serverpagination-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Loader } from './common/loader/loader.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MessageHelper } from "./common/helper/messageHelper";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuardService } from "./common/auth/auth.guard.service";
import { AuthGuard } from "./common/auth/auth.guard";
import { HomeLayoutComponent } from "./common/layout/homelayout";
import { LoginLayoutComponent } from "./common/layout/loginlayout";
import { ErrorComponent } from "./components/error/error.component";
import { AlertComponent } from "./common/alert/alert.component";
import { AlertService } from "./common/alert/alert.service";
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MainPipe } from './common/pipe/main-pipe.module';
import { TopmenuComponent } from './common/topmenu/topmenu.component';
import { UserComponent } from './components/user/user.component';
import { AppComponent } from './app.component';
import { routing } from './app.route';
import { RequestComponent } from './components/request/request.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './components/home/home.component';
import { BusTicketComponent } from './components/bus-ticket/bus-ticket.component';
import { STMSDashboardComponent } from './components/stmsdashboard/stmsdashboard.component';
import { DryItemDemandComponent } from './components/unit-demand/unit-demand.component';
import { SsdLoginComponent } from './components/ssd-login/ssd-login.component';
import { DryItemDemandListComponent } from './components/unit-demand-list/unit-demand-list.component';
import { DryRatDmdComponent } from './components/dry-rat-dmd/dry-rat-dmd.component';
import { FreshRatDmdComponent } from './components/fresh-rat-dmd/fresh-rat-dmd.component';
import { ButchryItemsDmdComponent } from './components/butchry-items-dmd/butchry-items-dmd.component';
import { HeaderComponent } from './common/header/header.component';
import { PolDmdComponent } from './components/pol-dmd/pol-dmd.component';
import { HospitalItemsDmdComponent } from './components/hospital-items-dmd/hospital-items-dmd.component';
import { HcDmdComponent } from './components/hc-dmd/hc-dmd.component';
import { CondimentDmdComponent } from './components/condiment-dmd/condiment-dmd.component';
import { ItemComponent } from './components/item/item.component';
import { ItemTypeComponent } from './components/item-type/item-type.component';
import { UnitComponent } from './components/unit/unit.component';
import { ContactorComponent } from './components/contactor/contactor.component';
import { UnitListComponent } from './components/unit-list/unit-list.component';

import { ReceivedItemComponent } from './components/received-item/received-item.component';
import { DistributionComponent } from './components/distribution/distribution.component';
import { DryRatDsComponent } from './components/dry-rat-ds/dry-rat-ds.component';
import { CondimentDsComponent } from './components/condiment-ds/condiment-ds.component';
import { PolDsComponent } from './components/pol-ds/pol-ds.component';
import { FreshRatDsComponent } from './components/fresh-rat-ds/fresh-rat-ds.component';
import { ButchryItemsDsComponent } from './components/butchry-items-ds/butchry-items-ds.component';
import { HospitalItemsDsComponent } from './components/hospital-items-ds/hospital-items-ds.component';
import { HcDsComponent } from './components/hc-ds/hc-ds.component';
import { PolManagementComponent } from './components/pol-management/pol-management.component';
import { PolReceiveComponent } from './components/pol-receive/pol-receive.component';
import { PolAllotmentComponent } from './components/pol-allotment/pol-allotment.component';
import { PolDmdListComponent } from './components/pol-dmd-list/pol-dmd-list.component';
import { FooterComponent } from './common/footer/footer.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { UserPermissionComponent } from './components/user-permission/user-permission.component';
import { UserAccessRightComponent } from './components/user-access-right/user-access-right.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { PackingMaterialComponent } from './components/packing-material/packing-material.component';
import { UnitOfMeasureComponent } from './components/unit-of-measure/unit-of-measure.component';
import { SMUserComponent } from './components/smuser/smuser.component';
import { SMSUserListComponent } from './components/smsuser-list/smsuser-list.component';
import { RrEntryComponent } from './components/rr-entry/rr-entry.component';
import { HospitalItemScaleComponent } from './components/hospital-item-scale/hospital-item-scale.component';
import { StockReportComponent } from './components/stock-report/stock-report.component';
import { ADCSetupComponent } from './components/adcsetup/adcsetup.component';
import { SsdStockPosnHeadComponent } from './components/ssd-stock-posn-head/ssd-stock-posn-head.component';
import { GatePassComponent } from './components/gate-pass/gate-pass.component';
import { AllReportsComponent } from './components/all-reports/all-reports.component';
import { RrPeopleEntryComponent } from './components/rr-people-entry/rr-people-entry.component';
import { PMDashBoardComponent } from './components/pmdash-board/pmdash-board.component';
import { PMStockComponent } from './components/pmstock/pmstock.component';
import { PMReceiveComponent } from './components/pmreceive/pmreceive.component';
import { PmAuctionComponent } from './components/pm-auction/pm-auction.component';
import { RrManagementComponent } from './components/rr-management/rr-management.component';
import { BusTicketRequestComponent } from './components/bus-ticket-request/bus-ticket-request.component';
import { RpGateComponent } from './components/rp-gate/rp-gate.component';
import { ReportsManagementComponent } from './components/reports-management/reports-management.component';
import { SupplyPlaceComponent } from './components/supply-place/supply-place.component';
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';
import { ContactorBillComponent } from './components/contactor-bill/contactor-bill.component';
import { StatementComponent } from './components/statement/statement.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
 

@NgModule({
  declarations: [
    AppComponent,
    Loader,
    TopmenuComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    ErrorComponent,
    UserComponent,
    LoginComponent,
    AlertComponent,
    RequestComponent,
    RequestListComponent,
    DashboardComponent,
    UserListComponent,
    HomeComponent,
    BusTicketComponent,
    STMSDashboardComponent,
    DryItemDemandComponent,
    SsdLoginComponent,
    DryItemDemandListComponent,
    DryRatDmdComponent,
    FreshRatDmdComponent,
    ButchryItemsDmdComponent,
    HeaderComponent,
    PolDmdComponent,
    HospitalItemsDmdComponent,
    HcDmdComponent,
    CondimentDmdComponent,
    ItemComponent,
    ItemTypeComponent,
    UnitComponent,
    ContactorComponent,
    UnitListComponent,
    DryItemDemandListComponent,
    ReceivedItemComponent,
    DistributionComponent,
    DryRatDsComponent,
    CondimentDsComponent,
    PolDsComponent,
    FreshRatDsComponent,
    ButchryItemsDsComponent,
    HospitalItemsDsComponent,
    HcDsComponent,
    PolManagementComponent,
    PolReceiveComponent,
    PolAllotmentComponent,
    PolDmdListComponent,
    FooterComponent,
    UserRoleComponent,
    UserPermissionComponent,
    UserAccessRightComponent,
    UserChangePasswordComponent,
    PackingMaterialComponent,
    UnitOfMeasureComponent,
    SMUserComponent,
    SMSUserListComponent,
    RrEntryComponent,
    HospitalItemScaleComponent,
    StockReportComponent,
    ADCSetupComponent,
    SsdStockPosnHeadComponent,
    GatePassComponent,
    AllReportsComponent,
    RrPeopleEntryComponent,
    PMDashBoardComponent,
    PMStockComponent,
    PMReceiveComponent,
    PmAuctionComponent,
    RrManagementComponent,
    BusTicketRequestComponent,
    RpGateComponent,
    ReportsManagementComponent,
    SupplyPlaceComponent,
    AdminReportsComponent,
    ContactorBillComponent,
    StatementComponent,
    UserProfileComponent,
   ],
  imports: [
    routing,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(),
    DataTableModule,
    HttpClientModule,
    NguiAutoCompleteModule,
    MainPipe
  ],
  providers: [AlertService, HttpHelper, MessageHelper, LocalStorageService, Loader, ToastrService, AuthGuard, AuthGuardService, HttpClient],

  bootstrap: [AppComponent]
})
export class AppModule { }
