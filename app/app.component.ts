import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';
import * as _ from 'underscore';
import { PagerService } from './shared/services/pager.service';

@Component({
  selector: 'my-app',
  providers: [PagerService],
  template: `<router-outlet></router-outlet> `
})
export class AppComponent implements OnInit {
  users: User[];

  // pager object
  pager: any = {};

  // paged items
  pagedUsers: any[];

  constructor(private service: UserService, private pagerService: PagerService) {}

  ngOnInit() {

    this.service.getUsers()
      .subscribe(
        users => {
          this.users = users;
          this.setPage(1);
        }
      );
  }

  setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }

      // get pager object from service
      this.pager = this.pagerService.getPager(this.users.length, page);

      // get current page of items
      this.pagedUsers = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
