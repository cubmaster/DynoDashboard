import {Injectable, OnDestroy} from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {Observable, Observer, of, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService  {
  constructor() { }
  public Socket: WebSocketSubject<any> = null;



  public  Stocks$: Observable<any>;

  public Weather$: Observable<any>;

  public connect(url): Observable<any> {
      this.Socket =  webSocket(url);
      this.Weather$ = this.Socket.multiplex(
      () => ({
        Command: 'Weather',
        Data:  ''
      }),
      () => ({unsubscribe: 'Weather'}),
      message => message.MessageType === 'Weather'
    );
      this.Stocks$ = this.Socket.multiplex(
          () => ({
            Command: 'Stock',
            Data:  'msft'
          }),
          () => ({unsubscribe: 'Stock'}),
          message => message.MessageType === 'Stock'
        );



      return this.Socket.asObservable();
  }



}
