import {Injectable, OnDestroy} from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {combineLatest, merge, Observable, Observer, of, Subject} from 'rxjs';
import {combineAll, concatAll, map, mergeAll, mergeMap, multicast, retry, share} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketService  {

  constructor() { }
  public Socket: WebSocketSubject<any> = null;

  private  CHAT_URL = 'ws://localhost:5000/ws';
  public connect(): Observable<any>
  {
    return webSocket(this.CHAT_URL).asObservable();
  }
  public getData( obj: any)
  {

    return webSocket(this.CHAT_URL).multiplex(
      () => (obj),
      () => ({unsubscribe: obj.Command}),
      (message: Message) => message.MessageType ===  obj.Command

    );

  }


}

export class Message{
  MessageType: string;
  Payload: object;
}
