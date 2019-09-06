export class VMStock {
    SSDID: number;
    ItemName: string;
    TypeName: string
    UnitOfMeasure: number;
    UnitOfMeasureName: string;
    YearlyAllotedQuantity: number;
    ADC: number;
    StockQuantity: number;
    HouMuchDayWillContinue: number;
    Remarks: string;
    TotalReceive: number = 0;
    DistributeQuantity: number = 0;
    Balance: number = 0;
    DateExchusted: Date;
    FreeADC: number;
    PaymentADC: number;

}