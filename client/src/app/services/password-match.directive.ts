// password-match.directive.ts
import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  FormControl,
} from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    },
  ],
})
export class PasswordMatchDirective implements Validator {
  @Input('appPasswordMatch') targetControl: AbstractControl;

  constructor() {
    this.targetControl = new FormControl();
  }

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!this.targetControl) {
      return null;
    }

    return control.value === this.targetControl.value
      ? null
      : { mismatch: true };
  }
}
