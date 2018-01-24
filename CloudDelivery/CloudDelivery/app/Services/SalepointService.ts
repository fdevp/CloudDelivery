import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { UserListItem } from '../Models/Users/UserListItem'
import { UserEditModel } from '../Models/Users/UserEditModel'
import { SessionService } from '../Services/SessionService'
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

@Injectable()
export class SalepointService {
    private sessionService: SessionService;

    constructor(private http: Http, private sessionServ: SessionService) {
        this.sessionService = sessionServ;
    }
    
}