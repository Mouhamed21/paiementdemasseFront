import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

    baseUrl = environment.urlApi;
    constructor(private httpClient: HttpClient) { }

    getUserByEmail(email):Observable<any> {

        return this.httpClient.get(this.baseUrl + '/user/email/' + email);
    }

}
