"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("./shared/services/user.service");
var pager_service_1 = require("./shared/services/pager.service");
var AppComponent = (function () {
    function AppComponent(service, pagerService) {
        this.service = service;
        this.pagerService = pagerService;
        // pager object
        this.pager = {};
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getUsers()
            .subscribe(function (users) {
            _this.users = users;
            _this.setPage(1);
        });
    };
    AppComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.users.length, page);
        // get current page of items
        this.pagedUsers = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        providers: [pager_service_1.PagerService],
        template: "<router-outlet></router-outlet> "
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, pager_service_1.PagerService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map