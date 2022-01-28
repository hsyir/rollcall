<template>
  <v-container>
     <v-list
      flat
      subheader
    >
      <v-subheader>
      اقدامات
      ( {{ tasks.length }} / {{ doneTasks.length }} )
      </v-subheader>

      <v-list-item-group
        v-model="settings"
        multiple
        active-class=""
      >
        <v-list-item v-for="task in tasks" :key="task.title">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox readonly :input-value="task.done"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ task.title}}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </div>
</v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  layout: "basic",

  metaInfo() {
    return { title: this.$t("home") };
  },

  data: () => ({
    settings: [],
    title: window.config.appName,
    tasks: [
      {
        title: "لایوت اس پی ای چند زبانه",
        done: true,
      },
      {
        title: "طراحی قالب متریال دیزاین",
        done: true,
      },
      {
        title: "تنظیمات پروفایل سیموتل",
        done: true,
      },
      {
        title: "تنظیمات داخلی سیموتل کاربران",
        done: true,
      },
      {
        title: "تنظیمات پوشر",
        done: true,
      },
      {
        title: "امکان اتصال به پوشر کاستومایز شده (سرور اصلی و متفرقه)",
        done: false,
      },
      {
        title: "ایونت تماس جدید",
        done: false,
      },
      {
        title: "داشبورد تست اتصال به پوشر و سیموتل برای کاربران",
        done: true,
      },
      {
        title: "ورود مخاطبین از فایل اکسل",
        done: false,
      },
      {
        title: "ایجاد ای پی آی ایمپورت مخاطبین",
        done: false,
      },
      {
        title: "امکان انتقال تماس سیموتل",
        done: false,
      },
      /*       {
        title: 'لایوت اس پی ای چند زبانه',
        done: true
      },
      {
        title: 'ابری کردن دیتابیس',
        done: true
      },
      {
        title: 'تنظیمات پروفایل سیموتل',
        done: true
      },
      {
        title: 'تنظیمات داخلی سیموتل کاربران',
        done: true
      },
      {
        title: 'تنظیمات پوشر',
        done: true
      },
      {
        title: 'امکان اتصال به پوشر کاستومایز شده (سرور اصلی و متفرقه)',
        done: false
      },
      {
        title: 'ایونت تماس جدید',
        done: false
      },
      {
        title: ' اتصال به پوشر در کانال خصوصی',
        done: true
      },
      {
        title: 'اتصال به کانال پوشر',
        done: true
      },
      {
        title: 'تکمیل پروفایل کاربر',
        done: false
      },
      {
        title: 'تکمیل اطلاعات مشتری',
        done: false
      },
      {
        title: 'داشبورد تست اتصال به پوشر و سیموتل برای کاربران',
        done: true
      },
      {
        title: 'تنظیمات سطح دسترسی',
        done: false
      },
      {
        title: 'اتصال به پنل پیامکی',
        done: false
      },
      {
        title: 'سامانه ایجاد اپلیکیشن ابری',
        done: false
      },
      {
        title: 'اتصال به وب سرویس ایجاد اپ پوشر',
        done: false
      },
      {
        title: 'اتصال به وب سرویس سیموتل برای اپ جدید',
        done: false
      } */
    ],
  }),

  computed: {
    ...mapGetters({
      authenticated: "auth/check",
    }),
    doneTasks: function () {
      return this.tasks.filter((item) => item.done);
    },
    undoneTasks: function () {
      return this.tasks.filter((item) => !item.done);
    },
  },
};
</script>

<style scoped>
.top-right {
  position: absolute;
  right: 10px;
  top: 18px;
}

.title {
  font-size: 50px;
}
</style>
