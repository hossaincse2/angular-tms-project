import { ChangeDetectionStrategy } from "@angular/core";

export class CondimentDemand {
    CondimentDemandID: number;
    ToSSDID: number;
    SupplyPlaceID: number;
    FromUnitID: number;
    UnitName: string;    
    DemandDate: Date;
    ReceivingDate:Date;
    LastDemandDate:Date;
    LastDemandNumber:string;
    FromDate: Date;
    ToDate: Date;
    TotalDays: number;
    NumberOfPeople: number;
    Status: number;
    StatusName: string;
    showApproval: boolean = false;
    DemandTypeName: string;
    DemandTypeID: number;
    SupplyPlaceName: string;
}