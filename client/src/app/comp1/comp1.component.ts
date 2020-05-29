import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocketService} from '../services/socket.service';
import {Observable, Subject} from 'rxjs';
import {mergeMap, share, takeUntil} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';


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



  constructor(private wsService: SocketService, private toastr: ToastrService) { }

  ngOnInit(): void {



    const obj = {Command: 'Weather', data:''};



    this.wsService.getData(obj).pipe(share()).subscribe(
      x => console.log(x),
      e => console.error(e),
      () => console.info('Weather complete')
    ).unsubscribe();
  }

  PropertyChange(event: Event){
    this.OnChange.emit(event);
  }

}
