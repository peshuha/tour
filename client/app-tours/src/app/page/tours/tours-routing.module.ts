import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToursComponent} from "./tours.component";
import {ToursListComponent} from "./component/tours-list/tours-list.component";
import {SettingsComponent} from "./component/settings/settings.component";
import {OrderComponent} from "./component/module/order/order.component";
import {NearestTourFinderComponent} from "./component/nearest-tour-finder/nearest-tour-finder.component";

const routes: Routes = [
  {
    path: '', component:ToursComponent,
    title: "Продажа туров",
    children: [
      {
        path: "tour/:id",
        title: "Детальная инфо о туре",
        // pathMatch: "full"
        loadChildren: () => import("./component/module/tour-info/tour-info.module").then(m => m.TourInfoModule)
      },
      {
        path: "tours-list", component: ToursListComponent,
        title: "Внимание распродажа!",
        // pathMatch: "full",
        data: {
          aside: true
        }
      },
      {
        path: "nearest-tour", component: NearestTourFinderComponent,
        title: "Серверный поиск туров",
      },
      {
        path: "orders", component: OrderComponent,
        title: "Здесь у нас заказы!",
      },
      {
        path: "settings", component: SettingsComponent,
        title: "Подкрутим установки! ;)",
      }
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToursRoutingModule { }
