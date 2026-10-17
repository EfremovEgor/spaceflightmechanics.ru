import type { DetailedHTMLProps, MetaHTMLAttributes } from "react";
import { RU_ENABLED, type Lang } from "@/i18n";
export interface Route {
  name: string;
  path: string;
  meta?: DetailedHTMLProps<
    MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
  routes?: { [key: string]: Route };
  hidden?: boolean;
  showInNav?: boolean;
  disabled?: boolean;
}
export type TRoutes = { [key: string]: Route };

export const makeMetaTitle = (title: string) => {
  return `7th SciTech Forum on Space Engineering and Operations Support | ${title}`;
};

export const SITE_URL = "https://spacescitech.com";
export const OG_IMAGE = {
  en: `${SITE_URL}/og-image.jpg`,
  ru: `${SITE_URL}/og-image-ru.jpg`,
};

/** Absolute URL in the form the server serves pages (directories, trailing slash). */
export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`}`;

const OG_ALT = {
  en: "7th SciTech Forum on Space Engineering and Operations Support, November 24-26, 2026, RUDN University, Moscow, Russia",
  ru: "7th SciTech Forum on Space Engineering and Operations Support, 24–26 ноября 2026 г., РУДН, Москва",
};

/** Defaults shared by every page; route heads override them by name/property. */
export const siteHead = {
  meta: [
    { property: "og:site_name", content: "SciTech Forum 2026" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: OG_IMAGE.en },
    { property: "og:image:secure_url", content: OG_IMAGE.en },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: OG_ALT.en },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: OG_IMAGE.en },
    { name: "twitter:image:alt", content: OG_ALT.en },
  ],
};

const RU_KEYWORDS =
  "космос, космические полёты, механика космического полёта, космическая техника, форум, SciTech, РУДН, РАН, конференция";

export const makeMetaTitleRu = (title: string) =>
  `7th SciTech Forum on Space Engineering and Operations Support | ${title}`;

/** Russian titles and descriptions, keyed by route name. */
const RU_META: Record<string, { title: string; description: string }> = {
  home: {
    title: "Главная",
    description:
      "7th SciTech Forum on Space Engineering and Operations Support пройдёт 24–26 ноября 2026 г. в РУДН, Москва, Россия",
  },
  committee: {
    title: "Программный комитет",
    description:
      "Международный программный комитет: председатель Юрий Н. Разумный, 7 сопредседателей и 14 членов. Форум проходит в главном здании РУДН",
  },
  program: {
    title: "Техническая программа",
    description:
      "Подробная программа форума: многодневная повестка с докладами и семинарами о новейших технических разработках",
  },
  highlight_lectures: {
    title: "Ключевые лекции",
    description:
      "Главные темы форума: программные выступления авторитетных спикеров и самые актуальные вопросы отрасли",
  },
  roundtable_meetings: {
    title: "Круглые столы",
    description:
      "Интерактивные дискуссии в небольших группах: совместная работа, обсуждение актуальных тенденций и решение общих задач отрасли",
  },
  technical_sessions: {
    title: "Технические сессии",
    description:
      "Основная научно-техническая программа форума: исследовательские доклады и проверенные технические решения",
  },
  plenary_sessions: {
    title: "Пленарные заседания",
    description: "Пленарные заседания 7th SciTech Forum on Space Engineering and Operations Support",
  },
  submission: {
    title: "Правила подачи",
    description:
      "Подайте оригинальное исследование, кейс или технический доклад, чтобы войти в академическую и профессиональную программу форума",
  },
  registration: {
    title: "Регистрация",
    description:
      "Зарегистрируйтесь, чтобы участвовать в форуме и общаться с ведущими специалистами отрасли",
  },
  contact: {
    title: "Контакты",
    description:
      "Свяжитесь с организационным комитетом по вопросам регистрации, выступлений и логистики",
  },
};

const withLang = (path: string, lang: Lang) => {
  const base = path.replace(/\/+$/, "") || "/";
  if (lang === "en") return base;
  return base === "/" ? "/ru/" : `/ru${base}`;
};

/**
 * Head for a page in one language: title, description and keywords plus
 * canonical, hreflang alternates, Open Graph and Twitter tags for link previews.
 * `path` is the page's English path.
 */
export const pageHead = (route: Route, path = route.path, lang: Lang = "en") => {
  const enMeta = route.meta ?? [];
  const ru = lang === "ru" ? RU_META[route.name] : undefined;
  const title = ru
    ? makeMetaTitleRu(ru.title)
    : (enMeta.find((m) => "title" in m && m.title)?.title as string | undefined);
  const description = ru
    ? ru.description
    : enMeta.find((m) => m.name === "description")?.content;
  const meta = ru
    ? [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: RU_KEYWORDS },
      ]
    : enMeta;
  const urls = {
    en: absoluteUrl(withLang(path, "en")),
    ru: absoluteUrl(withLang(path, "ru")),
  };
  return {
    meta: [
      ...meta,
      { property: "og:url", content: urls[lang] },
      { property: "og:locale", content: lang === "ru" ? "ru_RU" : "en_US" },
      ...(RU_ENABLED
        ? [{ property: "og:locale:alternate", content: lang === "ru" ? "en_US" : "ru_RU" }]
        : []),
      { property: "og:image", content: OG_IMAGE[lang] },
      { property: "og:image:secure_url", content: OG_IMAGE[lang] },
      { property: "og:image:alt", content: OG_ALT[lang] },
      { name: "twitter:image", content: OG_IMAGE[lang] },
      { name: "twitter:image:alt", content: OG_ALT[lang] },
      ...(title
        ? [
            { property: "og:title", content: title },
            { name: "twitter:title", content: title },
          ]
        : []),
      ...(description
        ? [
            { property: "og:description", content: description },
            { name: "twitter:description", content: description },
          ]
        : []),
    ],
    links: [
      { rel: "canonical", href: urls[lang] },
      ...(RU_ENABLED
        ? [
            { rel: "alternate", hrefLang: "en", href: urls.en },
            { rel: "alternate", hrefLang: "ru", href: urls.ru },
            { rel: "alternate", hrefLang: "x-default", href: urls.en },
          ]
        : []),
      // VK and some older parsers read this instead of og:image.
      { rel: "image_src", href: OG_IMAGE[lang] },
    ],
  };
};

const keywords = {
  name: "keywords",
  content: "space, flights, scitech, forum, engineering, mechanics",
};

export const Routes: TRoutes = {
  home: {
    name: "home",
    path: "/",
    meta: [
      {
        title: makeMetaTitle("Home"),
      },
      {
        name: "description",
        content:
          "7th SciTech Forum on Space Engineering and Operations Support is taking place on November 24-26, 2026 in RUDN University, Moscow, Russia",
      },
      keywords,
    ],
    showInNav: true,
  },
  committee: {
    name: "committee",
    path: "/committee",
    meta: [
      {
        title: makeMetaTitle("Program Committee"),
      },
      {
        name: "description",
        content:
          "International program committee is consisted of the chair Yury N. Razoumny, 7 co-chairs and 14 members. The Forum is taking place in the main building of RUDN university",
      },
      keywords,
    ],
    showInNav: true,
  },
  sessions_and_highlights: {
    name: "sessions_and_highlights",
    path: "/sessions-and-highlights",
    showInNav: true,

    routes: {
      program: {
        name: "program",
        path: "program",
        showInNav: true,
        meta: [
          {
            title: makeMetaTitle("Technical Program"),
          },
          {
            name: "description",
            content:
              "Detailed description of planned forum's program. Explore a multi-day agenda of presentations, and workshops detailing the latest technical innovations",
          },
          keywords,
        ],
      },
      highlight_lectures: {
        name: "highlight_lectures",
        path: "highlight-lectures",
        showInNav: true,
        meta: [
          {
            title: makeMetaTitle("Highlight Lectures"),
          },
          {
            name: "description",
            content:
              "Discover the main themes to be discussed of the forum, featuring visionary keynotes, authoritative speakers, and the most compelling topics in the industry.",
          },
          keywords,
        ],
        disabled: false,
      },
      roundtable_meetings: {
        name: "roundtable_meetings",
        path: "roundtable-meetings",
        showInNav: true,
        meta: [
          {
            title: makeMetaTitle("Roundtable meetings"),
          },
          {
            name: "description",
            content:
              "Engage in interactive, small-group discussions designed to foster collaboration, debate current trends, and solve shared industry challenges.",
          },
          keywords,
        ],
        disabled: false,
      },
      technical_sessions: {
        name: "technical_sessions",
        path: "technical-sessions",
        showInNav: true,
        meta: [
          {
            title: makeMetaTitle("Technical Sessions"),
          },
          {
            name: "description",
            content:
              "Dive into the core scientific and engineering program of the forum, featuring research presentations and validated technical solutions.",
          },
          keywords,
        ],
      },
    },
  },

  submission: {
    name: "submission",
    path: "/abstract-submission",
    meta: [
      {
        title: makeMetaTitle("Submission Guidelines"),
      },
      {
        name: "description",
        content:
          "Submit your original research, case studies, or technical papers to contribute to the forum's prestigious academic and professional program.",
      },
      keywords,
    ],
    showInNav: true,
  },
  registration: {
    name: "registration",
    path: "/registration",
    meta: [
      {
        title: makeMetaTitle("Registration"),
      },
      {
        name: "description",
        content:
          "Register your new profile today to connect with industry leaders and participate in exclusive networking events.",
      },
      keywords,
    ],
    showInNav: true,
  },
  forums: {
    name: "forums",
    path: "/forums",
    meta: [
      {
        title: makeMetaTitle("Home"),
      },
      {
        name: "description",
        content:
          "Welcome to the central hub for SciTech forum series, connecting professional networks with cutting-edge engineering and technical knowledge.",
      },
      keywords,
    ],
    hidden: true,
    showInNav: true,
  },
  contact: {
    name: "contact",
    path: "/contact",
    meta: [
      {
        title: makeMetaTitle("Contact"),
      },
      {
        name: "description",
        content:
          "Reach out to our dedicated organizing committee for assistance with registration, speaking opportunities, or logistics.",
      },
      keywords,
    ],
    showInNav: true,
  },
};
