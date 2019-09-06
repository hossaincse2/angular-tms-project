export enum RecordStatus {
  Active = 1,
  Inactive = 2,
  Deleted = 3
}

export enum ResponseStatus {
  success = 1,
  fail = 2,
  duplicate = 3,
}

export enum UserStatus {
  Register = 1,
  Active = 2,
  Inactive = 3,
}

export enum AdminUser {
  Ocssd = "ocssd_taif",
}

export const DUE_TYPE: any[] =
  [
    { "id": "1", "name": "Customer" },
    { "id": "2", "name": "Supplier" },
  ];
export const RequestStatus: any[] =
  [
    { "id": 1, "name": "Requested" },
    { "id": 2, "name": "Unit Approved" },
    { "id": 3, "name": "HQ Approved" },
    { "id": 4, "name": "STO Approved" },
    { "id": 5, "name": "Unit Rejected" },
    { "id": 6, "name": "HQ Rejected" },
    { "id": 7, "name": "STO Rejected" },

  ];

export const DemandStatus: any[] =
  [
    { "id": 1, "name": "Requested" },
    { "id": 2, "name": "Unit Approved" },
    { "id": 3, "name": "SSD Approved" },
    { "id": 4, "name": "OC SSD Approved" },
    { "id": 5, "name": "Distributed" },
  ];

export const RRStatus: any[] =
  [
    { "id": 1, "name": "Created" },
    { "id": 2, "name": "Unit Approved" },
    { "id": 3, "name": "SSD Approved" },
  ];

export const BusTicketRejectReason: any[] =
  [
    { "id": 1, "name": "Seat Not available" },
    { "id": 2, "name": "Other" },
  ];

export const TicketStatus: any[] =
  [
    { "id": 1, "name": "Requested" },
    { "id": 2, "name": "Approved" },
    { "id": 3, "name": "Rejected" },
  ];


export const GatePassStatus: any[] =
  [
    { "id": 1, "name": "Generated" },
    { "id": 2, "name": "Passed" },
  ];


export const ResourceType: any[] =
  [
    { "id": 1, "name": "Officer" },
    { "id": 2, "name": "General Soldier" },
    { "id": 3, "name": "GCO" },
    { "id": 4, "name": "OR" },
    { "id": 5, "name": "NCE" },
    { "id": 6, "name": "Non Goverment People" },
  ];

  export const RequestType: any[] =
  [
    { "id": 1, "name": "Admin/OPS" },
    { "id": 2, "name": "On Payment" },
    { "id": 3, "name": "Normal Payment" },
    { "id": 4, "name": "Group Aminity" },
    { "id": 5, "name": "Free Aminity" },   
  ];


export const FamilyType: any[] =
  [
    { "id": 1, "type": 1, "name": "অফিসার" },
    { "id": 2, "type": 1, "name": "জেসিও" },
    { "id": 3, "type": 1, "name": "ওআর" },
    { "id": 4, "type": 1, "name": "এনসি(ই)" },
    { "id": 5, "type": 1, "name": "অসামরিক" },
    { "id": 6, "type": 2, "name": "জেসিও" },
    { "id": 7, "type": 2, "name": "ওআর" },
    { "id": 7, "type": 2, "name": "এনসি(ই)" },
  ];

export const AllotmentType: any[] =
  [
    { "id": 1, "name": "প্রশাসনিক" },
    { "id": 2, "name": "প্রশিক্ষণ" },
    { "id": 3, "name": "অপারেশন" },
    { "id": 4, "name": "অন্যান্য" },
  ];


export const ReportCategory: any[] =
  [
    { "id": 1, "name": "Ration" },
    { "id": 2, "name": "P.M" },
    { "id": 3, "name": "H & C" },
    { "id": 4, "name": "Hospital Comports" },
    { "id": 5, "name": "Fresh" },
    { "id": 6, "name": "Butchery" },
    { "id": 7, "name": "Condiment" },
    { "id": 8, "name": "POL" },
    { "id": 9, "name": "Set Up List Data" },
    { "id": 10, "name": "Stock Reports" },
    { "id": 11, "name": "A.H.Q Report" },
  ];
export const ReportName: any[] =
  [
    { "id": 1, 'CategoryID': 1, "name": " Statement" },
    { "id": 3, 'CategoryID': 2, "name": "Statement" },
    { "id": 5, 'CategoryID': 3, "name": "Statement" },
    { "id": 6, 'CategoryID': 4, "name": "Statement" },
    { "id": 7, 'CategoryID': 5, "name": "Statement" },
    { "id": 10, 'CategoryID': 6, "name": "Statement" },
    { "id": 13, 'CategoryID': 7, "name": "Statement" },
    { "id": 16, 'CategoryID': 8, "name": "F.D.U Summary" },
    { "id": 17, 'CategoryID': 8, "name": "Statment" },
    { "id": 18, 'CategoryID': 8, "name": "Contractor Bill" },
    { "id": 19, 'CategoryID': 9, "name": "A.D.C Price Set Up Yearly" },
    { "id": 20, 'CategoryID': 9, "name": "Monthly Snk Mess manpower state" },
    { "id": 21, 'CategoryID': 10, "name": "Monthly K-2 Amount Report" },
    { "id": 22, 'CategoryID': 10, "name": "Monthly Fesh+ Butchery Bill Report" },
    { "id": 23, 'CategoryID': 10, "name": "Monthly Condiment Bill Report" },
    { "id": 24, 'CategoryID': 10, "name": "Weekly Stock Possition" },
  ];

export const DemandItemType: any[] =
  [
    { "id": 1, "name": "Dry Item" },
    { "id": 2, "name": "Condiment" },
    { "id": 3, "name": "POL" },
    { "id": 4, "name": "Fresh Item" },
    { "id": 5, "name": "Butchery Item" },
    { "id": 6, "name": "Hospital Comports" },
    { "id": 7, "name": "Hygiene & Chemical" },
  ];

export const SSDList: any[] =
  [
    { "id": 1, "name": "BSD Dhaka" },
    { "id": 2, "name": "BSD CTG" },
    { "id": 3, "name": "BSD Jessore" },
    { "id": 4, "name": "SSD Ghatail" },
    { "id": 5, "name": "SSD Saver" },
    { "id": 6, "name": "SSD Comilla" },
    { "id": 7, "name": "SSD Bogra" },
    { "id": 8, "name": "SSD Rangpur" },

  ];
export const DemandType: any[] =
  [
    { "id": 1, "name": "বিনামূল্যে বিতরণের চাহিদা পএ" },
    { "id": 2, "name": "সাধারণ দরে চাহিদা পএ" },
    { "id": 3, "name": "ভর্তুকি দরে চাহিদা পএ" },

  ];


export const MaterialsType: any[] =
  [
    { "id": 1, "name": "বস্তা ৭৫ কেজি  পাট" },
    { "id": 2, "name": "বস্তা ৫০ কেজি  পাট" },
    { "id": 3, "name": "বস্তা ৩০ কেজি  পাট" },
    { "id": 4, "name": "বস্তা ৫০ কেজি  নাই" },
    { "id": 5, "name": "বস্তা ২৫ কেজি  নাই" },
    { "id": 6, "name": "বস্তা ২৫ কেজি  কাগজ" },
    { "id": 7, "name": "বস্তা ১৫ কেজি  কাগজ" },
    { "id": 8, "name": "বস্তা ১০ কেজি  কাগজ" },
    { "id": 9, "name": "বস্তা ২৫ কেজি  পলিঃ" },
    { "id": 10, "name": "বস্তা ১৫ কেজি  পলিঃ" },
    { "id": 11, "name": "বস্তা ১০ কেজি  পলিঃ" },
    { "id": 12, "name": " কাৰ্টুন সিবি " },
    { "id": 13, "name": "ক্যান প্লাস্টিক ৪.৫ কেজি" },
    { "id": 14, "name": " টি আর  ক্যান ৪.৫কেজি " },
    { "id": 15, "name": "বোতল ১ লিঃ প্লাসঃ" },
    { "id": 16, "name": "বোতল অব কাঁচ ৪০০/৫০০গ্রাম" },
    { "id": 17, "name": "বোতল অব কাঁচ ১ লিঃ" },
    { "id": 18, "name": "৫ লিঃ প্লাস্টিক ক্যান" },
    { "id": 19, "name": " ২৫/৩০ লিঃ প্লাস্টিক ড্রাম" },
    { "id": 20, "name": "৪০/৪৫ লিঃ প্লাস্টিক ড্রাম" },
    { "id": 21, "name": "২০/২৫ কেজি  টিন " },

  ];
export const UnitOfMeasure: any[] =
  [
    { "id": 1, "name": "GM" },
    { "id": 2, "name": "KG" },
    { "id": 3, "name": "Metric Ton" },
    { "id": 4, "name": "ML" },
    { "id": 5, "name": "Litter" },
    { "id": 6, "name": "Gallon" },
    { "id": 7, "name": "Piece" },
    { "id": 8, "name": "Ounce" },
  ];

export const Years: any[] =
  [
    { "id": 2018, "name": "2018" },
    { "id": 2019, "name": "2019" },
    { "id": 2020, "name": "2020" },
    { "id": 2021, "name": "2021" },
    { "id": 2022, "name": "2022" },
    { "id": 2023, "name": "2023" },
  ];

export const WeekDays: any[] =
  [
    { "id": 0, "name": "Sunday" },
    { "id": 1, "name": "Monday" },
    { "id": 2, "name": "Tuesday" },
    { "id": 3, "name": "Wednesday" },
    { "id": 4, "name": "Thursday" },
    { "id": 5, "name": "Friday" },
    { "id": 6, "name": "Saturday" },
  ];

export const MesurementUnits: any[] =
  [
    { "id": 1, "name": "Gram" },
    { "id": 2, "name": "KG" },
    { "id": 3, "name": "Piece" },
    { "id": 4, "name": "ml" },
    { "id": 5, "name": "Litter" },
  ];
export const Months: any[] =
  [
    { "id": 1, "name": "January" },
    { "id": 2, "name": "February" },
    { "id": 3, "name": "March" },
    { "id": 4, "name": "April" },
    { "id": 5, "name": "May" },
    { "id": 6, "name": "June" },
    { "id": 7, "name": "July" },
    { "id": 8, "name": "Auguest" },
    { "id": 9, "name": "September" },
    { "id": 10, "name": "Octbar" },
    { "id": 11, "name": "November" },
    { "id": 12, "name": "December" },
  ];



export const USER_TYPES: any[] =
  [
    { "id": 1, "name": "TMS" },
    { "id": 2, "name": "SMS" },
  ];
export const POL_RECEIVESTATUS: any[] =
  [
    { "id": 1, "name": "Received" },
    { "id": 2, "name": "Approved" },
  ];



export const DELIVERY_METHOD: any[] =
  [
    { "id": "1", "name": "Average" },
    { "id": "2", "name": "IFFO" },
    { "id": "2", "name": "LIFO" },
  ];
export const USER_STATUS: any[] =
  [
    { "id": "1", "name": "Active" },
    { "id": "2", "name": "Inactive" },
    { "id": "3", "name": "Deleted" }
  ];


export const CANCEL_REASON: any[] =
  [
    { "id": 1, "name": "Out of Range" },
    { "id": 2, "name": "Lay of Day" },
    { "id": 3, "name": "Invalid Date Selection" },
    { "id": 4, "name": "Inappropriate Vehicle Selection" },
    { "id": 5, "name": "Already used by another unit" },
    { "id": 6, "name": "Other Reason" },
  ];




export const TMS_USER_LEVEL: any[] =
  [
    { "id": 1, "name": "Officer" },
    { "id": 2, "name": "Unit Authority" },
    { "id": 3, "name": "HQ Authority" },
    { "id": 4, "name": "STO" },
  ];

export const SMS_USER_LEVEL: any[] =
  [
    { "id": 1, "name": "QM/MTO Clark" }, //"preparar"
    { "id": 2, "name": "QM" }, //unit approvar
    { "id": 3, "name": "MTO" }, //unit approvar
    { "id": 4, "name": "DAA & QMG" }, //unit approvar
    { "id": 5, "name": "CO/OC" }, //unit approvar  
    { "id": 6, "name": "Admin" },
    { "id": 7, "name": "OC SSD" },
    { "id": 8, "name": "Distributor" },
    { "id": 9, "name": "Gate In Charge" },
    { "id": 10, "name": "POL Admin" },
  ];

export const BUSTYPE: any[] =
  [
    { "id": "1", "name": "AC Bus" },
    { "id": "2", "name": "Non AC Bus" },
    { "id": "3", "name": "Coaster" }
  ];


export const ContractType: any[] =
  [
    { "id": "1", "name": "Fresh Item Potato" },
    { "id": "2", "name": "Fresh Item Onion" },
    { "id": "3", "name": "Fresh Item Vegetable" },
    { "id": "4", "name": "Fresh Item Fruits" },
    { "id": "5", "name": "Butchery Item Mutton " },
    { "id": "6", "name": "Butchery Item Beef Live " },
    { "id": "7", "name": "Butchery Item Beef Frozen " },
    { "id": "8", "name": "Butchery Item Egg" },
    { "id": "9", "name": "Butchery Item Chicken Live " },
    { "id": "10", "name": "Butchery Item Chicken Dressed" },
    { "id": "11", "name": "Butchery Item Chicken Dressed Frozen" },
    { "id": "12", "name": "Butchery Item Fish" },
    { "id": "13", "name": "Bread and Ice" },
    { "id": "14", "name": "Bread Soinik Mess" },
    { "id": "15", "name": "Bread CMH" },
    { "id": "16", "name": "Condiment" },
  ];



export const ContractorStatus: any[] =
  [
    { "id": "1", "name": "Active" },
    { "id": "2", "name": "Inactive" },
  ];

export const PAYMENT_METHOD: any[] =
  [
    { "id": "1", "name": "Cash" },
    { "id": "2", "name": "Bank" },
    { "id": "3", "name": "All" }
  ];
export const BANK_ACCOUNT_TYPE: any[] =
  [
    { "id": "1", "name": "Saving" },
    { "id": "2", "name": "Current" },
    { "id": "3", "name": "LC" }
  ];

export const GROUP_NAME: any[] =
  [
    { "id": "1", "name": "Security" },
    { "id": "2", "name": "Setting" },
    { "id": "3", "name": "Super Shop" },
    { "id": "4", "name": "Sales Management" },
    { "id": "5", "name": "Purchase Management" },
    { "id": "6", "name": "Account" },
    { "id": "7", "name": "Warehouse" },
    { "id": "8", "name": "Report" },
  ];


export const ContractorName: any[] =
  [
    { "id": "1", "name": "Mrs Nila Traders" },
    { "id": "2", "name": "Mrs Khan Traders" },
  ];

export const ItemStockName: any[] =
  [
    { "id": "1", "name": "Jeli" },
    { "id": "2", "name": "Fruits" },
  ];



export enum GroupName {
  Security = 1,
  Setting = 2,
  SuperShop = 3,
  SalesManagement = 4,
  PurchaseManagement = 5,
  Account = 6,
  Warehouse = 7,
  Report = 8
}
