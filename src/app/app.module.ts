import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { BillingComponent } from './components/billing/billing.component';
import { DatePipe } from '@angular/common';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuAddComponent } from './components/menu-add/menu-add.component';
import { MenuEditComponent } from './components/menu-edit/menu-edit.component';
import { MenuDeleteComponent } from './components/menu-delete/menu-delete.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardAddComponent } from './components/board-add/board-add.component';
import { BoardEditComponent } from './components/board-edit/board-edit.component';
import { BoardDeleteComponent } from './components/board-delete/board-delete.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerDeleteComponent } from './components/customer-delete/customer-delete.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingAddComponent } from './components/booking-add/booking-add.component';
import { BookingEditComponent } from './components/booking-edit/booking-edit.component';
import { BookingDeleteComponent } from './components/booking-delete/booking-delete.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { OrderDeleteComponent } from './components/order-delete/order-delete.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameAddComponent } from './components/game-add/game-add.component';
import { GameEditComponent } from './components/game-edit/game-edit.component';
import { GameDeleteComponent } from './components/game-delete/game-delete.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardGameListComponent } from './components/dashboard-game-list/dashboard-game-list.component';
import { DashboardOrderListComponent } from './components/dashboard-order-list/dashboard-order-list.component';
import { DashboardBookingListComponent } from './components/dashboard-booking-list/dashboard-booking-list.component';
import { TimerListComponent } from './components/timer-list/timer-list.component';
import { TimerEditComponent } from './components/timer-edit/timer-edit.component';
import { TimerComponent } from './components/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalculatorComponent,
    BillingComponent,
    MenuListComponent,
    MenuAddComponent,
    MenuEditComponent,
    MenuDeleteComponent,
    BoardListComponent,
    BoardAddComponent,
    BoardEditComponent,
    BoardDeleteComponent,
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerDeleteComponent,
    BookingListComponent,
    BookingAddComponent,
    BookingEditComponent,
    BookingDeleteComponent,
    OrderListComponent,
    OrderAddComponent,
    OrderEditComponent,
    OrderDeleteComponent,
    GameListComponent,
    GameAddComponent,
    GameEditComponent,
    GameDeleteComponent,
    DashboardComponent,
    DashboardGameListComponent,
    DashboardOrderListComponent,
    DashboardBookingListComponent,
    TimerListComponent,
    TimerEditComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
