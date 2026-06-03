import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from './language.service';

interface TranslationState {
  source: string;
  rendered: string;
}

@Directive({
  selector: '[appLocalizedContent]'
})
export class LocalizedContentDirective implements AfterViewInit, OnDestroy {
  private readonly textState = new WeakMap<Text, TranslationState>();
  private readonly attributeState = new WeakMap<Element, Map<string, TranslationState>>();
  private readonly translatableAttributes = ['placeholder', 'title', 'alt', 'aria-label'];
  private observer?: MutationObserver;
  private subscription?: Subscription;

  public constructor(
    private readonly languageService: LanguageService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  public ngAfterViewInit(): void {
    this.translateTree(this.document.body);

    this.subscription = this.languageService.language$.subscribe(() => {
      queueMicrotask(() => this.translateTree(this.document.body));
    });

    this.observer = new MutationObserver(() => {
      this.translateTree(this.document.body);
    });

    this.observer.observe(this.document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: this.translatableAttributes
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.observer?.disconnect();
  }

  private translateTree(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      this.translateTextNode(node as Text);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const element = node as Element;
    if (this.shouldSkipElement(element)) {
      return;
    }

    this.translateElementAttributes(element);
    element.childNodes.forEach((childNode) => this.translateTree(childNode));
  }

  private translateTextNode(textNode: Text): void {
    const currentValue = textNode.textContent ?? '';
    if (!currentValue.trim()) {
      return;
    }

    const existingState = this.textState.get(textNode);
    const expectedRenderedValue = existingState
      ? this.languageService.translate(existingState.source)
      : currentValue;

    const state = existingState ?? {
      source: currentValue,
      rendered: currentValue
    };

    if (existingState && currentValue !== existingState.rendered && currentValue !== expectedRenderedValue) {
      state.source = currentValue;
    }

    const translatedValue = this.languageService.translate(state.source);
    if (translatedValue !== currentValue) {
      textNode.textContent = translatedValue;
    }

    state.rendered = translatedValue;
    this.textState.set(textNode, state);
  }

  private translateElementAttributes(element: Element): void {
    let stateMap = this.attributeState.get(element);
    if (!stateMap) {
      stateMap = new Map<string, TranslationState>();
      this.attributeState.set(element, stateMap);
    }

    for (const attributeName of this.translatableAttributes) {
      const currentValue = element.getAttribute(attributeName);
      if (!currentValue || !currentValue.trim()) {
        continue;
      }

      const existingState = stateMap.get(attributeName);
      const expectedRenderedValue = existingState
        ? this.languageService.translate(existingState.source)
        : currentValue;

      const state = existingState ?? {
        source: currentValue,
        rendered: currentValue
      };

      if (existingState && currentValue !== existingState.rendered && currentValue !== expectedRenderedValue) {
        state.source = currentValue;
      }

      const translatedValue = this.languageService.translate(state.source);
      if (translatedValue !== currentValue) {
        element.setAttribute(attributeName, translatedValue);
      }

      state.rendered = translatedValue;
      stateMap.set(attributeName, state);
    }
  }

  private shouldSkipElement(element: Element): boolean {
    if (element.hasAttribute('data-localization-skip')) {
      return true;
    }

    const tagName = element.tagName.toUpperCase();
    return ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA'].includes(tagName);
  }
}
