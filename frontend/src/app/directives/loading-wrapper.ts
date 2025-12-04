import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoadingWrapper]',
  standalone: true,
})
export class LoadingWrapper{
  private isLoading = false;

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) {}

  @Input() set appLoadingWrapper(loading: boolean) {
    this.isLoading = loading;
    this.updateView();
  }

  updateView() {
    this.vcr.clear();

    if (this.isLoading) {
      const loadingEl = document.createElement('div');
      loadingEl.textContent = 'Loading...';
      loadingEl.className = 'loading';
      this.vcr.createEmbeddedView(this.tpl);
      this.vcr.element.nativeElement.parentNode.insertBefore(loadingEl, this.vcr.element.nativeElement);
    } else {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}
