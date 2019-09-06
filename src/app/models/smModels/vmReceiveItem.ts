import { ReceiveItem } from "./receiveItem";
import { ReceiveItemDetail } from "./receiveItemDetail";

export class VMReceiveItem {
    ReceiveItem: ReceiveItem = new ReceiveItem();
    lstReceiveItemDetail:ReceiveItemDetail[] = new Array<ReceiveItemDetail>();
}