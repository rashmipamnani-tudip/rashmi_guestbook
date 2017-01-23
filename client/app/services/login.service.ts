import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class loginService {

    constructor(private _http: Http) { }
    
    verifyUser(myuser) {
        var headers = new Headers();
        console.log("Here we are...");
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/find', JSON.stringify(myuser), { headers: headers })
            .map(res => res.json());
    }
}
