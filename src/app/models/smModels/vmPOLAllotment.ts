import { POLAllotment } from "./polAllotment";
import { POLAllotmentDetail } from "./polAllotmentDetail";

export class VMPOLAllotment {
    POLAllotment: POLAllotment = new POLAllotment();
    lstPOLAllotmentDetail: POLAllotmentDetail[] = new Array<POLAllotmentDetail>();
}