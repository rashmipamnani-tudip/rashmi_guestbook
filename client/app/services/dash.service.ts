import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DashService{
   
    constructor(private _http:Http){
        
    }
    
    get_visitors(){
        return this._http.get('/api/visitors')
            .map(res => res.json());
    }
    
    save_visitors(visitor){
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/visitor/store', JSON.stringify(visitor), {headers: headers})
            .map(res => res.json());
    }
    
    /*update_visitor(todo){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/todo/'+todo._id, JSON.stringify(todo), {headers: headers})
            .map(res => res.json());
    }*/
    
   delete_visitor(id){
        return this._http.delete('/api/visitors/'+id)
            .map(res => res.json());
    }

    host_visitor(editdata){
                var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/visitors', JSON.stringify(editdata), {headers: headers})
            .map(res => res.json());
    }

}
