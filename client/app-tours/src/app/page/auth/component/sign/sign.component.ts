import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "@tour/lib-auth";
import {MessageService} from "primeng/api";

@Component({
  selector: 'sb-sign',
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss'
})
export class SignComponent implements OnInit{
  login: string | null = "";
  password: string | null = "";
  card: string | null = "";
  has_card = false;
  error_message: string = "";
  save_login = false

  constructor(
    private authService: AuthService,
    private msgService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.login = this.authService.GetLogin()
  }

  OnClick() {
    this.error_message = ""
    try {
      this.authService.Authorize(this.login, this.password, this.save_login)
      this.msgService.add({ severity: 'success', summary: 'Успешно!', detail: `Добро пожаловать, ${this.login}`})
      this.router.navigate(["tours"])
    }
    // @ts-ignore
    catch (e: Error) {
      this.msgService.add({ severity: 'error', summary: 'Error!', detail: e.message})
      this.error_message = e.message
    }
  }
}
