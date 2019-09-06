import { POLReceive } from "./POLReceive";
import { POLReceiveDetail } from "./POLReceiveDetail";

export class VMPOLReceive {
    POLReceive: POLReceive;
    lstPOLReceiveDetail: POLReceiveDetail[] = new Array<POLReceiveDetail>();
}