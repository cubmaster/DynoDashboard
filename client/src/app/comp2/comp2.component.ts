import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';
import {SocketService} from '../services/socket.service';
import {ToastrService} from 'ngx-toastr';
import {share} from 'rxjs/operators';


@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit {
  @Input() Input2 = 'Defaul2';
  @Output() OnChange: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() EditMode: boolean = false;
  public results: string;
  private  CHAT_URL = 'ws://localhost:5000/ws';
  private destroyed$: Subject<any> = new Subject<any>();
  messages: string[] = [];
  constructor(private wsService: SocketService, private toastr: ToastrService) { }


  ngOnInit(): void {

     const obj = {Command:'Stock',data:'msft'};

     this.wsService.getData(obj).pipe(share()).subscribe(
       x => console.log(x),
       e => console.error(e),
       ()=>  console.info('stock complete')
     ).unsubscribe();

  }
  PropertyChange(event: Event){
    this.OnChange.emit(event);
  }

}
