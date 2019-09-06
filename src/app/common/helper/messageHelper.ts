import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {ResponseStatus} from "../QSEnums";

@Injectable()
export class MessageHelper {
    options: GlobalConfig;
    constructor(private toastr: ToastrService) {
    }

    showMessage(code, message) {
        if (code == ResponseStatus.success) {
            this.toastr.success(message, 'STMS', this.options);
        }
        else if (code != null) {
            this.toastr.warning(message, 'STMS', this.options);
        }

    }
}
