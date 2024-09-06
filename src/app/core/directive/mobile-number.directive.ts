import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMobileNumber]',
  standalone: true
})
export class MobileNumberDirective {

  private regexS: RegExp = new RegExp(/^\d{0,10}$/g);
  private specialKey: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private elM: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow special keys
    if (this.specialKey.indexOf(event.key) !== -1) {
      return;
    }

    // Prevent invalid input
    let current: string = this.elM.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regexS)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let input: string = this.elM.nativeElement.value;
    if (input.length > 10) {
      this.elM.nativeElement.value = input.slice(0, 10);
    }
  }

}
