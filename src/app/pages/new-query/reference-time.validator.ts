import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appReferenceTime]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ReferenceTimeValidatorDirective,
      multi: true
    }
  ]
})
export class ReferenceTimeValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
    return referenceTimeValidator()(control);
  }
}

export function referenceTimeValidator() {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.parent.controls['current_video_length'] ||
      !control.parent.controls['reference_time_hours'] ||
      !control.parent.controls['reference_time_minutes'] ||
      !control.parent.controls['reference_time_seconds']) {
      return null;
    }
    const hours = parseFloat(control.parent.controls['reference_time_hours'].value) * 60 * 60;
    const min = parseFloat(control.parent.controls['reference_time_minutes'].value) * 60;
    const seconds = parseFloat(control.parent.controls['reference_time_seconds'].value);
    const totalSeconds = hours + min + seconds;
    if (totalSeconds > parseFloat(control.parent.controls['current_video_length'].value)) {
      return {
        'referenceTimeLength': {
          value: control.value
        }
      };
    }
    return null;
  };
}
