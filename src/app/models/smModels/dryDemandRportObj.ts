export class DryDemandRportObj
{
    DryItemDemandID: number;
    DemandDate: number;
    DemandTypeID: number;
    DemandTypeName: string;
    SupplyPlace: number;
    OtherSupplyPlaceName: string;
    FromUnitID: number;
    UnitName: string;
    ToSSDID: number;  
    GeneralSendReference: string;
    EmergencyDate: Date;
    FoodDemandDate: Date;
    DemandFrom: Date;
    DemandTo: Date;
    PradikarDescription: string;
    Status: number;
    StatusName: string;
    CreatedBy: string;
    CreatedDate: number;
    UpdatedBy: string;
    UpdatedDate: number;
    ApprovedBy: string;
    ApprovedDate: number;
    ApproverSign:string;
    showApproval: boolean;  
    PreviousPradikarNo: string;
    PreviousDemandDate: Date;
    totalDay: number;
    totalResource: number;
    netResource: number
    bellow3ChildTotal: number;
    netChildTotal: number;
    AutogeneratedNumber: string;
}