import  {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppService {

  private base = 'http://localhost:3000/api/cube';

  constructor(private http: Http) {};

  createCube(params) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.base, params, options)
      .map((resp) => resp.json())
      .catch((err) => Promise.reject(err))
  }

  getCubes(params) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.base, options)
      .map((resp) => resp.json())
      .catch((err) => Promise.reject(err))
  }


}
