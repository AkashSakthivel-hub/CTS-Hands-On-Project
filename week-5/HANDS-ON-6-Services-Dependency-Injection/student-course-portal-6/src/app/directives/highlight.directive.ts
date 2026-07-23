import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// Task 3: Custom Directive - Highlight on hover
// @HostListener automatically handles event listener cleanup
// No need to manually add/remove listeners - Angular manages lifecycle
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  // Task 3: Configurable highlight color via input binding
  // Allows caller to pass custom color: <div appHighlight='lightblue'>
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
