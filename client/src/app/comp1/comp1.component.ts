import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocketService} from '../services/socket.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {
 @Input() Input1: string = 'deafult1';
 @Output() OnChange: EventEmitter<Event> = new EventEmitter<Event>();
 @Input() EditMode: boolean = false;
 public results: any;

 private  CHAT_URL = 'ws://localhost:5000/ws';
 private destroyed$: Subject<any> = new Subject<any>();
 messages: string[] = [];

  constructor(private wsService: SocketService) { }

  ngOnInit(): void {
    this.wsService.connect(this.CHAT_URL)
      .subscribe(messages => {
          //var obj = JSON.parse(messages);
          console.log(messages);
          if(messages.MessageType === 'Weather'){
            this.results = JSON.parse(messages.Payload);
          }

    },err => {
      console.error(err);
    });


  }

  PropertyChange(event: Event){
    this.OnChange.emit(event);
  }

}
