import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import momentJalaali from 'moment-jalaali';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-persian-date-modal',
  templateUrl: './persian-date-modal.component.html',
  styleUrl: './persian-date-modal.component.css'
})
export class PersianDateModalComponent implements OnInit {
  public active: boolean = false;
  public title: string = 'انتخاب تاریخ';
  public onClose: Subject<boolean>;
  public date: Date = undefined;
  public persianDate: string = undefined;
  public isTimeEnabled: boolean = false;
  public dateFormat: string = "jDD/jMM/jYYYY";

  public form: UntypedFormGroup;

  // برای نمایش تقویم
  public currentJalaliYear: number;
  public currentJalaliMonth: number;
  public calendarDays: any[] = [];
  public monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  constructor(
    private _bsModalRef: BsModalRef,
    private _fb: UntypedFormBuilder,
  ) {
    this.form = this._fb.group({
      jYear: ['', Validators.required],
      jMonth: ['', Validators.required],
      jDay: ['', Validators.required],
      hour: ['00'],
      minute: ['00'],
    });
  }

  ngOnInit(): void {
    this.onClose = new Subject();
    const today = momentJalaali();
    this.currentJalaliYear = today.jYear();
    this.currentJalaliMonth = today.jMonth() + 1;
    this.generateCalendar();
  }

  public showConfirmationModal(isTimeEnabled: boolean): void {
    this.isTimeEnabled = isTimeEnabled;
    if (this.isTimeEnabled) {
      this.dateFormat = 'jDD/jMM/jYYYY HH:mm';
    } else {
      this.dateFormat = 'jDD/jMM/jYYYY';
    }
    this.active = true;
  }

  /**
   * تقویم را برای ماه جاری تولید کنید
   */
  private generateCalendar(): void {
    this.calendarDays = [];

    // روز اول ماه
    const firstDay = momentJalaali([this.currentJalaliYear, this.currentJalaliMonth - 1, 1]);
    const daysInMonth = this.getDaysInJalaliMonth(this.currentJalaliMonth, this.currentJalaliYear);
    let dayOfWeek = firstDay.day(); // 0 = یکشنبه

    // اگر بخواهیم شنبه اولین روز هفته باشد
    dayOfWeek = (dayOfWeek + 1) % 7; // 0 = شنبه، 1 = یکشنبه، ...

    // خانه‌های خالی قبل از اول ماه
    for (let i = 0; i < dayOfWeek; i++) {
      this.calendarDays.push(null);
    }

    // روزهای ماه
    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push(day);
    }
  }

  /**
   * تعداد روزهای ماه جلالی را محاسبه کنید
   */
  private getDaysInJalaliMonth(month: number, year: number): number {
    if (month <= 6) {
      return 31;
    } else if (month <= 11) {
      return 30;
    } else {
      // برای اسفند
      return this.isJalaliLeapYear(year) ? 30 : 29;
    }
  }

  /**
   * بررسی کنید آیا سال جلالی leap است
   */
  private isJalaliLeapYear(jYear: number): boolean {
    // الگوریتم تعیین سال کبیسه جلالی
    const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];

    let sum = 0;
    for (let i = 0; i < breaks.length; i++) {
      if (jYear <= breaks[i]) {
        sum = i;
        break;
      }
    }

    const n = breaks[sum] - (sum > 0 ? breaks[sum - 1] : 0);
    const leap = ((sum % 4 === 0) && sum > 0) ? (sum % 7 <= 3 ? 1 : 0) : (n % 4 === 0 ? 1 : 0);
    return leap === 1;
  }

  /**
   * روز را انتخاب کنید
   */
  public selectDay(day: number): void {
    if (!day) return;

    this.form.patchValue({
      jYear: this.currentJalaliYear,
      jMonth: this.currentJalaliMonth,
      jDay: day
    });

    this.date = this.jalaliToGregorian(
      this.currentJalaliYear,
      this.currentJalaliMonth,
      day
    );

    console.log('تاریخ انتخاب شده:', this.date.toString());
  }

  /**
   * ماه قبلی رو نشان بده
   */
  public previousMonth(): void {
    if (this.currentJalaliMonth === 1) {
      this.currentJalaliMonth = 12;
      this.currentJalaliYear--;
    } else {
      this.currentJalaliMonth--;
    }
    this.generateCalendar();
  }

  /**
   * ماه بعدی رو نشان بده
   */
  public nextMonth(): void {
    if (this.currentJalaliMonth === 12) {
      this.currentJalaliMonth = 1;
      this.currentJalaliYear++;
    } else {
      this.currentJalaliMonth++;
    }
    this.generateCalendar();
  }

  /**
   * تاریخ جلالی را به میلادی تبدیل کنید
   */
  private jalaliToGregorian(jYear: number, jMonth: number, jDay: number): Date {
    try {
      const m = momentJalaali(`${jYear}/${jMonth}/${jDay}`, 'jYYYY/jMM/jDD');
      if (m.isValid()) {
        return m.toDate();
      }
    } catch (error) {
      console.error('خطا در تبدیل تاریخ:', error);
    }
    return new Date();
  }

  /**
   * تایید انتخاب تاریخ
   */
  public onConfirm(): void {
    if (!this.form.valid || !this.date) {
      console.error('فرم نامعتبر است یا تاریخ انتخاب نشده');
      return;
    }

    const { jYear, jMonth, jDay, hour, minute } = this.form.value;

    // تاریخ جلالی به میلادی
    this.date = this.jalaliToGregorian(jYear, jMonth, jDay);

    // اگر زمان فعال باشد
    if (this.isTimeEnabled && hour && minute) {
      this.date.setHours(parseInt(hour, 10));
      this.date.setMinutes(parseInt(minute, 10));
    }

    // تاریخ جلالی برای نمایش
    const jalaliMoment = momentJalaali(this.date);
    this.persianDate = jalaliMoment.format(this.dateFormat);

    console.log('✓ تاریخ انتخاب شده (میلادی):', this.date.toString());
    console.log('✓ تاریخ انتخاب شده (جلالی):', this.persianDate);

    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();
  }

  /**
   * انصراف از انتخاب تاریخ
   */
  public onCancel(): void {
    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();
  }

  public hideConfirmationModal(): void {
    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();
  }
}
