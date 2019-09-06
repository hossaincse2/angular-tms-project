import { Component, Input } from '@angular/core';
@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
})
export class Loader{
    @Input('spinner-text')  spinnerText: string = 'loading please wait...';
    @Input('spinner-imageUrl') spinnerImageUrl: string = './assets/image/spinner.gif';
    static spinnerCanShow:boolean;

    show()
    {
      Loader.spinnerCanShow=true;
    }
    hide()
    {
      Loader.spinnerCanShow=false;
    }
    get staticSpinnerCanShow() {
        return Loader.spinnerCanShow;
      }

}
