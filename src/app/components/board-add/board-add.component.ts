import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'src/app/firebase';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styles: [],
})
export class BoardAddComponent {
  boardForm = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
  });
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  async addBoard() {
    if (this.boardForm.valid) {
      this.submitting = true;
      const boardData = this.boardForm.value;
      await addDoc(collection(db, 'boards'), {
        name: boardData.name,
        price: Number(boardData.price),
        created: serverTimestamp(),
      });
      this.dialogService.close();
      this.messageService.open('Board has been created.');
      this.boardForm.reset();
      this.submitting = false;
    }
  }
}
