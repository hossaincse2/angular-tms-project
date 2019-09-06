export class HospitalItemDemand {
  HospitalItemDemandID: number;
  DemandDate: Date;
  FromDate: Date;
  ToDate: Date;
  DemandTypeID: number;
  NumberOfPeople: number;
  FromUnitID: number;
  ToSSDID: number;
  SupplyPlaceID: number;
  GeneralSendReference: number;
  ApprovedBy: number;
  ApprovedDate: number;
  UnitName: string;
  Status: number;
  StatusName: string;
  showApproval: boolean = false;
}