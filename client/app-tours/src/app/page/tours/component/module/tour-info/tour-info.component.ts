import {Component, OnInit} from '@angular/core';
import {TourService} from "../../../service/tour/tour.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ITour} from "../../../../../model/itour";
import {forkJoin, Observable} from "rxjs";
import {TourNearestRestService} from "../../../service/rest/tour-nearest-rest.service";

export interface ITourCarousel {
  "id": string,
  "name": string,
  "description": string,
  "tourOperator": string,
  "price": string,
  "img": string,
  "type": string,
  "locationId": string
}

@Component({
  selector: 'app-tour-info',
  templateUrl: './tour-info.component.html',
  styleUrl: './tour-info.component.scss'
})
export class TourInfoComponent implements OnInit{

  tour: ITour | null | undefined
  dtTours: ITourCarousel[] = []

  constructor(
    private svcTours: TourService,
    private router: Router,
    private aroute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {

    const id = this.aroute.snapshot.paramMap.get("id")
    this.tour = this.svcTours.findTour(id)
    if(!this.tour) {
      this.router.navigate(["/unknown"])
    }

    // Подгружаем nearest
    forkJoin([this.svcTours.getToursNearest(), this.svcTours.getTourLocation()])
      .subscribe(dt => {

        let dtt: ITourCarousel[] = []
        dt[0].forEach(tn => {
          dtt.push(<ITourCarousel>tn)
        })
        this.dtTours = dtt
      }
    )
  }

}
