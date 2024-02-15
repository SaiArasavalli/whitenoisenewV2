import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { BillingComponent } from './components/billing/billing.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const title = 'White Noise · Cafe & Snooker Hub';
const routes: Routes = [
  {
    path: 'calculator',
    component: CalculatorComponent,
    title: `Calculator | ${title}`,
  },
  {
    path: 'billing',
    component: BillingComponent,
    title: `Billing | ${title}`,
  },
  {
    path: 'menu',
    component: MenuListComponent,
    title: `Menu | ${title}`,
  },
  {
    path: 'boards',
    component: BoardListComponent,
    title: `Boards | ${title}`,
  },
  {
    path: 'customers',
    component: CustomerListComponent,
    title: `Customers | ${title}`,
  },
  {
    path: 'bookings',
    component: BookingListComponent,
    title: `Bookings | ${title}`,
  },
  {
    path: 'orders',
    component: OrderListComponent,
    title: `Orders | ${title}`,
  },
  {
    path: 'games',
    component: GameListComponent,
    title: `Games | ${title}`,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: `Dashboard | ${title}`,
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
