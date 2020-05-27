import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private _themeLinkMap = new Map<string, HTMLLinkElement>();

  constructor(
    @Inject(DOCUMENT) private readonly _document: Document,
  ) { }

  public hasTheme(fileName: string): boolean {
    return this._themeLinkMap.has(fileName);
  }

  public loadTheme(fileName: string): void {
      const link = this._document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', fileName);

      link.onload = () => {
        this._themeLinkMap.set(fileName, link);
      };

      this._document.head.appendChild(link);
  }

  removeTheme(fileName: string): void {
    const link = this._themeLinkMap.get(fileName);
    this._document.head.removeChild(link);
    this._themeLinkMap.delete(fileName);
  }

  public removeAllThemes(): void {
    this._themeLinkMap
      .forEach((themeLink) => this._document.head.removeChild(themeLink));
    this._themeLinkMap.clear();
  }
}
