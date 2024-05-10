import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ToursRoutingModule } from './tours-routing.module';
import {AsideComponent} from "./component/aside/aside.component";
import {FooterComponent} from "./component/footer/footer.component";
import {HeaderComponent} from "./component/header/header.component";
import { ToursComponent } from './tours.component';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import { ToursListComponent } from './component/tours-list/tours-list.component';
import {TourRestService} from "./service/rest/tour-rest.service";
import {TourService} from "./service/tour/tour.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToursPipe } from './pipe/tours/tours.pipe';
import {DropdownModule} from "primeng/dropdown";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ItemsSelectorDirective} from "../../directive/items-selector.directive";
import { SettingsComponent } from './component/settings/settings.component';
import {SearchStringService} from "./service/search-string/search-string.service";
import { TourInfoComponent } from './component/module/tour-info/tour-info.component';
import {CalendarModule} from "primeng/calendar";
import {AuthInterceptor} from "../../interceptor/auth.interceptor";
import {TabViewModule} from "primeng/tabview";
import { PasswordChangerComponent } from './component/settings/component/password-changer/password-changer.component';
import { StatisticsComponent } from './component/settings/component/statistics/statistics.component';
import { PersonalInfoComponent } from './component/settings/component/personal-info/personal-info.component';
import {TourNearestRestService} from "./service/rest/tour-nearest-rest.service";
import {TourLocationRestService} from "./service/rest/tour-location-rest.service";
import {CarouselModule} from "primeng/carousel";
import {TreeTableModule} from "primeng/treetable";
import {OrderModule} from "./component/module/order/order.module";
import {TableModule} from "primeng/table";
import { NearestTourFinderComponent } from './component/nearest-tour-finder/nearest-tour-finder.component';


@NgModule({
  declarations: [
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    ToursComponent,
    ToursListComponent,
    ToursPipe,
    ItemsSelectorDirective,
    SettingsComponent,
    TourInfoComponent,
    PasswordChangerComponent,
    StatisticsComponent,
    PersonalInfoComponent,
    NearestTourFinderComponent
  ],
    imports: [
        CommonModule,
        ToursRoutingModule,
        MenubarModule,
        InputTextModule,
        FormsModule,
        DropdownModule,
        NgOptimizedImage,
        CalendarModule,
        TabViewModule,
        HttpClientModule,
        ReactiveFormsModule,
        CarouselModule,
        TreeTableModule,
        OrderModule,
        TableModule
    ],
  providers: [
    TourRestService,
    TourNearestRestService,
    TourLocationRestService,
    TourService,
    SearchStringService,
    {
      provide: HTTP_INTERCEPTORS, useClass:  AuthInterceptor, multi: true
    }
  ]
})
export class ToursModule {
}
