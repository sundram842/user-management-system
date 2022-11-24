// import {
//   Component,
//   Inject,
//   inject,
//   OnInit,
//   ViewChild,
//   OnChanges,
//   SimpleChanges,
// } from '@angular/core';
// import {
//   FormGroup,
//   FormBuilder,
//   Validators,
//   FormControl,
//   FormArray,
//   Form,
//   AbstractControl,
//   EmailValidator,
//   ValidatorFn,
// } from '@angular/forms';
// import { ApiService } from '../services/api.service';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { UserLoginForm, User } from '../models/user.model';

// @Component({
//   selector: 'app-dialog',
//   templateUrl: './dialog.component.html',
//   styleUrls: ['./dialog.component.scss'],
// })
// export class DialogComponent implements OnInit {
//   ngOnInit(): void {
//     throw new Error('Method not implemented.');
//   }
  
// }



// function minLength(
//   minLength: any,
//   arg1: number
// ): import('@angular/forms').ValidatorFn {
//   throw new Error('Function not implemented.');
// }
// function emailPattern(emailPattern: any): import("@angular/forms").ValidatorFn | null | undefined {
//   throw new Error('Function not implemented.');
// }


import {
  Component,
  Inject,
  inject,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  Form,
  AbstractControl,
  EmailValidator,
  ValidatorFn,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { UserLoginForm, User } from '../models/user.model';
import{ChildComponent} from './child/child.component'
@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
  })
export class DialogComponent implements OnInit {
  disability: boolean=true;
// out() {
// throw new Error('Method not implemented.');
// }
  changetype: boolean = true;
  value!: boolean;
  update: string = '';
 
  userForm!: FormGroup<UserLoginForm>;
  actionbtn: string = 'save';
  actionuser: string = 'Add User';
  act: string = 'visibility_off';

  date = new Date();
  month = ('0' + (this.date.getMonth() + 1)).slice(-2);
  day = ('0' + this.date.getDate()).slice(-2);
  today = [this.date.getFullYear(), this.month, this.day].join('-'); 
                         action: boolean = false;
  @ViewChild('child')child:ChildComponent | any
  constructor(

    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: User,
    private dialogRef: MatDialogRef<DialogComponent>,
    private _snackBar: MatSnackBar
  ) {}

  // eye() {
  //   this.changetype = !this.changetype;
  //   if (this.changetype == true) {
  //     this.act = 'visibility_off';
  //   } else if (this.changetype == false) {
  //     this.act = 'visibility';
  //   }
  // }
  ngOnInit(): void {
    console.log("dialog");
    
    this.update = '';
    //this.prepareForm(this.editData);
  //  let user = this.userForm.get('phone') as FormArray;
    // if (user.length === 1) {
    //   this.buttonDisabled = 'true';
    // } else {
    //   this.buttonDisabled = 'false';
    // }

    if (this.editData) {
      console.log(this.editData);

      this.actionbtn = 'update'
    this.actionuser = 'Update User'
    }

    //   this.userForm.controls['fname'].setValue(this.editData.fname);
    //   this.userForm.controls['lname'].setValue(this.editData.lname);
    //   this.userForm.controls['dob'].setValue(this.editData.dob);
    //   this.userForm.controls['username'].setValue(this.editData.username);
    //   this.userForm.controls['email'].setValue(this.editData.email);

    //   this.userForm.controls['password'].setValue(this.editData.password);
    //   const phoneArray = this.editData.phone.map((number: any) => {
    //     this.addphone(number);
    //   });
    //   this.userForm.controls['phone'].setValue(phoneArray);

    // }
    // this.callFun()
  }

  // prepareForm(userData: User): void {
  //   if (userData) {
  //     this.actionuser = 'Update User';
  //     this.actionbtn = 'update';
  //   }
  //   const initPhoneFormArray: FormControl<number>[] = [];
  //   this.userForm = new FormGroup<UserLoginForm>({
  //     // name: new FormControl('', Validators.required),
  //     fname: new FormControl(userData && userData.fname ? userData.fname : '', {
  //       nonNullable: true,
  //       validators: [
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(150),
  //         Validators.pattern('^[a-zA-Z ]*$'),
         
  //       ],
  //     }),
  //     lname: new FormControl(userData && userData.lname ? userData.lname : '', {
  //       nonNullable: true,
  //       validators: [
  //         Validators.required,
  //         Validators.minLength(1),
  //         Validators.pattern('^[a-zA-Z]*$'),
  //       ],
  //     }),
  //     dob: new FormControl(
  //       userData && userData.dob ? userData.dob : new Date(),
  //       {
  //         nonNullable: true,
  //         validators: [Validators.required],
  //       }
  //     ),
  //     username: new FormControl(
  //       userData && userData.username ? userData.username : '',
  //       {
  //         nonNullable: true,
  //         validators: [
  //           Validators.required,
  //           Validators.pattern('^[a-zA-Z1-9]*$'),
  //         ],
  //       }

  //       //
  //     ),
  //     email: new FormControl(userData && userData.email ? userData.email : '', {
  //       nonNullable: true,
  //       validators: [Validators.required, Validators.email],
  //     }),
  //     password: new FormControl(
  //       userData && userData.password ? userData.password : '',
  //       {
  //         nonNullable: true,
  //         validators: [
  //           Validators.required,
  //           Validators.minLength(8),
  //           Validators.maxLength(8),
  //           Validators.pattern(
  //             '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8}$'
  //           ),
  //         ],
  //       }
  //     ),
  //     phone: new FormArray(initPhoneFormArray),
  //     id: new FormControl(userData && userData.id ? userData.id : 0, {
  //       nonNullable: true,
  //     }),
  //   });
  //   if (userData && userData.phone && userData.phone.length) {
  //     userData.phone.map((phoneNumber: any) => this.addphone(phoneNumber));
  //   } else {
  //     this.addphone();
  //   }
  // }

  // callFun()
  // {
  //   for(let i=0;i<=this.userForm.)
  // }

  // addUser() {

  //   if (!this.editData) {
  //     if (this.userForm.valid) {
  //       this.api.postUser(this.userForm.value).subscribe({
  //         next: (res) => {
  //           this._snackBar.open('User Added successfully', 'ok', {
  //             duration: 2000,
  //           });
  //           this.userForm.reset();
  //           this.dialogRef.close('add');
  //         },
  //         error: () => {
  //           this._snackBar.open('SORRY,User cannot be added', 'ok', {
  //             duration: 2000,
  //           });
  //         },
  //       });
  //     }
  //   } else {
  //     this.updateUser();
  //   }

  // }

  /**
   *
   */

  // addphone(phoneNumber = null) {
  //   console.log('hi');
    
  //   let userA = this.userForm.get('phone') as FormArray;
  //   if (userA.length < 1) {
  //     this.buttonDisabled = 'true';
  //   } else {
  //     this.buttonDisabled = 'false';
  //   }
  //   console.log(this.f);

  //   // (<FormArray>this.userForm.get('phone')).push(new FormControl('+91 ',[Validators.minLength(14),Validators.maxLength(14)]),)
  //   let user = this.userForm.get('phone') as FormArray;
  //   //let users=this.formBuilder.group({
  //   let users = new FormControl(phoneNumber ? phoneNumber : '', [
  //     Validators.required,
  //     Validators.minLength(10),
  //     Validators.maxLength(10),
  //     Validators.pattern(/^-?(0|[1-9]\d*)?$/),
  //     Validators.pattern(
  //       /^(?:(?:\+|0{0,2})(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
  //     ),
  //   ]);
  //   //})
  //   // let user=this.userForm.get('phone') as FormArray;
  //   // let newUser=this.formBuilder.group({
  //   //   'number':new FormControl()
  //   // })
  //   user.push(users);
  // }

  // delphone(i: number) {
    
  //   let user = this.userForm.get('phone') as FormArray;
    
  //   if (user.length < 2) {
  //      this.buttonDisabled = 'true';
      
  //     return;
  //   } else {
      
  //      this.buttonDisabled = 'false';
  //     this.value = false;
     
  //     let x = this.userFormGroups;
      
  //     x.removeAt(i);
  //     if (user.length === 1) {
       
  //       this.buttonDisabled = 'true';
       
  //     }
  //   }
  // }

  // get f(): UserLoginForm {
  //   // if(this.userForm)
  //   return this.userForm.controls;
  // }

  // get userFormGroups(): FormArray {
  //   return this.userForm.get('phone') as FormArray;
  // }

  addUser() {

//  console.log(this.child?.userForm.value);
this.userForm=this.child?.userForm

 


    console.log(this.userForm.value);

    if (!this.editData) {
      if (this.userForm.valid) {
       
        this.api.postUser(this.userForm.getRawValue()).subscribe({
          next: (res) => {
            // console.log(res.value.phone.length)
            this._snackBar.open('User Added successfully', 'ok', {
              duration: 2000,
            });
            this.userForm.reset();
            this.dialogRef.close('add');
          },
          error: () => {
            this._snackBar.open('SORRY,User cannot be added', 'ok', {
              duration: 2000,
            });
          },
        });
      }
    } else {
      
      this.updateUser();
    }
  }

  /**
   *
   * @param id id of update user
   */
  updateUser() {
    
    console.log(this.editData);
    let a = this.userForm.value;
    console.log(a.fname?.trim());

    this.api.putUser(this.userForm.getRawValue(), this.editData.id).subscribe({
      next: (res) => {
        console.log(res);

        this._snackBar.open('User updated successfully', 'ok', {
          duration: 2000,
        });
        this.userForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this._snackBar.open('SORRY,User could not be updated', 'ok', {
          duration: 2000,
        });
      },
    });
  }

  // get phoneArray(): FormArray {
  //   return this.userForm.get('phone') as FormArray;
  // }
  
   
  // space(event:any )
  // {
   
  //   if(event.target.selectionStart===0 && event.keyCode===32 )
  //   {
     
  //     event.preventDefault();
  //   }
  // }
  // fun(data:any){
  //   this.userForm=data
  //   this.disability= this.userForm.invalid

  // }

}