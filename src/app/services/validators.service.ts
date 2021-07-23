import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface ValidationError {
  [key: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}

  userExists(formControl: FormControl): Promise<ValidationError | null> {
    if (!formControl.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (formControl.value === 'IronMan76') {
          resolve({
            userExists: true,
          });
        } else {
          resolve(null);
        }
      }, 500);
    });
  }

  noSoccer(control: FormControl): ValidationError | null {
    if (control.value?.toLowerCase() === 'soccer') {
      return {
        soccer: true,
      };
    }

    return null;
  }

  matchPassword(passwordName: string, confirmName: string) {
    return (formGroup: FormGroup) => {
      let password = formGroup.get(passwordName);
      let confirm = formGroup.get(confirmName);

      if (!password?.value || !confirm?.value) {
        confirm?.setErrors({
          misMatchedPasswords: true,
        });
        return;
      }

      if (password?.value === confirm?.value) {
        confirm?.setErrors(null);
      } else {
        confirm?.setErrors({
          misMatchedPasswords: true,
        });
      }
    };
  }
}
