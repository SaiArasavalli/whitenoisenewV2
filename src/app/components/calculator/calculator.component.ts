import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/interfaces/board';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styles: [],
})
export class CalculatorComponent {
  amount: number = 0;
  boards: Board[] = [];
  boardsSubscription!: Subscription;
  calculatorForm = this.fb.group({
    boardName: ['', Validators.required],
    minutes: ['', [Validators.required, Validators.min(1)]],
  });

  constructor(private fb: FormBuilder, private boardService: BoardService) {}

  ngOnInit() {
    this.boardsSubscription = this.boardService.boards$.subscribe(
      (boards) => (this.boards = boards)
    );
  }

  getBoardPrice(boardName: string) {
    const selectedBoard = this.boards.find(
      (board) => board.name.toLowerCase() === boardName.toLowerCase()
    );
    return selectedBoard?.price;
  }

  calculate() {
    if (this.calculatorForm.valid) {
      const boardName = this.calculatorForm.value.boardName;
      const minutes = Number(this.calculatorForm.value.minutes);
      const boardPrice = this.getBoardPrice(boardName!);
      const amount = (boardPrice! / 60) * minutes;
      this.amount = Math.floor(amount);
    }
  }

  ngOnDestroy() {
    this.boardsSubscription.unsubscribe();
  }
}
