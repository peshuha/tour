import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../../../service/observable-example/observable-example.service";
import {Subject, Subscription} from "rxjs";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit, OnDestroy{

  private subjectScope: Subject<string>| undefined
  private subj: Subscription| undefined

  constructor(
    private example: ObservableExampleService
  ) {
    this.subjectScope = this.example.getSubject()
  }

  ngOnInit(): void {

    if(this.subjectScope) {

      this.subj = this.subjectScope.subscribe((data) => {
        console.log("SettingsComponent::subscribe", data)
      })

      // Отправляем сообщение
      this.subjectScope.next("Hello from Settings")
    }
  }

  ngOnDestroy(): void {
    if(this.subj) {
      this.subj.unsubscribe()
      this.subj = undefined
    }
  }
}
