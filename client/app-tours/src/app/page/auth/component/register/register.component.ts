import {Component, OnInit} from '@angular/core';
import {AuthService} from "@tour/lib-auth";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'sb-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private msgService: MessageService,
    private router: Router
  ) {
  }

  login = "";
  password = "";
  email = "";
  save: boolean = false;
  error_message = "";

  ngOnInit(): void {
    this.login = this.auth.GetLogin() || "";
  }

  OnRegister() {
    try {
      this.auth.Register(this.login, this.password, this.email, this.save)
      this.msgService.add({ severity: 'success', summary: 'Успешно Зарегистрирован!', detail: `Добро пожаловать, ${this.login}`})
      this.router.navigate(["tour"]).then()
    }
    catch (e: any) {
      this.error_message = e
      this.msgService.add({ severity: 'error', summary: e, detail: 'Ошибочкос'})
    }
  }
}
