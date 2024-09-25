import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-order-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule],
  templateUrl: './update-order-details.component.html',
  styleUrl: './update-order-details.component.scss'
})
export class UpdateOrderDetailsComponent {

  OrderDetails!: FormGroup

  // inject
  formBuilder = inject(FormBuilder)
  orderService = inject(OrderService)
  snackBar = inject(MatSnackBar)
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  // if put this code only dialog box will add, delete, update data for database
  // !import MatDialogReg , Inject ,MAT_DIALOG_DATA
  constructor(public dialogRef: MatDialogRef<UpdateOrderDetailsComponent>, @Inject(MAT_DIALOG_DATA) private data: any = null) { }

  ngOnInit() {
    this.OrderDetails = this.formBuilder.group({
      orderstatus: [null, Validators.required]
    })
    // console.log(this.data);
  }

  // update the data from service file
  updatestatus() {
    const request = {
      "id": this.data?.order.orderid,
      "orderstatus": this.OrderDetails.value.orderstatus
    }
    this.orderService.updatestatus(request).subscribe({
      next: (res: any) => {
        this.snackBar.open('Status Updated', 'Success', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.dialogRef.close(true)
      },
    })
  }

  ngAfterViewInit() {
    this.OrderDetails.patchValue(this.data?.order)
    this.cdr.detectChanges()
  }

  close() {
    this.dialogRef.close(true);
  }


}
