import {Injectable} from '@angular/core';
import {IOrder, IOrderKey} from "../../../../../../model/iorder";
import {TreeNode} from "primeng/api";
import {MOCK_ORDERS} from "../../../../../../mock/orders";
import {BehaviorSubject, of, Subject, switchMap, withLatestFrom} from "rxjs";

export type IOrderFilter = {
    // Группируем ли вообще
    group_on: boolean,
    // Список полей группировки
    group_key: IOrderKey[]
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private filter = {
    // Группируем ли вообще
    group_on: false,
    // Список полей группировки
    group_key$: new BehaviorSubject<IOrderKey[]>([])
  }

  private rx = new Subject()
  readonly rx$ = this.rx.asObservable()


  //  = []
  tb: TreeNode<IOrder>[] = []

  // getGroupBy() {
  //   const mp: [{[key: IOrderKey]: string}] = [
  //     {"name": "Название"}
  //   ]
  // }

  // Управление фильтром
  filter_GroupOn(group_on: boolean) {
    this.filter.group_on = group_on
    this.rx.next(null)
  }

  filter_GroupBy(groupby: IOrderKey[]) {
    this.filter.group_key$.next(groupby)
    this.rx.next(null)
  }

    filter_Group(filter: IOrderFilter) {
        this.filter.group_on = filter.group_on
        this.filter.group_key$.next(filter.group_key)
        this.rx.next(null)
    }

  // Выдача итогового набора
  getData$() {
    return of(MOCK_ORDERS).pipe(
      withLatestFrom(this.filter.group_key$),
      switchMap(([ord, groups]) => {
        console.log("OrderService::getOrders.groups", groups)
        return of(this.BuildTree(ord, groups))
      })
    )
  }

  private BuildTree(ord: IOrder[], groupby?: IOrderKey[]): TreeNode<IOrder>[] {

    const tb = this.BuildTreeNoGroup(ord)
    if (!groupby || !groupby.length) {
      return tb
    }

    // Пока только верхний уровень
    return this.BuildTreeGroupBy(tb, groupby[0])
  }


  private BuildTreeGroupBy(tb: TreeNode<IOrder>[], groupby: IOrderKey[]): TreeNode<IOrder>[] {

    // console.log("OrderService::BuildTreeGroupBy", groupby, tb)
    let tb2: TreeNode<IOrder>[] = []
    tb.forEach(o => {

      const item = o.data

      // Находим узел с нашим свойством для группировки
      // @ts-ignore
      let node = tb2.find(el => el.data[groupby] === item[groupby])

      // Если нет такого, добавляем как узловой
      if(!node) {
        node = <TreeNode<IOrder>>{
          data: item,
          children: <TreeNode<IOrder>[]>[]
        }
        tb2.push((node))
      }
      else {
        node.children?.push(o)
      }
    })

    // console.log("OrderService::BuildTreeGroupBy - return ", tb2)
    return tb2
  }

  private BuildTreeNoGroup(ord: IOrder[]): TreeNode<IOrder>[] {

    let tb: TreeNode<IOrder>[] = []
    ord.forEach(o => {
      tb.push(<TreeNode<IOrder> >{
        data: o
      })
    })

    return tb
  }

}
