import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[min]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinDirective, multi: true }]
})
export class MinDirective {

  constructor() { }

  @Input() min: number;

  validate(control: AbstractControl): { [key: string]: any } {
    return Validators.min(this.min)(control)
  }

}
