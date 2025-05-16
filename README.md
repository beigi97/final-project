# Movie Center

This project uses the following API to fetch movie information:

> `https://moviesapi.codingfront.dev/api/v1/movies`

##### API Features:

- Movie title
- IMDb rating
- Image (Poster)
- Year of production and other information

---

#### Features

- Display IMDb movie list
- Search by movie name
- Filter movies by genre
- Unlimited loading (Infinite Scroll)

### Technologies Used

- React
- Vite
- Axios
- Tailwind CSS
- flowbite
- i18next
- react-i18next

### Multilingual Support

This project supports multilingual functionality using the `i18next` and `react-i18next` libraries. The `LanguageSwitcher` component enables switching between languages.

#### How it Works

- The `LanguageSwitcher` component is implemented using the `useTranslation` hook from the `react-i18next` library.
- Clicking the language switch button toggles between Persian (FA) and English (EN).
- When the language changes, the page direction automatically changes (RTL for Persian and LTR for English).

#### i18n Configuration

- The `src/i18n.js` file contains the main i18n settings.
- Translations are defined in the `resources` object.
- To add a new language:
  1. Add a new key to the `resources` object.
  2. Place the translations for the new language in the `translation` section.
  3. Update the `LanguageSwitcher` component to support the new language.

#### Translation Usage Example

```jsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t("appTitle")}</h1>;
}
```

### Project Setup

1. Clone the repository
2. Run `npm install`
3. Rename `.env.example` to `.env` and add environment values
4. Run `npm run dev`
