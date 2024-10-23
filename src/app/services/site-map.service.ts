import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteMapService {
  public routineMakerRoutes = [''];

  public adminMenus = [
    {
      Header: "منوی اصلی",
      Menus: [
        {
          Route: "/home",
          Text: "داشبورد",
          Icon: "home",
        },
        {
          Route: "/questionnaires",
          Text: "مدیریت پرسشنامه‌ها",
          Icon: "assignment",
        },
        {
          Route: "/questions",
          Text: "مدیریت سوالات",
          Icon: "live_help",
        },
        {
          Route: "/keysheets",
          Text: "مدیریت پاسخنامه",
          Icon: "assignment_turned_in",
        },
        {
          Route: "/users",
          Text: "مدیریت کاربران",
          Icon: "supervisor_account",
        },
        {
          Route: "/profile",
          Text: "پروفایل من",
          Icon: "account_circle",
        }
      ]
    },
    {
      Header: "مدیریت مالی",
      Menus: [
        {
          Route: "/plans",
          Text: "طرحهای اشتراک",
          Icon: "monetization_on",
        }
      ]
    },
    {
      Header: "مدیریت محتوا",
      Menus: [
        {
          Route: "/gallery",
          Text: "مدیریت تصاویر",
          Icon: "photo_library",
        },
        {
          Route: "/slides",
          Text: "مدیریت اسلایدها",
          Icon: "slideshow",
        },
        {
          Route:"/categories",
          Text: "دسته بندی محصولات",
          Icon: "list"
        }
      ]
    }
  ];

  public adminRoutes =
    ["home",
      "questionnaires",
      "questions",
      "keysheets",
      "users",
      "profile",
      "plans",
      "gallery",
      "slides",
      "categories"
    ];

}
