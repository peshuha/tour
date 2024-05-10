import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'sb-auth',
  templateUrl: './auth.component.html',
  styleUrls: [
    './auth.component.scss'
  ]
})
export class AuthComponent implements OnInit {

  activetab = "sign"
  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    try {
      this.activetab = this.router.snapshot.url[0].path
    }
    catch(e) {

    }
  }
}
