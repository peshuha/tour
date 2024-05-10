import {Component, OnInit} from '@angular/core';
import {StatisticService} from "../../../../../../service/statistic/statistic.service";
import {ICustomStatisticUser} from "../../../../../../service/statistic/model/icustom-statistic-user";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit{

  dt: ICustomStatisticUser[] | undefined

  constructor(
    private statistic: StatisticService
  ) {
  }

  ngOnInit(): void {
    this.statistic.getStatistic().subscribe(
      (dt) => this.dt = dt
    )
  }


}
