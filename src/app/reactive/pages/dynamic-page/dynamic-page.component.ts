import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  // public myForm2 = new FormGroup({
  //   favoriteGames: new FormArray([])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required])

  constructor(private fb: FormBuilder) { }

  get favoriteGames() {
    // console.log(this.myForm.get('favoriteGames') as FormArray);

    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidFieldInArray(formArray: FormArray, i:number): boolean | null {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return null;

  }

  onDeleteFavorite(index: number):void {
    this.favoriteGames.removeAt(index);
  }

  insertFavoriteGame():void{
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push(new FormControl(newGame, Validators.required));

    this.favoriteGames.push(this.fb.control(newGame, Validators.required ));

    this.newFavorite.reset();
    
  }


  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }

    console.log(this.myForm.value);
    this.myForm.reset();

    // (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.favoriteGames.clear();
  }


}
