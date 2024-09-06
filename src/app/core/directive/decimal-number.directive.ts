import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appDecimalNumber]',
  standalone: true
})
export class DecimalNumberDirective {

  private regex: RegExp = new RegExp(/^\d+(\.\d{0,2})?$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow special keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Prevent invalid input
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    if (value && !isNaN(value as any)) {
      this.el.nativeElement.value = parseFloat(value).toFixed(2);
    }
  }

}
