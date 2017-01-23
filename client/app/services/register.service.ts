import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

    constructor(private _http: Http) { }

    addUser(recipt) {
        console.log("It reached here");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/user', JSON.stringify(recipt), { headers: headers })
            .map(res => res.json());
    }
}