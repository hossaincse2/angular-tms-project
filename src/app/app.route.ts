
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from "./components/user/user.component";
import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from "./components/error/error.component";
import { LoginLayoutComponent } from "./common/layout/loginlayout";
import { HomeLayoutComponent } from "./common/layout/homelayout";
import { AuthGuard } from "./common/auth/auth.guard";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { RequestComponent } from './components/request/request.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './components/home/home.component';
import { BusTicketComponent } from './components/bus-ticket/bus-ticket.component';
import { DryItemDemandComponent } from './components/unit-demand/unit-demand.component';
import { STMSDashboardComponent } from './components/stmsdashboard/stmsdashboard.component';
import { SsdLoginComponent } from './components/ssd-login/ssd-login.component';
import { DryItemDemandListComponent } from './components/unit-demand-list/unit-demand-list.component';
import { DryRatDmdComponent } from './components/dry-rat-dmd/dry-rat-dmd.component';
import { FreshRatDmdComponent } from './components/fresh-rat-dmd/fresh-rat-dmd.component';
import { ButchryItemsDmdComponent } from './components/butchry-items-dmd/butchry-items-dmd.component';
import { PolDmdComponent } from './components/pol-dmd/pol-dmd.component';
import { HospitalItemsDmdComponent } from './components/hospital-items-dmd/hospital-items-dmd.component';
import { CondimentDmdComponent } from './components/condiment-dmd/condiment-dmd.component';
import { HcDmdComponent } from './components/hc-dmd/hc-dmd.component';
import { UnitComponent } from './components/unit/unit.component';
import { ItemComponent } from './components/item/item.component';
import { ItemTypeComponent } from './components/item-type/item-type.component';
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
import { PolAllotmentComponent } from './components/pol-allotment/pol-allotment.component';
import { PolReceiveComponent } from './components/pol-receive/pol-receive.component';
import { PolDmdListComponent } from './components/pol-dmd-list/pol-dmd-list.component';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { UserPermissionComponent } from './components/user-permission/user-permission.component';
import { UserAccessRightComponent } from './components/user-access-right/user-access-right.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UnitOfMeasureComponent } from './components/unit-of-measure/unit-of-measure.component';
import { PackingMaterialComponent } from './components/packing-material/packing-material.component';
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
import { PMReceiveComponent } from './components/pmreceive/pmreceive.component';
import { PMStockComponent } from './components/pmstock/pmstock.component';
import { PMDashBoardComponent } from './components/pmdash-board/pmdash-board.component';
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

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'polManagement', component: PolManagementComponent },

  // { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'user', component: UserComponent },
      { path: 'smsLogin', component: SsdLoginComponent },
      { path: 'smuser', component: SMUserComponent },
      { path: 'home', component: HomeComponent },


      {
        path: '',
        canActivate: [AuthGuard],
        component: HomeLayoutComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'request', component: RequestComponent },
          { path: 'requestList', component: RequestListComponent },
          { path: 'userList', component: UserListComponent },
          { path: 'busTicket', component: BusTicketComponent },
          { path: 'smsDashboard', component: STMSDashboardComponent },
          { path: 'unitDemand', component: DryItemDemandComponent },
          { path: 'unitDemandList', component: DryItemDemandListComponent },
          { path: 'dryRatDmd', component: DryRatDmdComponent },
          { path: 'freshRatDmd', component: FreshRatDmdComponent },
          { path: 'butchryItemsDmd', component: ButchryItemsDmdComponent },
          { path: 'polDmd', component: PolDmdComponent },
          { path: 'hospitalItemsDmsd', component: HospitalItemsDmdComponent },
          { path: 'condimentDmd', component: CondimentDmdComponent },
          { path: 'hcDmd', component: HcDmdComponent },
          { path: 'unit', component: UnitComponent },
          { path: 'item', component: ItemComponent },
          { path: 'itemType', component: ItemTypeComponent },
          { path: 'contactor', component: ContactorComponent },
          { path: 'unitList', component: UnitListComponent },
          { path: 'receivedItem', component: ReceivedItemComponent },
          { path: 'distribution', component: DistributionComponent },
          { path: 'dryRatDs', component: DryRatDsComponent },
          { path: 'condimentDs', component: CondimentDsComponent },
          { path: 'polDs', component: PolDsComponent },
          { path: 'freshRatDs', component: FreshRatDsComponent },
          { path: 'butchryItemsDs', component: ButchryItemsDsComponent },
          { path: 'hospitalItemsDs', component: HospitalItemsDsComponent },
          { path: 'hcDs', component: HcDsComponent },
          { path: 'polAllotment', component: PolAllotmentComponent },
          { path: 'polReceive', component: PolReceiveComponent },
          { path: 'polDmdList', component: PolDmdListComponent },
          { path: 'userRole', component: UserRoleComponent },
          { path: 'userPermission', component: UserPermissionComponent },
          { path: 'userAccessRight', component: UserAccessRightComponent },
          { path: 'userChangePassword', component: UserChangePasswordComponent },
          { path: 'unitofMeasure', component: UnitOfMeasureComponent },
          { path: 'packingMatrial', component: PackingMaterialComponent },
          { path: 'smuserList', component: SMSUserListComponent },
          { path: 'rrEntry', component: RrEntryComponent },
          { path: 'hospitalItemScale', component: HospitalItemScaleComponent },
          { path: 'stockReport', component: StockReportComponent },
          { path: 'adcSetup', component: ADCSetupComponent },
          { path: 'ssdStockPossitionHead', component: SsdStockPosnHeadComponent },
          { path: 'getPass', component: GatePassComponent },
          { path: 'allReports', component: AllReportsComponent },
          { path: 'rrEntryPeople', component: RrPeopleEntryComponent },
          { path: 'pmReceive', component: PMReceiveComponent },
          { path: 'pmStock', component: PMStockComponent },
          { path: 'pmDashBoard', component: PMDashBoardComponent },
          { path: 'pmAuction', component: PmAuctionComponent },
          { path: 'rrManagement', component: RrManagementComponent },
          { path: 'busTicketRequest', component: BusTicketRequestComponent },
          { path: 'RpGate', component: RpGateComponent },
          { path: 'reportsManagement', component: ReportsManagementComponent },
          { path: 'supplyPlace', component: SupplyPlaceComponent },
          { path: 'adminReports', component: AdminReportsComponent },
          { path: 'contractorBill', component: ContactorBillComponent },
          { path: 'statement', component: StatementComponent },
          { path: 'userProfile', component: UserProfileComponent },
          { path: '**', component: ErrorComponent }
        ]
      }
    ]
  },
  { path: '**', component: ErrorComponent }
];
export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, { useHash: true,onSameUrlNavigation: 'reload' });
