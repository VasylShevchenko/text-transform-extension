import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AlertComponent
    ],
    entryComponents: [
        AlertComponent
    ],
    providers: [
        AlertService
    ],
    exports: [
        AlertComponent
    ]
})
export class AlertModule {  }
