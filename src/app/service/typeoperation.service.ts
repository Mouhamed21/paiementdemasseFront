import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Typeoperation} from "../modele/typeoperation";

@Injectable({
  providedIn: 'root'
})
export class TypeoperationService {

    baseUrl = environment.urlApi;

    constructor(private httpClient: HttpClient) { }
    httpOptions =
        {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/JSON',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
        };


    getTypeOperations() {
        return this.httpClient.get(this.baseUrl + '/typeOperations');
    }
    postTypeOperation(typeOperation:Typeoperation) {
        //debugger
        return this.httpClient.post(this.baseUrl + '/typeOperation', typeOperation)
    }
}
