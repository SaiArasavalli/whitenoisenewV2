import { Component } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { DialogService } from 'src/app/services/dialog.service';
import { BoardAddComponent } from '../board-add/board-add.component';
import { BoardEditComponent } from '../board-edit/board-edit.component';
import { BoardDeleteComponent } from '../board-delete/board-delete.component';
import { Board } from 'src/app/interfaces/board';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styles: [],
})
export class BoardListComponent {
  boards$ = this.boardService.boards$;
  searchForm = this.fb.group({
    name: [''],
  });
  tableColumns: string[] = ['id', 'name', 'price', 'actions'];

  constructor(
    private boardService: BoardService,
    private dialogService: DialogService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm.get('name')?.valueChanges.subscribe(() => {
      this.filterBoards();
    });
  }

  filterBoards() {
    const searchTerm = this.searchForm.get('name')?.value?.toLowerCase();
    if (!searchTerm) {
      this.boards$ = this.boardService.boards$;
    } else {
      this.boards$ = this.boardService.boards$.pipe(
        map((boards) =>
          boards.filter((board) =>
            board.name.toLowerCase().includes(searchTerm)
          )
        )
      );
    }
  }

  addBoard() {
    this.dialogService.open(BoardAddComponent, null);
  }

  editBoard(board: Board) {
    this.dialogService.open(BoardEditComponent, board);
  }

  deleteBoard(boardId: string) {
    this.dialogService.open(BoardDeleteComponent, boardId);
  }
}
