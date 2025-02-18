import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { user } from 'src/app/models/user.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  newUser: user | undefined;
  isEdit: boolean = false;                              

  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private services: ServicesService) { }

    newUserForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(null)
    });

  ngOnInit(): void {
    if(this.data != null) {
      this.newUserForm = new FormGroup({
        name: new FormControl(this.data.user.name),
        age: new FormControl(this.data.user.age)
      });
      this.isEdit = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  async onSubmit() {
    if(this.isEdit == false) {
      console.log(this.newUserForm);
      this.newUser = new user(0, this.newUserForm.value.name!, this.newUserForm.value.age!);
      await this.services.createUser(this.newUser).subscribe((res: any) => {
        this.dialogRef.close(0);
      });
    } else {
      this.newUser = new user(this.data.user.userId, this.newUserForm.value.name!, this.newUserForm.value.age!);
      await this.services.editUser(this.newUser).subscribe((res: any) => {
        this.dialogRef.close(0);
      });
    }
  }

}
