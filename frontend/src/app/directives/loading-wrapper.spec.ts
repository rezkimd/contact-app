import { LoadingWrapper } from './loading-wrapper';
import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

describe('LoadingWrapperDirective', () => {
  it('should create an instance', () => {
    const tpl = {} as TemplateRef<any>;
    const vcr = {
      clear: () => {},
      createEmbeddedView: () => {},
      element: { nativeElement: document.createElement('div') }
    } as any as ViewContainerRef;

    const directive = new LoadingWrapper(tpl, vcr);
    expect(directive).toBeTruthy();
  });
});
