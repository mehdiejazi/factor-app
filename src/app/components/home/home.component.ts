import { Component } from '@angular/core';

interface LandingStat {
  value: string;
  label: string;
}

interface LandingFeature {
  icon: string;
  title: string;
  description: string;
}

interface LandingStep {
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly stats: LandingStat[] = [
    { value: '۹', label: 'ماژول مدیریتی فعال در پنل' },
    { value: '۲', label: 'خروجی فاکتور: پرینت و PDF' },
    { value: '۳', label: 'بخش فاکتور: لیست، جزئیات، نمایش' },
    { value: '۱', label: 'گالری یکپارچه مدیریت تصاویر' }
  ];

  readonly features: LandingFeature[] = [
    {
      icon: 'storefront',
      title: 'مدیریت فروشگاه ها',
      description: 'ایجاد، ویرایش و حذف فروشگاه همراه با ثبت لوگو و اطلاعات پایه هر فروشگاه.'
    },
    {
      icon: 'inventory_2',
      title: 'محصولات و دسته بندی محصولات',
      description: 'مدیریت کامل محصولات، قیمت و دسته بندی برای ثبت دقیق کالاها در فرآیند فروش.'
    },
    {
      icon: 'groups',
      title: 'مدیریت مشتریان',
      description: 'ثبت، ویرایش و حذف مشتریان و استفاده از اطلاعات آن ها در زمان صدور فاکتور.'
    },
    {
      icon: 'receipt_long',
      title: 'ثبت و مدیریت فاکتور',
      description: 'ایجاد فاکتور جدید، مشاهده لیست فاکتورها و ورود به صفحه جزئیات هر فاکتور.'
    },
    {
      icon: 'calculate',
      title: 'مدیریت آیتم های فاکتور',
      description: 'افزودن آیتم، تغییر تعداد، تعیین تخفیف درصدی و محاسبه قیمت نهایی هر ردیف.'
    },
    {
      icon: 'print',
      title: 'نمایش، پرینت و دانلود PDF فاکتور',
      description: 'مشاهده نسخه نهایی فاکتور در مسیر اختصاصی، چاپ مستقیم و دریافت فایل PDF.'
    },
    {
      icon: 'image',
      title: 'گالری تصاویر',
      description: 'آپلود، نمایش و حذف تصاویر برای استفاده در بخش های مختلف سامانه.'
    },
    {
      icon: 'manage_accounts',
      title: 'مدیریت کاربران',
      description: 'ثبت کاربران، تغییر وضعیت فعال/غیرفعال، اجبار تغییر رمز و اتصال کاربر به فروشگاه ها.'
    },
    {
      icon: 'article',
      title: 'وبلاگ و دسته بندی مطالب',
      description: 'ثبت و ویرایش پست، مدیریت انتشار/داغ شدن پست ها و مدیریت دسته بندی مطالب.'
    }
  ];

  readonly workflow: LandingStep[] = [
    {
      title: 'تعریف ساختار پایه',
      description: 'ابتدا فروشگاه، محصولات، دسته بندی ها و مشتریان را در پنل ثبت کنید.'
    },
    {
      title: 'صدور فاکتور و مدیریت آیتم ها',
      description: 'فاکتور را ایجاد کنید، آیتم ها را اضافه کنید و تعداد یا تخفیف هر آیتم را تنظیم کنید.'
    },
    {
      title: 'خروجی نهایی فاکتور',
      description: 'فاکتور را در نمای نهایی مشاهده کنید و در صورت نیاز پرینت یا فایل PDF دریافت کنید.'
    }
  ];
}
