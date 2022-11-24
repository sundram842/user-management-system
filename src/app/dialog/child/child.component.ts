import {
  Component,
  Inject,
  inject,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
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
}from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { UserLoginForm, User } from '../../models/user.model';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  changetype: boolean = true;
  value!: boolean;
  update: string = '';
 
  userForm!: FormGroup<UserLoginForm>;
  actionbtn: string = 'save';
  actionuser: string = 'Add User';
  act: string = 'visibility_off';
  buttonDisabled: string = '';
  date = new Date();
  month = ('0' + (this.date.getMonth() + 1)).slice(-2);
  day = ('0' + this.date.getDate()).slice(-2);
  today = [this.date.getFullYear(), this.month, this.day].join('-');
  action: boolean = false;
  visible:boolean=true;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: User,
    private dialogRef: MatDialogRef<ChildComponent>,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
  console.log("dialog-child");
  
    this.update = '';
    this.prepareForm(this.editData);
    let user = this.userForm.get('phone') as FormArray;
    if (user.length === 1) {
      this.buttonDisabled = 'true';
    } else {
      this.buttonDisabled = 'false';
    }
  }

  prepareForm(userData: User): void {
    if (userData) {
      this.actionuser = 'Update User';
      this.actionbtn = 'update';
    }
    const initPhoneFormArray: FormControl<number>[] = [];
    this.userForm = new FormGroup<UserLoginForm>({
      // name: new FormControl('', Validators.required),
      fname: new FormControl(userData && userData.fname ? userData.fname : '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
          // Validators.pattern('^[a-zA-Z ]*$'),
          Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$')
         
        ],
      }),
      lname: new FormControl(userData && userData.lname ? userData.lname : '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(1),
          // Validators.pattern('^[a-zA-Z ]*$'),
          Validators.pattern('^([A-Za-z]+ )+[A-Za-z]+$|^[A-Za-z]+$')
        ],
      }),
      dob: new FormControl(
        userData && userData.dob ? userData.dob : new Date(),
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      username: new FormControl(
        userData && userData.username ? userData.username : '',
        {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.pattern('^[a-zA-Z1-9]*$'),
          ],
        }

        //
      ),
      email: new FormControl(userData && userData.email ? userData.email : '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(
        userData && userData.password ? userData.password : '',
        {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8}$'
            ),
          ],
        }
      ),
      phone: new FormArray(initPhoneFormArray),
      id: new FormControl(userData && userData.id ? userData.id : 0, {
        nonNullable: true,
      }),
    });
    if (userData && userData.phone && userData.phone.length) {
      userData.phone.map((phoneNumber: any) => this.addphone(phoneNumber));
    } else {
      this.addphone()
    }


  }
  
  // addphone(phoneNumber: any): any {
  //   throw new Error('Method not implemented.');
  // }

  addphone(phoneNumber = null) {
    console.log('hi');
    
    let userA = this.userForm.get('phone') as FormArray;
    if (userA.length < 1) {
      this.buttonDisabled = 'true';
    } else {
      this.buttonDisabled = 'false';
    }
    // (<FormArray>this.userForm.get('phone')).push(new FormControl('+91 ',[Validators.minLength(14),Validators.maxLength(14)]),)
    let user = this.userForm.get('phone') as FormArray;
    //let users=this.formBuilder.group({
    let users = new FormControl(phoneNumber ? phoneNumber : '', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      Validators.pattern(
        /^(?:(?:\+|0{0,2})(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
      ),
    ]);
    //})
    // let user=this.userForm.get('phone') as FormArray;
    // let newUser=this.formBuilder.group({
    //   'number':new FormControl()
    // })
    user.push(users);
  }


  delphone(i: number) {
    
    let user = this.userForm.get('phone') as FormArray;
    this.visible=false
    
    if (user.length < 2) {
       this.buttonDisabled = 'true';
      
      return;
    } else {
      
       this.buttonDisabled = 'false';
      this.value = false;
     
      let x = this.userFormGroups;
      
      x.removeAt(i);
      if (user.length === 1) {
       
        this.buttonDisabled = 'true';
       
      }
    }
  }

  get f(): UserLoginForm {
    // if(this.userForm)
    return this.userForm.controls;
  }
  

  get userFormGroups(): FormArray {
    return this.userForm.get('phone') as FormArray;
  }

  get phoneArray(): FormArray {
    return this.userForm.get('phone') as FormArray;
  }

  eye() {
    this.changetype = !this.changetype;
    if (this.changetype == true) {
      this.act = 'visibility_off';
    } else if (this.changetype == false) {
      this.act = 'visibility';
    }
  }

   
  space(event:any )
  {
   
    if(event.target.selectionStart===0 && event.keyCode===32 )
    {
     
      event.preventDefault();
    }
  }

  // @Output()
  // notify:EventEmitter<any>=new EventEmitter<any>()
  // out(){
  //   this.notify.emit(this.userForm)
  // }



}
