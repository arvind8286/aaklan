import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAdharNumber]',
  standalone: true
})
export class AdharNumberDirective {

  private regex: RegExp = new RegExp(/^\d{0,12}$/g);
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

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let input: string = this.el.nativeElement.value;
    if (input.length > 12) {
      this.el.nativeElement.value = input.slice(0, 12);
    }
  }


}
