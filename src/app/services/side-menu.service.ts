import { Injectable } from '@angular/core';

export interface SideMenuItem {
  Route: string;
  Text: string;
  Icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  public readonly items: SideMenuItem[] = [
    { Route: '/dashboard', Text: 'داشبورد', Icon: 'home' },
    { Route: '/stores', Text: 'فروشگاه', Icon: 'store' },
    { Route: '/factors', Text: 'صدور فاکتور', Icon: 'receipt' },
    { Route: '/products', Text: 'محصولات', Icon: 'shopping_cart' },
    { Route: '/categories', Text: 'دسته بندی‌ محصولات', Icon: 'list' },
    { Route: '/customers', Text: 'مشتریان', Icon: 'supervised_user_circle' },
    { Route: '/gallery', Text: 'گالری تصاویر', Icon: 'photo_library' },
    { Route: '/users', Text: 'کاربران', Icon: 'supervisor_account' },
    { Route: '/role', Text: 'نقش‌ها و دسترسی‌ها', Icon: 'vpn_key' },
    { Route: '/weblog', Text: 'وبلاگ', Icon: 'library_books' },
    { Route: '/postcats', Text: 'دسته بندی مطالب', Icon: 'list_alt' },
    { Route: '/slides', Text: 'اسلایدها', Icon: 'slideshow' },
  ];

  public findByUrl(url: string): SideMenuItem | null {
    for (const item of this.items) {
      if (url === item.Route || url.startsWith(item.Route + "/")) {
        return item;
      }
    }
    return null;
  }
}
