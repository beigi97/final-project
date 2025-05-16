import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appTitle: "MovieCenter",
      appDescription_part1: "List of movies and TV Shows, I,",
      appDescription_name: "Pramod Poudel",
      appDescription_part2:
        "have watched till date. Explore what I have watched and also feel free to make a suggestion.😉",
      search_placeholder: "Search Movies or TV Shows",
      no_results: "No results found.",
      no_more_movies_genre: "No more movies in this genre.",
      no_more_movies: "No more movies available.",
      loading: "Loading...",
      more: "More",
      all: "All",
      All: "All",
    },
  },
  fa: {
    translation: {
      appTitle: "مرکز فیلم",
      appDescription_part1: "لیستی از فیلم‌ها و سریال‌هایی که من،",
      appDescription_name: "پرامود پودل",
      appDescription_part2:
        "تا به امروز دیده‌ام. ببین من چی دیدم و اگر خواستی پیشنهادی هم بده.😉",
      search_placeholder: "جستجوی فیلم‌ها یا سریال‌ها",
      no_results: "نتیجه‌ای یافت نشد.",
      no_more_movies_genre: "فیلم دیگری در این ژانر موجود نیست.",
      no_more_movies: "فیلم دیگری موجود نیست.",
      loading: "در حال بارگذاری...",
      more: "بیشتر",
      all: "همه",
      All: "همه",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
