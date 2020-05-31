import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocketService} from '../services/socket.service';
import {Observable, Subject} from 'rxjs';
import {mergeMap, share, takeUntil} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {jsGlobalObjectValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/known_declaration';


@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {
 @Input() Input1: string = 'default1';
 @Output() OnChange: EventEmitter<Event> = new EventEmitter<Event>();
 @Input() EditMode: boolean = false;
 public results: any;



  constructor(private wsService: SocketService, private toastr: ToastrService) { }

  ngOnInit(): void {



    const obj = {Command: 'Weather', data: ''};



    this.wsService.getData(obj).subscribe(x =>  this.results = JSON.parse(x.Payload) );
  }

  PropertyChange(event: Event){
    this.OnChange.emit(event);
  }

}
