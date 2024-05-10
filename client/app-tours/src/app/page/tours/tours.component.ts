import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuType} from "../../model/imenu-type";
import {LocalStorageService} from "@tour/lib-common";
import {ActivatedRoute, NavigationEnd, Router, Routes, Scroll} from "@angular/router";
import {Subscription, take} from "rxjs";

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit, OnDestroy {

  CONST_KEY_STORAGE_MNUTYPE = "_mnutype"
  sbjRoute: Subscription | undefined

  constructor(
    private localStorage: LocalStorageService,
    private route: Router,
    private aroute: ActivatedRoute
  ) {
  }

  mnuType: MenuType = "normal";
  search = ""
  is_aside = true;

  ngOnInit(): void {
    // Восстанавливаем установки
    this.mnuType = <MenuType>(this.localStorage.getItem(this.CONST_KEY_STORAGE_MNUTYPE) || "normal")

    // Подписываемся на изменение пути в роутере. Будем скрывать a-side
    this.route.events.subscribe((e) => {

      // console.log("ToursComponent::this.aroute.url", e);
      if(!(e instanceof Scroll)) {
        return
      }

      // console.log("ToursComponent::this.aroute.url", e, this.aroute.snapshot.firstChild?.data);
      this.is_aside = this.aroute.snapshot.firstChild?.data["aside"] || false;
    });
  }

  ngOnDestroy(): void {

    if(this.sbjRoute) {
      this.sbjRoute.unsubscribe()
    }
  }

  OnMenuTypeSelect(tp: MenuType) {
    this.mnuType = tp;
    this.localStorage.setItem(this.CONST_KEY_STORAGE_MNUTYPE, this.mnuType)
  }

  OnSearchChange(search: string) {
    this.search = search;
  }
}
