import { Component, OnInit } from '@angular/core';
import {CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable} from 'angular-gridster2';
import {Subject} from 'rxjs';
import {SocketService} from '../services/socket.service';
import {ToastrService} from 'ngx-toastr';

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}
@Component({
  selector: 'app-dyno-dashboard',
  templateUrl: './dyno-dashboard.component.html',
  styleUrls: ['./dyno-dashboard.component.css']
})
export class DynoDashboardComponent implements OnInit {
  options: Safe;
  dashboard: Array<GridsterItem>;
  EditMode: boolean;
  private  CHAT_URL = 'ws://localhost:5000/ws';

  constructor(private wsService: SocketService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.wsService.connect(this.CHAT_URL).subscribe(messages => {
         switch (messages.MessageType) {
           case 'name': {}
           case 'announce': {
             this.toastr.success(messages.MessageType, messages.Payload);
             break;
           }
           default: {
             // console.log(messages);
             break;
           }
         }

     }, err => {
       console.error(err);
     });
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 4,
      maxCols: 100,
      minRows: 4,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: false,
        dragHandleClass: 'button-holder',
        ignoreContent: true
      },
      resizable: {
        enabled: false,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.OnDragAndResize,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
    this.dashboard = [
      {cols: 1, rows: 1, y: 0, x: 0, widget: 'comp3', parameters: {Input3: 'test3'}},
      {cols: 1, rows: 1, y: 0, x: 0, widget: 'comp2', parameters: {Input2: 'test2'}},
      {cols: 1, rows: 1, y: 0, x: 0, widget: 'comp1', parameters: {Input1: 'test1'}},
    ];
  }


  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1, component: 'comp1'});
  }

  edit(event: MouseEvent){
   const elem: Element = (event.target as Element);
   this.EditMode = !this.EditMode;
   this.options.draggable.enabled = this.EditMode;
   this.options.resizable.enabled = this.EditMode;

   this.changedOptions();
  }
  widgetChanged(value: string, item: GridsterItem ){
    const elem: Element = (event.target as Element);
    item.widget = value;
  }


  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
    console.log(this.dashboard);//save to api here
  }

}
