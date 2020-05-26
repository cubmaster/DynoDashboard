import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { Comp3Component } from './comp3/comp3.component';
import { DynoDashboardComponent } from './dyno-dashboard/dyno-dashboard.component';
import { DynoComponentDirective } from './dyno-dashboard/dyno-component.directive';
import {ToastrModule} from 'ngx-toastr';
import {SocketService} from './services/socket.service';
@NgModule({
  declarations: [
    AppComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,
    DynoDashboardComponent,
    DynoComponentDirective
  ],
  imports: [
    BrowserModule,
    GridsterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatMenuModule,
    FormsModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
