import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./guard/auth.guard";
import {NotFoundComponent} from "./page/not-found/not-found.component";

const routes: Routes = [
  {
    path: "tours"
    , loadChildren: () => import("./page/tours/tours.module").then(m => m.ToursModule)
    , canActivate: [authGuard]
  },
  {
    path: "auth", loadChildren: () => import("./page/auth/auth.module").then(m => {
      console.log("m.AuthModule load")
      return m.AuthModule
    })
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "tours",
    title: "Tour Application"
   },
  {
    path: "unknown", component: NotFoundComponent
  },
  {
    path: "**", redirectTo: "unknown", pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
