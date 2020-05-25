import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';


@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit {
  @Input() Input2 = 'Defaul2';
  @Output() OnChange: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() EditMode: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  PropertyChange(event: Event){
    this.OnChange.emit(event);
  }

}
