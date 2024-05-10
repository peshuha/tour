import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {NearestTourRestService} from "../../../../service/rest/nearest-tour-rest/nearest-tour-rest.service";
import {INearestTour} from "../../../../service/rest/nearest-tour-rest/model/inearest-tour";

@Component({
  selector: 'app-nearest-tour-finder',
  templateUrl: './nearest-tour-finder.component.html',
  styleUrl: './nearest-tour-finder.component.scss'
})
export class NearestTourFinderComponent implements AfterViewInit, OnDestroy {

  @ViewChild("el") el: ElementRef | undefined
  subKeyUp: Subscription | undefined
  subRest: Subscription | undefined

  search_string = ""
  tour: INearestTour | undefined

  constructor(
    private rest: NearestTourRestService
  ) {
  }

  ngAfterViewInit(): void {
    console.log("NearestTourFinderComponent", this.el)
    this.subKeyUp = fromEvent(this.el?.nativeElement, "keyup").subscribe((event) => {
      console.log("fromEvent")
      this.Reload()
    })
  }
  ngOnDestroy(): void {
    this.subKeyUp?.unsubscribe()
    this.subRest?.unsubscribe()
  }

  Reload() {

    // Если текущий еще не успел отработать, прерываем его
    if(this.subRest) {
      this.subRest.unsubscribe()
      this.subRest = undefined
    }

    // Если основной запрос закрыт, то и не фиг
    if(this.subKeyUp?.closed)
      return

    // Получаем ближайший
    const idx = Math.floor(Math.random() * 3)
    this.subRest = this.rest.getNearestTour(idx).subscribe((tour) => {
      this.tour = tour
    })
  }


}
