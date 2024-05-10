import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../service/order.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {TreeNode} from "primeng/api";
import {IOrder} from "../../../../../../model/iorder";

@Component({
  selector: 'app-order-body',
  templateUrl: './order-body.component.html',
  styleUrl: './order-body.component.scss'
})
export class OrderBodyComponent implements OnInit, OnDestroy{

  private _destroy = new Subject<boolean>
  dt$: Observable<TreeNode<IOrder>[]> | undefined

  constructor(
    private order: OrderService
  ) {
  }

  ngOnInit(): void {
    this.Reload()
    this.order.rx$.subscribe(() => {
      console.log("order.getOrders$().subscribe")
      this.Reload()
    })
  }

  ngOnDestroy(): void {
    this._destroy.next(true)
    this._destroy.complete()
  }

  private Reload() {
    this.dt$ = this.order.getData$()
  }
}
