import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cantBeStrider, emailPattern, firstNameAndLastnamePattern } from 'src/app/shared/validators/validators.functions';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(firstNameAndLastnamePattern) ]],
    email : ['', [Validators.required, Validators.pattern(emailPattern)]],
    username: ['', [Validators.required, cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });


  constructor(private fb: FormBuilder){}

  isValidField( field: string ): void{
    //TODO: Obtener validación desde un servicio
  }

  onSumbit():void{
    this.myForm.markAllAsTouched();
  }
}
