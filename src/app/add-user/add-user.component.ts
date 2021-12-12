import { Component,   OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddUserDialogComponent } from '../dialogs/add-user-dialog/add-user-dialog.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  
})
export class AddUserComponent implements OnInit {

  form!: FormGroup;  

  gender: any;
  genders: string[] = ['Male', 'Female'];
  statuses: string[] = ['active', 'passive']

  isLoading = false;
  
  constructor(
    public dialog: MatDialog, 
    private formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private _snackBar: MatSnackBar,
    private readonly router: Router
    ) {
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', 
        [
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(20), 
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        ]
      ],
      name : ['', Validators.required],
      status: [this.statuses, Validators.required],
      gender: [null, Validators.required]
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      if(result == true){
        this.usersService.addUser(this.form.value)
        .subscribe(() => {
          this._snackBar.open('Пользователь успешно добавлен', 'Ок', {
            duration: 3000
          }); 
          this.isLoading = false;
          this.router.navigateByUrl('');
        }, error => {
          this._snackBar.open(`Ошибка при добавлении: ${error.message}`, 'Ок', {
            duration: 5000
          }); this.isLoading = false;
        })
      }
      else console.log(result)
    });
  }

  radioChange(event: MatRadioChange) {
  }

  onChange(event: any){
    console.log(event)
  }

  onSubmit(f: FormGroupDirective){
    if(f.valid){
      
      console.log(f.form.value)
      this.openDialog()
    }
  }

  get f() {
    return this.form.get('email')!;
  }

}
