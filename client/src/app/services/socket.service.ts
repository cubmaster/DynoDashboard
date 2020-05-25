import {Injectable, OnDestroy} from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {Observable, Observer, of, Subject} from 'rxjs';
import {delay, filter, map, retryWhen, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService  {

  constructor() { }




  public connect(url):  Observable<any> {
      return  webSocket(url).asObservable();
  }


}
