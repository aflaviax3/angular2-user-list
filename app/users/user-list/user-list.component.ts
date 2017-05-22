import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import * as _ from 'underscore';
import { PagerService } from '../../shared/services/pager.service';

@Component({
  templateUrl: './app/users/user-list/user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[];
  selectedUser: User;
  // pager object
  pager: any = {};

  // paged items
  pagedUsers: any[];

  constructor(private service: UserService, private pagerService: PagerService, private router: Router, private route: ActivatedRoute) { }

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

  gotoDetail(user: User) {
    this.selectedUser = user;
    this.router.navigate(['detail', this.selectedUser.name.first], {relativeTo: this.route});
  }
}
