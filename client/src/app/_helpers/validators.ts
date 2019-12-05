import { FormGroup } from '@angular/forms';

export function matchFieldsValidator(firstFeild: string, secondField: string) {
  return (formGroup: FormGroup) => {
    const first = formGroup.controls[firstFeild];
    const second = formGroup.controls[secondField];

    if (first.errors) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (first.value !== second.value) {
      second.setErrors({ notEqual: true });
    } else {
      second.setErrors(null);
    }
  };
}
