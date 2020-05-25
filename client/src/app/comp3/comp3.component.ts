import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit  {
  @Input() Input3: string = 'Default3';
  @Output() OnChange: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() EditMode: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  PropertyChange(event: Event){
    this.OnChange.emit(event);
  }
}
