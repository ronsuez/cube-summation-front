import  {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {

  private base = 'http://localhost:3000/api/cube';

  constructor(private http: Http) {};

  createCube(params) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.base, params, options)
    .toPromise()
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
  }

  getCubes(params) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.base, options)
    .toPromise()
    .then((resp) => resp.json())
    .catch((err) => console.log(err) );
  }

  updateCube(params) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      [this.base, params[0], 'update'].join('/'),
      {
        position: params.slice(1, params.length - 1),
        value: params.slice(4, params.length)
      },
      options)
    .toPromise()
    .then((resp) => resp.json())
    .catch((err) => console.log(err) );
  }


  queryCube(params) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(
      [this.base, params[0], 'query'].join('/'),
      {
        position: params.slice(1, params.length),
      },
      options)
    .toPromise()
    .then((resp) => resp.json())
    .catch((err) => console.log(err) );
  }


}
