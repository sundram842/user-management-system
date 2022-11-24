import { FormControl, FormArray } from "@angular/forms";

export interface User {
  fname: string;
  lname: string;
  dob: Date;
  username: string | number | symbol;
  password: string | number | symbol;
  phone: Array<number>;
  email: string | number | symbol;
  id: number;
}

export interface UserLoginForm {
  fname: FormControl<string>;
  lname: FormControl<string>;
  dob: FormControl<Date>;
  username: FormControl<string | number | symbol>;
  password: FormControl<string | number | symbol>;
  phone: FormArray<FormControl<number>>;
  email: FormControl<string | number | symbol>;
  id: FormControl<number>
}
