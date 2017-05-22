import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  templateUrl: './app/users/user-detail/user-detail.component.html'
})

export class UserDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
  this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .do(x => console.log(x))
      .subscribe(users => this.user = users[0]);
  }

  goBack(): void {
    this.location.back();
  }
}
