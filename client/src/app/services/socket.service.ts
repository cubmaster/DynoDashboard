import {Injectable, OnDestroy} from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {combineLatest, merge, Observable, Observer, of, Subject} from 'rxjs';
import {combineAll, concatAll, map, mergeAll, mergeMap, multicast, retry, share} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketService  {
  private weather$: Observable<any>;
  constructor() { }
  public Socket: WebSocketSubject<any> = null;

  public hooks: Map<string, Observable<any> >  = new Map<string, Observable<any> >();

  public data: Observable<any> = new Observable<any>()  ;
  private stocks$: Observable<any>;

  public connect(url): Observable<any> {
      this.Socket =  webSocket(url);
      return this.Socket.asObservable();
  }


  public getData(obj: any)
  {

    return this.Socket.multiplex(
      () => (obj),
      () => ({unsubscribe: obj.Command}),
      message => message.MessageType ===  obj.Command

    );

  }


}
