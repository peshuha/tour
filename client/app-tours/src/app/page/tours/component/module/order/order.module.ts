import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import {SharedModule} from "primeng/api";
import {TreeTableModule} from "primeng/treetable";
import { OrderBodyComponent } from './order-body/order-body.component';
import { OrderHeaderComponent } from './order-header/order-header.component';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderComponent,
    OrderBodyComponent,
    OrderHeaderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    TreeTableModule,
    CheckboxModule,
    FormsModule
  ],
  providers: [
    OrderBodyComponent
  ]
})
export class OrderModule { }
