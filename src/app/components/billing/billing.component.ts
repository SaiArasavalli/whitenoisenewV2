import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/interfaces/board';
import { Customer } from 'src/app/interfaces/customer';
import { Game } from 'src/app/interfaces/game';
import { Menu } from 'src/app/interfaces/menu';
import { Order } from 'src/app/interfaces/order';
import { BoardService } from 'src/app/services/board.service';
import { CustomerService } from 'src/app/services/customer.service';
import { GameService } from 'src/app/services/game.service';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styles: [],
})
export class BillingComponent {
  orderAmount: number = 0;
  gameAmount: number = 0;
  customers: Customer[] = [];
  orders: Order[] = [];
  menu: Menu[] = [];
  games: Game[] = [];
  boards: Board[] = [];
  billingOrders: Order[] = [];
  billingGames: Game[] = [];
  customersSubscription!: Subscription;
  ordersSubscription!: Subscription;
  menuSubscription!: Subscription;
  gamesSubscription!: Subscription;
  boardsSubscription!: Subscription;
  billForm = this.fb.group({
    customer: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  orderTableColumns: string[] = [
    'id',
    'name',
    'items',
    'totalAmount',
    'payment',
    'date',
    'comment',
  ];

  gameTableColumns: string[] = [
    'id',
    'board',
    'startTime',
    'endTime',
    'duration',
    'totalAmount',
    'players',
    'date',
    'comment',
  ];

  itemColumns: string[] = ['name', 'price', 'quantity'];
  playerColumns: string[] = ['name', 'charge', 'payment'];

  constructor(
    private fb: FormBuilder,
    private customerSerivice: CustomerService,
    private orderService: OrderService,
    private menuService: MenuService,
    private gameService: GameService,
    private boardService: BoardService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.customersSubscription = this.customerSerivice.customers$.subscribe(
      (customers) =>
        (this.customers = this.customerSerivice.sortCustomersByName(customers))
    );

    this.ordersSubscription = this.orderService.orders$.subscribe(
      (orders) => (this.orders = orders)
    );

    this.menuSubscription = this.menuService.menu$.subscribe(
      (menu) => (this.menu = menu)
    );

    this.gamesSubscription = this.gameService.games$.subscribe(
      (games) => (this.games = games)
    );

    this.boardsSubscription = this.boardService.boards$.subscribe(
      (boards) => (this.boards = boards)
    );
  }

  getOrders(customer: string, startDate: Date, endDate: Date) {
    const orders = this.orders.filter((order) => {
      const orderDate = new Date(order.created.toDate());
      return (
        order.customer.toLowerCase() === customer.toLowerCase() &&
        order.payment === 'PENDING' &&
        orderDate >= startDate &&
        orderDate <= endDate
      );
    });

    return orders;
  }

  getGames(customer: string, startDate: Date, endDate: Date) {
    const games = this.games.filter((game) => {
      const gameDate = new Date(game.created.toDate());
      game.players?.forEach((player) => {
        return (
          player.name.toLowerCase() === customer.toLowerCase() &&
          player.payment === 'PENDING' &&
          player.lost === true &&
          gameDate >= startDate &&
          gameDate <= endDate
        );
      });
    });

    return games;
  }

  generateBill() {
    if (this.billForm.valid) {
      const customer = this.billForm.value.customer;
      const startDate = new Date(this.billForm.value.startDate!);
      const endDate = new Date(this.billForm.value.endDate!);
      endDate.setHours(23, 59, 59);

      this.billingOrders = this.getOrders(customer!, startDate, endDate);
      this.billingGames = this.getGames(customer!, startDate, endDate);
      this.billingOrders.forEach((order) => {
        this.orderAmount += order.totalAmount;
      });

      if (this.isPlayerSub(customer!)) {
        this.billingGames.forEach((game) => {
          game.players?.forEach((player) => {
            if (
              player.name.toLowerCase() === customer?.toLowerCase() &&
              player.payment === 'PENDING' &&
              player.lost === true
            ) {
              this.gameAmount +=
                this.calculateMinutes(game.startTime, game.endTime!) /
                this.countLostPlayers(game.players!);
            }
          });
        });
      } else if (!this.isPlayerSub(customer!)) {
        this.billingGames.forEach((game) => {
          game.players?.forEach((player) => {
            if (
              player.name.toLowerCase() === customer?.toLowerCase() &&
              player.payment === 'PENDING' &&
              player.lost === true
            ) {
              this.gameAmount +=
                this.calculateTotalAmount(
                  game.board,
                  game.startTime,
                  game.endTime!
                ) / this.countLostPlayers(game.players!);
            }
          });
        });
      }
    }
  }

  countLostPlayers(players: any[]): number {
    return players.filter((player) => player.lost).length;
  }

  calculatePrice(item: { name: string; quantity: number }) {
    const newItem = this.menu.find((x) => x.name === item.name);
    if (newItem) {
      return newItem.price;
    }
    return 0;
  }

  calcuateDuration(startTime: string, endTime: string): string {
    const startTimeObj = this.parseTimeToDate(startTime).getTime();
    const endTimeObj = this.parseTimeToDate(endTime).getTime();

    const milliSeconds = endTimeObj - startTimeObj;
    const hours = Math.floor(milliSeconds / (1000 * 60 * 60));
    const minutes = (milliSeconds % (1000 * 60 * 60)) / (1000 * 60);

    const formattedDuration = `${this.padNumber(hours)}H : ${this.padNumber(
      minutes
    )}M`;
    return formattedDuration;
  }

  getFormattedTime(timeString: string): string {
    const dateObject = this.parseTimeToDate(timeString);
    return this.datePipe.transform(dateObject, 'h:mm a') || '';
  }

  round(value: number) {
    return Math.round(value);
  }

  padNumber(number: number): string {
    return number.toString().padStart(2, '0');
  }

  isPlayerSub(playerName: string) {
    const player = this.customers.find(
      (customer) => customer.name.toLowerCase() === playerName.toLowerCase()
    );
    return player?.sub;
  }

  parseTimeToDate(time: string) {
    const [hour, min] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, min);
    return date;
  }

  calculateTotalAmount(
    boardName: string,
    startTime: string,
    endTime: string
  ): number {
    const board = this.boards.find((board) => board.name === boardName);

    const startTimeObj = this.parseTimeToDate(startTime).getTime();
    const endTimeObj = this.parseTimeToDate(endTime).getTime();

    const milliSeconds = endTimeObj - startTimeObj;
    const seconds = milliSeconds / 1000;
    if (board) {
      return (board.price / 3600) * seconds;
    }
    return 0;
  }

  calculateMinutes(startTime: string, endTime: string) {
    const startTimeObj = this.parseTimeToDate(startTime).getTime();
    const endTimeObj = this.parseTimeToDate(endTime).getTime();

    const milliSeconds = endTimeObj - startTimeObj;
    const seconds = milliSeconds / 1000;
    const minutes = seconds / 60;

    return minutes;
  }

  ngOnDestroy() {
    this.customersSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
    this.menuSubscription.unsubscribe();
    this.gamesSubscription.unsubscribe();
    this.boardsSubscription.unsubscribe();
  }
}
