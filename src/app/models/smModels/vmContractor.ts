import { Contactor } from "./Contactor";
import { ContractorItemDetail } from "./contactorItemDetail";

export class VMContractor {
    Contactor: Contactor = new Contactor();
    lstContractorItemDetail: ContractorItemDetail[] = new Array<ContractorItemDetail>();
}