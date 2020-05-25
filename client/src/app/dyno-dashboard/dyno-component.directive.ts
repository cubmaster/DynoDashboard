import {
  ComponentFactoryResolver,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {Comp1Component} from '../comp1/comp1.component';
import {Comp2Component} from '../comp2/comp2.component';
import {Comp3Component} from '../comp3/comp3.component';

const componentMapper = {
  comp1: Comp1Component,
  comp2: Comp2Component,
  comp3: Comp3Component,
};


@Directive({
  selector: '[appDynoComponent]'
})

export class DynoComponentDirective implements OnInit, OnChanges {
  @Input() widget: string;
  @Input() parameters: object;
  @Input() EditMode: boolean = false;
  //@Output() OnChanges: EventEmitter<Event> = new EventEmitter<Event>();

  componentRef: any;
  private obj: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnChanges(): void {
    this.refresh();
  }

  ngOnInit(): void {


  }
  refresh(){

    this.container.clear();
    const factory = this.resolver.resolveComponentFactory(this.mapper());
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.EditMode = this.EditMode;
    if(!!this.parameters){
      for (let [key, value] of Object.entries(this.parameters)) {
        this.componentRef.instance[key]  = value;
      }
    }


    this.componentRef.instance.OnChange.subscribe(val =>
    {
      this.parameters[val.target.id] = val.target.value;

    });
  }

  mapper() {
    if (componentMapper.hasOwnProperty(this.widget)) {
      return componentMapper[this.widget];
    } else {
      return componentMapper.comp1; // default mapping
    }
  }
}
