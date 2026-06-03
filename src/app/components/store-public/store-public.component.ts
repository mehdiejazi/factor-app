import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BlogPost } from '../../interfaces/blog-post/blog-post';
import { Store } from '../../interfaces/store/store';
import { BlogPostService } from '../../services/blog-post.service';
import { SettingsService } from '../../services/settings.service';
import { StoreService } from '../../services/store.service';
import { HttpRequestResultT } from '../../models/http-request-result-t';

@Component({
  selector: 'app-store-public',
  templateUrl: './store-public.component.html',
  styleUrl: './store-public.component.css'
})
export class StorePublicComponent implements OnInit {
  public store: Store | null = null;
  public storeExternalUrl: string | null = null;
  public slides: BlogPost[] = [];
  public blogPosts: BlogPost[] = [];
  public errorMessages: string[] = [];
  public isLoading = true;

  public constructor(
    private _route: ActivatedRoute,
    private _storeService: StoreService,
    private _blogPostService: BlogPostService,
    private _settingsService: SettingsService
  ) { }

  public ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const storeEnglishName = (params.get('storeEnglishName') || '').trim();
      this.loadPage(storeEnglishName);
    });
  }

  private loadPage(storeEnglishName: string): void {
    this.isLoading = true;
    this.errorMessages = [];
    this.store = null;
    this.storeExternalUrl = null;
    this.slides = [];
    this.blogPosts = [];

    if (!storeEnglishName) {
      this.errorMessages = ['نام انگلیسی فروشگاه مشخص نشده است.'];
      this.isLoading = false;
      return;
    }

    this._storeService.getByStoreEnglishNameAsync(storeEnglishName).subscribe({
      next: (storeResult: HttpRequestResultT<Store>) => {
        if (!storeResult.isSuccessful || !storeResult.data) {
          this.errorMessages = storeResult.errorMessages?.length
            ? storeResult.errorMessages
            : ['فروشگاه موردنظر پیدا نشد.'];
          this.isLoading = false;
          return;
        }

        this.store = storeResult.data;
        this.normalizeStore();

        if (!this.store.ownerId) {
          this.errorMessages = ['شناسه مالک فروشگاه برای واکشی محتوا در دسترس نیست.'];
          this.isLoading = false;
          return;
        }

        forkJoin({
          slidesResult: this._blogPostService.getByOwnerPublishedHotAsync(this.store.ownerId),
          postsResult: this._blogPostService.getByOwnerPublishedAsync(this.store.ownerId)
        }).subscribe({
          next: ({ slidesResult, postsResult }) => {
            const slides = slidesResult?.isSuccessful ? (slidesResult.data || []) : [];
            const posts = postsResult?.isSuccessful ? (postsResult.data || []) : [];

            this.slides = this.normalizePosts(slides);
            const slideIds = new Set(this.slides.map(post => post.id));
            this.blogPosts = this.normalizePosts(posts).filter(post => !slideIds.has(post.id));

            this.errorMessages = [
              ...(slidesResult?.errorMessages || []),
              ...(postsResult?.errorMessages || [])
            ];

            this.isLoading = false;
          },
          error: () => {
            this.errorMessages = ['خطا در دریافت اسلایدها یا مطالب وبلاگ فروشگاه.'];
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.errorMessages = ['خطا در دریافت اطلاعات فروشگاه.'];
        this.isLoading = false;
      }
    });
  }

  private normalizeStore(): void {
    if (!this.store) {
      return;
    }

    if (this.store.logo?.url) {
      this.store.logo.url = this.getAbsoluteUrl(this.store.logo.url);
    }

    this.storeExternalUrl = this.getValidExternalUrl(this.store.url);
  }

  private normalizePosts(posts: BlogPost[]): BlogPost[] {
    return [...posts]
      .map(post => {
        if (post.coverImage?.url) {
          post.coverImage.url = this.getAbsoluteUrl(post.coverImage.url);
        }
        return post;
      })
      .sort((a, b) => this.toTime(b.publishDateTime || b.insertDateTime) - this.toTime(a.publishDateTime || a.insertDateTime));
  }

  private getAbsoluteUrl(url: string): string {
    if (!url) {
      return '';
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    if (url.startsWith('/')) {
      return `${this._settingsService.baseUrl}${url}`;
    }

    return `${this._settingsService.baseUrl}/${url}`;
  }

  private toTime(value: string): number {
    const parsed = Date.parse(value || '');
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  private getValidExternalUrl(url: string): string | null {
    const rawUrl = (url || '').trim();
    if (!rawUrl) {
      return null;
    }

    const normalizedUrl = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;

    try {
      const parsedUrl = new URL(normalizedUrl);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return null;
      }
      return parsedUrl.href;
    } catch {
      return null;
    }
  }
}
