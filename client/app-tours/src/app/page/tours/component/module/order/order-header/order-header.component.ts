import { Component } from '@angular/core';
import {IOrderFilter, OrderService} from "../service/order.service";
import {CheckboxChangeEvent} from "primeng/checkbox";
import {IOrderKey} from "../../../../../../model/iorder";

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrl: './order-header.component.scss'
})
export class OrderHeaderComponent {
  group_on = false
  groupby_name = false
  groupby_type = false

  constructor(
    private orders: OrderService
  ) {
  }

  OnChange() {
    let filter = <IOrderFilter>{
      group_on: this.group_on,
        group_key: []
    }

    // Добавляем фильтры (пока в таком порядке)
    if(this.groupby_name)
      filter.group_key.push(<IOrderKey>"name")

    if(this.groupby_type)
      filter.group_key.push(<IOrderKey>"type")

      console.log("OnChange()::filter", filter)
    this.orders.filter_Group(filter)
  }

  filterGroupBy(groupby: string, $event: CheckboxChangeEvent) {
    this.orders.filter_GroupBy([<IOrderKey>groupby])
  }
}
