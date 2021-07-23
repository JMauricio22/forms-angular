import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactives',
  templateUrl: './reactives.component.html',
  styles: [],
})
export class ReactivesComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private validators: ValidatorsService) {
    this.buildForm();
    this.loadDataToForm();
  }

  ngOnInit(): void {}

  isInvalidField(field: string) {
    return this.form.get(field)?.touched && this.form.get(field)?.invalid;
  }

  get matchPassword() {
    return this.form.get('password')?.value === this.form.get('confirm')?.value
      ? false
      : true;
  }

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  get isInvalidUser() {
    return this.form.get('user')?.invalid;
  }

  buildForm() {
    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirm: ['', Validators.required],
        user: ['', , this.validators.userExists],
        address: this.fb.group({
          district: ['', Validators.required],
          city: ['', Validators.required],
        }),
        hobbies: this.fb.array([]),
      },
      {
        validators: [this.validators.matchPassword('password', 'confirm')],
      }
    );
  }

  loadDataToForm() {
    this.form.reset({
      firstName: 'Michael',
      lastName: 'Jordan',
    });
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.reset();
  }

  addHobie() {
    this.hobbies.push(
      this.fb.control('', [Validators.required, this.validators.noSoccer])
    );
  }

  removeHobbie(index: number) {
    this.hobbies.removeAt(index);
  }
}
