import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PersonService} from "../../../../../../service/person/person.service";
import {UserService} from "../../../../../../service/user/user.service";
import {map, tap} from "rxjs";
import {IPerson} from "../../../../../../model/iperson";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent implements OnInit{

  // Текущий юзер
  person: IPerson | undefined

  // Ссылка на форму
  form = new FormGroup({
    name: new FormControl(),
    last_name: new FormControl(),
    city: new FormControl(),
    birthday: new FormControl(),
    age: new FormControl(),
    card: new FormControl()
  })

  constructor(
    private psn: PersonService,
    private usr: UserService
  ) {
  }

  ngOnInit(): void {

    // Подписываемся на получение извне
    this.psn.getPerson(this.usr.getUser()?.login).pipe(
      map(p => {
        return {
          person: p,
          name: p?.FirstName,
          last_name: p?.LastName,
          city: p?.City,
          birthday: p?.Birthday,
          age: p?.Age,
          card: p?.CardNum
        }
      })
    ).subscribe((p) => {
      this.person = p.person
      this.form.patchValue(p)
    })

    // Подписываемся на изменения внутри формы
  }

  OnSave() {

    let p = this.person || <IPerson>{login: this.usr.getUser()?.login}

    // Сохраняем
    const v = this.form.value
    this.psn.savePerson({
      ...p,
      Age: v.age,
      FirstName: v.name,
      LastName: v.last_name,
      Birthday: v.birthday,
      CardNum: v.card,
      City: v.city
    })
  }
}
