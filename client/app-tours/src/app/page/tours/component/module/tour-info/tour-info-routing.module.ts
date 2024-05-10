import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TourInfoComponent} from "./tour-info.component";

const routes: Routes = [
  {
    path: "",
    component: TourInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourInfoRoutingModule { }
