import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { SettingsService } from '../services/settings.service';
import { EN_TRANSLATIONS } from './translations';

export type AppLanguage = 'fa' | 'en';

interface PatternTranslation {
  pattern: RegExp;
  translate: (matches: RegExpMatchArray) => string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly storageKey = 'app-language';
  private readonly userStorageKeyPrefix = 'app-language:';
  private readonly languageSubject = new BehaviorSubject<AppLanguage>(this.readInitialLanguage());
  private readonly englishLabelMap: Record<string, string> = {
    'تاریخ ثبت': 'Created at',
    'تاریخ حذف': 'Deleted at',
    'تاریخ فروش': 'Sale date',
    'تاریخ و ساعت': 'Date & time',
    'تاریخ': 'Date',
    'تخفیف': 'Discount',
    'توضیحات': 'Description',
    'تعداد': 'Quantity',
    'جمع کل': 'Subtotal',
    'مالیات (۹%)': 'Tax (9%)',
    'مجموع نهایی': 'Grand total',
    'مشتری': 'Customer',
    'قیمت': 'Price',
    'قیمت واحد': 'Unit price',
    'نام فایل': 'File name',
    'نام انگلیسی فروشگاه': 'Store English name',
    'نام انگلیسی': 'English name',
    'نام خانوادگی': 'Last name',
    'نام دسته بندی': 'Category name',
    'نام محصول': 'Product name',
    'نام فروشگاه': 'Store name',
    'نام کاربری': 'Username',
    'نام': 'Name',
    'کد ملی': 'National ID',
    'صاحب فایل': 'File owner',
    'وضعیت': 'Status',
    'شماره فاکتور': 'Invoice no.',
    'محصول': 'Product',
    'دسته بندی': 'Category'
  };
  private readonly patternTranslations: PatternTranslation[] = [
    {
      pattern: /^(.+)\sمطلب$/,
      translate: (matches) => `${matches[1]} posts`
    },
    {
      pattern: /^(.+)\sمورد$/,
      translate: (matches) => `${matches[1]} items`
    },
    {
      pattern: /^وبلاگ\s+(.+)$/,
      translate: (matches) => `Blog ${matches[1]}`
    },
    {
      pattern: /^مشتری:\s*(.+?)\s*\|\s*مبلغ:\s*(.+?)\s*تومان$/,
      translate: (matches) => `Customer: ${matches[1]} | Amount: ${matches[2]} toman`
    },
    {
      pattern: /^آیا می‌خواهید نقش «(.+)» به عنوان پیش‌فرض تنظیم شود؟$/,
      translate: (matches) => `Do you want to set role "${matches[1]}" as the default?`
    },
    {
      pattern: /^([^:]+):\s*(.+)$/,
      translate: (matches) => {
        const translatedLabel = this.englishLabelMap[matches[1]];
        return translatedLabel ? `${translatedLabel}: ${matches[2]}` : matches[0];
      }
    }
  ];

  public readonly language$ = this.languageSubject.asObservable();

  public constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly titleService: Title,
    private readonly settingsService: SettingsService
  ) {
    this.applyLanguage(this.currentLanguage);
  }

  public get currentLanguage(): AppLanguage {
    return this.languageSubject.value;
  }

  public get direction(): 'rtl' | 'ltr' {
    return this.currentLanguage === 'fa' ? 'rtl' : 'ltr';
  }

  public get isRtl(): boolean {
    return this.direction === 'rtl';
  }

  public setLanguage(language: AppLanguage): void {
    this.persistLanguage(language);

    if (this.currentLanguage === language) {
      return;
    }

    this.languageSubject.next(language);
    this.applyLanguage(language);
  }

  public syncLanguageWithCurrentUser(): void {
    const currentUserId = this.getCurrentUserId();
    const storedLanguage = this.readStoredLanguage(currentUserId) ?? this.readStoredLanguage();

    if (storedLanguage) {
      this.setLanguage(storedLanguage);
      return;
    }

    this.persistLanguage(this.currentLanguage);
  }

  public translate(text: string, language: AppLanguage = this.currentLanguage): string {
    if (!text) {
      return text;
    }

    if (language === 'fa') {
      return text;
    }

    const normalized = this.normalizeText(text);
    if (!normalized) {
      return text;
    }

    const exactMatch = EN_TRANSLATIONS[normalized];
    if (exactMatch) {
      return this.preserveWhitespace(text, exactMatch);
    }

    for (const patternTranslation of this.patternTranslations) {
      const matches = normalized.match(patternTranslation.pattern);
      if (!matches) {
        continue;
      }

      const translated = patternTranslation.translate(matches);
      if (translated !== matches[0]) {
        return this.preserveWhitespace(text, translated);
      }
    }

    return text;
  }

  private applyLanguage(language: AppLanguage): void {
    const htmlElement = this.document.documentElement;
    const body = this.document.body;
    const direction = language === 'fa' ? 'rtl' : 'ltr';

    htmlElement.lang = language;
    htmlElement.dir = direction;
    body.dir = direction;

    body.classList.remove('rtl', 'ltr', 'app-lang-fa', 'app-lang-en');
    body.classList.add(direction, `app-lang-${language}`);

    this.titleService.setTitle(this.translate('فاکتورنو', language));
  }

  private readInitialLanguage(): AppLanguage {
    const storedLanguage = this.readStoredLanguage(this.getCurrentUserId()) ?? this.readStoredLanguage();
    return storedLanguage ?? 'fa';
  }

  private persistLanguage(language: AppLanguage): void {
    localStorage.setItem(this.storageKey, language);

    const currentUserId = this.getCurrentUserId();
    if (currentUserId) {
      localStorage.setItem(this.resolveUserStorageKey(currentUserId), language);
    }
  }

  private readStoredLanguage(userId?: string | null): AppLanguage | null {
    const storageKey = userId ? this.resolveUserStorageKey(userId) : this.storageKey;
    const storedLanguage = localStorage.getItem(storageKey);

    if (storedLanguage === 'fa' || storedLanguage === 'en') {
      return storedLanguage;
    }

    return null;
  }

  private getCurrentUserId(): string | null {
    return this.settingsService.getUser()?.id ?? null;
  }

  private resolveUserStorageKey(userId: string): string {
    return `${this.userStorageKeyPrefix}${userId}`;
  }

  private normalizeText(value: string): string {
    return value
      .replace(/\u00a0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private preserveWhitespace(original: string, replacement: string): string {
    const leading = original.match(/^\s*/)?.[0] ?? '';
    const trailing = original.match(/\s*$/)?.[0] ?? '';
    return `${leading}${replacement}${trailing}`;
  }
}
