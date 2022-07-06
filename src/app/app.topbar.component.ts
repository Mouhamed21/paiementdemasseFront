import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import {KeycloakService} from "keycloak-angular";
import {UserServiceService} from "./service/userService/user-service.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss'],
})
export class AppTopBarComponent {
    user : any;
    users:any;
    email:any;
    items: MenuItem[];

    constructor(public appMain: AppMainComponent,
                private userService: UserServiceService,
                public keycloak: KeycloakService) {
        this.keycloak.loadUserProfile().then( res =>
        {
            console.log(res);
            this.users = res;
            this.email= res.email;
            console.log(res.email);
            this.getStructure(res.email);

        });
    }
    public getStructure(email){
        console.log(email);
        return this.userService.getUserByEmail(email).subscribe(data =>
        {
            console.log(data);
            this.user = data;
        })
    }
    public deconnexion()
    {
        //console.log("fggh");
        return this.keycloak.logout();
    }
}
