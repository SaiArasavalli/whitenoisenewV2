import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from 'src/app/firebase';
import { DialogService } from 'src/app/services/dialog.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styles: [],
})
export class CustomerDeleteComponent {
  submitting: boolean = false;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  async deleteCustomer() {
    this.submitting = true;
    const customerId = this.data;
    const customerDocRef = doc(db, 'customers', customerId);
    await deleteDoc(customerDocRef);
    this.dialogService.close();
    this.messageService.open('Customer has been deleted.');
    this.submitting = false;
  }

  close() {
    this.dialogService.close();
  }
}
