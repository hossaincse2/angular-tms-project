import { PMAuction } from "./pmAuction";
import { PMAuctionDetail } from "./pmAuctionDetail";

export class VMPMAuction {
    PMAuction: PMAuction = new PMAuction();
    lstPMAuctionDetail: PMAuctionDetail[] = new Array<PMAuctionDetail>();
}