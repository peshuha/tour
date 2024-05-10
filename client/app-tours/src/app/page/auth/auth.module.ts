import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {AuthComponent} from "./auth.component";
import {TabViewModule} from "primeng/tabview";
import {RegisterComponent} from "./component/register/register.component";
import {SignComponent} from "./component/sign/sign.component";
import {FormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    SignComponent
  ],
    imports: [
        AuthRoutingModule,
        CommonModule,
        AuthRoutingModule,
        TabViewModule,
        FormsModule,
        ToastModule
    ],
    exports: [
        AuthRoutingModule
    ]
})
export class AuthModule { }
