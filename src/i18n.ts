import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const LANGS = ["en", "ru"] as const;
/**
 * Russian version on/off, from VITE_RU_ENABLED at build time ("true" turns it on; off by default).
 * When off: no EN/RU switch, no /ru/ pages in the build, sitemap or hreflang, and /ru/... opens
 * the English page. Production takes the value from the repository variable VITE_RU_ENABLED,
 * and the deploy adds or removes the matching /ru redirect in nginx.
 */
export const RU_ENABLED = import.meta.env.VITE_RU_ENABLED === "true";
export type Lang = (typeof LANGS)[number];

/*
 * Rich strings use <b>, <sup>, <br/> and named link tags; they are rendered with <Trans>.
 * Russian wording follows the English site. The forum's name stays in English in both
 * languages (`forum.*`).
 */
const en = {
	routes: {
		home: "About",
		committee: "Committee",
		sessions_and_highlights: "Sessions & Highlights",
		submission: "Submission",
		registration: "Registration",
		forums: "Forums",
		contact: "Contact",
		plenary_sessions: "Plenary Sessions (TBC)",
		technical_sessions: "Technical Sessions",
		highlight_lectures: "Highlight Lectures",
		roundtable_meetings: "Roundtable Meetings",
		program: "Technical Program",
	},
	forum: {
		short: "7<sup>th</sup> SciTech Forum",
		shortPlain: "7th SciTech Forum",
		full: "7<sup>th</sup> SciTech Forum on Space Engineering and Operations Support",
		tagline: "on Space Engineering and Operations Support",
		dates: "November 24-26, 2026",
		venue: "RUDN University, Moscow, Russia",
		organizers: "Russian Academy of Sciences",
		iaa: "International Academy of Astronautics",
		rudn: "RUDN University",
	},
	common: {
		submitNow: "Submit now",
		registerNow: "Register now",
		close: "Close",
		copy: "Copy {{value}}",
		skip: "Skip to content",
		openMenu: "Open menu",
		closeMenu: "Close menu",
		backToTop: "Back to top",
		tbd: "TBD",
		loc: "Local Organizing Committee",
		locLabel: "Local Organizing Committee:",
		phone: "Phone",
		email: "Email",
		venueAddress: "Venue address:",
		address1: "6, Miklukho-Maklaya Str.",
		address2: "117198, Moscow",
		address3: "Russian Federation",
		addressInline: "6, Miklukho-Maklaya Str., 117198, Moscow, Russian Federation",
		language: "Language",
		days: "days",
		hrs: "hrs",
		min: "min",
		sec: "sec",
		live: "Live",
		daysLeft: "T−{{count}}d",
		venueLabel: "RUDN University · Moscow",
		dragHint: "drag · hover",
		mapTitle: "RUDN University on the map",
		gagarin: "Yuri Gagarin monument, Moscow",
		previousForums: "Previous forums",
	},
	home: {
		About: "About",
		intro: "<b>7<sup>th</sup> SciTech Forum on Space Engineering and Operations Support</b> is taking place on <hl>November 24-26, 2026</hl> in Moscow, Russia.",
		organized:
			"The Forum is organized by <b>Russian Academy of Sciences</b>, <b>International Academy of Astronautics</b> and <b>RUDN University</b>.<br/>Phone: <phone>+79197727658</phone>, email: <mail>orgcom@spacescitech.com</mail> (Local Organizing Committee).",
		format:
			"<b>Hybrid format (on-site and online)</b> is supposed (the online format is supported for participants outside Moscow region). The participation in the Forum is free. Participants can attend the Forum with or without presentation at technical session. To participate with presentation it is necessary to go through the <submission>Submission</submission> and <registration>Registration</registration> processes. Participation without presentation requires only registration.",
		venue: "<b>Venue:</b> <ext>RUDN University</ext>, 6 Miklukho-Maklaya Str., Moscow, 117198, Russia",
		languages: "<b>Working languages</b>: English and Russian (simultaneous translation).",
		selection:
			"Papers for the Forum shall be selected basing on the quality of 500 word abstracts. For accepted papers presentations and complete manuscripts are to be submitted in accordance with the deadlines.",
		publication:
			"Manuscripts will be published in the special volume of Advances in Mechanics and Control. The best papers will be recommended for publication in the special issue of <ext>Acta Astronautica</ext>.",
		topicsTitle: "The following topics are supposed for presentations:",
		support:
			"The on-site participants of the Forum with presentations or highlight lectures are provided with full support of Local Organizing Committee, including lunch during the dates of the Forum, accommodation support, as well as professional and cultural tours (by invitation only). All the participants will receive warm welcome (coffee break, etc.).",
	},
	deadlines: {
		abstract: "Abstract Submission Deadline:",
		abstractDate: "November 8, 2026",
		presentation: "Presentation Submission Deadline:",
		presentationDate: "November 22, 2026",
		manuscript: "Manuscript Submission Deadline:",
		manuscriptDate: "January 31, 2027",
	},
	committee: {
		"Program Committee": "Program Committee",
		title: "International Program Committee",
		all: "All",
		Chair: "Chair",
		"Co-Chair": "Co-Chair",
		Member: "Member",
	},
	contact: { title: "Contact" },
	registration: {
		title: "Registration",
		intro:
			"All categories of participants need to register to the 7th SciTech Forum using the application below. After registration the confirmation email with Zoom link will be sent.",
		help: "If you require assistance during this process, or you have any other queries, please, contact Local Organizing Committee via <mail>orgcom@spacescitech.com</mail>",
		modal: "Registration Form",
		success: "You have successfully registered to the 7<sup>th</sup> SciTech Forum!",
	},
	form: {
		fullName: "Name and Surname*",
		email: "Email*",
		country: "Country*",
		selectCountry: "Select country",
		organization: "Organization*",
		format: "Participation Format*",
		selectFormat: "Select format",
		online: "Online",
		offline: "On-sight",
		fullNameRU: "Full Name in Russian (if applicable)",
		presenter: "I'm going to present a paper at the Technical Session",
		paperId: "Paper ID (if already submitted)",
		paperTitle: "Paper Title*",
		submit: "Register",
		submitting: "Submitting...",
		errRequired: "This field could not be empty",
		errEmail: "Invalid email address",
		errCountry: "Country is required",
		errFormat: "Participation format is required",
		errDuplicate: "This email is already registered for the Forum",
		errClosed: "Registration for the Forum is closed",
		errFailed: "Registration failed. Please try again later or contact orgcom@spacescitech.com",
	},
	submission: {
		title: "Submission",
		original:
			"All papers must be original and not simultaneously submitted to another journal or conference. Authors are responsible to obtain prior to submission any required government or company clearances of their papers.",
		english: "<b>Abstracts</b>, <b>presentations</b> and <b>manuscripts</b> are submitted in English.",
		pptx: "<b>Presentations</b> are prepared in .pptx format (16x9 aspect ratio).",
		docx: "<b>Manuscripts</b> are prepared in .docx format, using the <template>Manuscript template</template>",
		reports:
			"For the reports at the technical sessions English language is strictly recommended. Russian language with special translation in English could be used in rare cases for certain reports basing on personal coordination with Local Organizing Committee.",
		speeches:
			"The speeches at Opening Ceremony and Highlight Lectures are provided in English or Russian language with simultaneous translation (the presentations used are only in English).",
		help: "If you require assistance during the submission process, please contact us via <mail>orgcom@spacescitech.com</mail>.",
	},
	sessions: {
		section: "Sessions & Highlights",
		program: "Technical Program",
		highlight: "Highlight Lectures",
		roundtable: "Roundtable Meetings",
		technical: "Technical Sessions",
		plenary: "Plenary Sessions",
		moderator: "Moderator:",
		participants: "Participants",
		description: "Description",
	},
	notFound: {
		title: "Error 404. Page not found",
		text: "The requested URL was not found on this server.",
	},
	topics: {} as Record<string, string>,
	countries: {} as Record<string, string>,
	orbits: {
		leo: { name: "LEO", info: "h ≈ 420 km · i = 51.6° · T ≈ 92 min" },
		sso: { name: "Sun-synchronous", info: "h ≈ 700 km · i = 98.2° · T ≈ 99 min" },
		molniya: { name: "Molniya", info: "e = 0.74 · i = 63.4° · T ≈ 12 h" },
		gto: { name: "GTO", info: "Hohmann transfer · e ≈ 0.73 · T ≈ 10.5 h" },
		geo: { name: "GEO", info: "h = 35 786 km · i = 0° · T = 23 h 56 min" },
	},
	meta: {
		suffix: "7th SciTech Forum on Space Engineering and Operations Support",
		keywords: "space, flights, scitech, forum, engineering, mechanics",
	},
};

type Dict = typeof en;

const ru: Dict = {
	routes: {
		home: "О форуме",
		committee: "Комитет",
		sessions_and_highlights: "Сессии и лекции",
		submission: "Подача тезисов",
		registration: "Регистрация",
		forums: "Форумы",
		contact: "Контакты",
		plenary_sessions: "Пленарные заседания (уточняется)",
		technical_sessions: "Технические сессии",
		highlight_lectures: "Ключевые лекции",
		roundtable_meetings: "Круглые столы",
		program: "Техническая программа",
	},
	forum: {
		short: "7<sup>th</sup> SciTech Forum",
		shortPlain: "7th SciTech Forum",
		full: "7<sup>th</sup> SciTech Forum on Space Engineering and Operations Support",
		tagline: "on Space Engineering and Operations Support",
		dates: "24–26 ноября 2026 г.",
		venue: "РУДН, Москва, Россия",
		organizers: "Российская академия наук",
		iaa: "Международная академия астронавтики",
		rudn: "РУДН",
	},
	common: {
		submitNow: "Подать тезисы",
		registerNow: "Зарегистрироваться",
		close: "Закрыть",
		copy: "Скопировать {{value}}",
		skip: "Перейти к содержанию",
		openMenu: "Открыть меню",
		closeMenu: "Закрыть меню",
		backToTop: "Наверх",
		tbd: "Уточняется",
		loc: "Местный организационный комитет",
		locLabel: "Местный организационный комитет:",
		phone: "Телефон",
		email: "Эл. почта",
		venueAddress: "Адрес места проведения:",
		address1: "ул. Миклухо-Маклая, д. 6",
		address2: "117198, Москва",
		address3: "Российская Федерация",
		addressInline: "ул. Миклухо-Маклая, д. 6, 117198, Москва, Российская Федерация",
		language: "Язык",
		days: "дн",
		hrs: "ч",
		min: "мин",
		sec: "с",
		live: "Идёт",
		daysLeft: "T−{{count}} дн",
		venueLabel: "РУДН · Москва",
		dragHint: "вращайте · наводите",
		mapTitle: "РУДН на карте",
		gagarin: "Памятник Юрию Гагарину, Москва",
		previousForums: "Прошлые форумы",
	},
	home: {
		About: "О форуме",
		intro: "<b>7<sup>th</sup> SciTech Forum on Space Engineering and Operations Support</b> пройдёт <hl>24–26 ноября 2026 г.</hl> в Москве.",
		organized:
			"Организаторы форума — <b>Российская академия наук</b>, <b>Международная академия астронавтики</b> и <b>РУДН</b>.<br/>Телефон: <phone>+79197727658</phone>, эл. почта: <mail>orgcom@spacescitech.com</mail> (местный организационный комитет).",
		format:
			"Форум пройдёт в <b>гибридном формате (очно и онлайн)</b>: онлайн-участие доступно для участников за пределами Московского региона. Участие в форуме бесплатное. Участвовать можно с докладом на технической сессии или без него. Для участия с докладом нужно пройти <submission>подачу тезисов</submission> и <registration>регистрацию</registration>. Для участия без доклада достаточно регистрации.",
		venue: "<b>Место проведения:</b> <ext>РУДН</ext>, ул. Миклухо-Маклая, д. 6, Москва, 117198, Россия",
		languages: "<b>Рабочие языки</b>: английский и русский (синхронный перевод).",
		selection:
			"Доклады на форум отбираются по качеству тезисов объёмом 500 слов. По принятым докладам презентации и полные тексты рукописей подаются в установленные сроки.",
		publication:
			"Рукописи будут опубликованы в специальном томе Advances in Mechanics and Control. Лучшие работы будут рекомендованы к публикации в специальном выпуске журнала <ext>Acta Astronautica</ext>.",
		topicsTitle: "Тематика докладов:",
		support:
			"Очные участники форума с докладами или ключевыми лекциями получают полную поддержку местного организационного комитета: обеды в дни форума, помощь с размещением, а также профессиональные и культурные экскурсии (только по приглашению). Всех участников ждёт тёплый приём (кофе-брейки и т. д.).",
	},
	deadlines: {
		abstract: "Срок подачи тезисов:",
		abstractDate: "8 ноября 2026 г.",
		presentation: "Срок подачи презентаций:",
		presentationDate: "22 ноября 2026 г.",
		manuscript: "Срок подачи рукописей:",
		manuscriptDate: "31 января 2027 г.",
	},
	committee: {
		"Program Committee": "Программный комитет",
		title: "Международный программный комитет",
		all: "Все",
		Chair: "Председатель",
		"Co-Chair": "Сопредседатель",
		Member: "Член комитета",
	},
	contact: { title: "Контакты" },
	registration: {
		title: "Регистрация",
		intro:
			"Всем категориям участников необходимо зарегистрироваться на 7th SciTech Forum через форму ниже. После регистрации придёт письмо с подтверждением и ссылкой на Zoom.",
		help: "Если вам нужна помощь с регистрацией или у вас есть другие вопросы, напишите в местный организационный комитет: <mail>orgcom@spacescitech.com</mail>",
		modal: "Форма регистрации",
		success: "Вы успешно зарегистрировались на 7<sup>th</sup> SciTech Forum!",
	},
	form: {
		fullName: "Имя и фамилия*",
		email: "Эл. почта*",
		country: "Страна*",
		selectCountry: "Выберите страну",
		organization: "Организация*",
		format: "Формат участия*",
		selectFormat: "Выберите формат",
		online: "Онлайн",
		offline: "Очно",
		fullNameRU: "ФИО на русском языке (при наличии)",
		presenter: "Я планирую выступить с докладом на технической сессии",
		paperId: "ID доклада (если уже подан)",
		paperTitle: "Название доклада*",
		submit: "Зарегистрироваться",
		submitting: "Отправка...",
		errRequired: "Поле не может быть пустым",
		errEmail: "Некорректный адрес эл. почты",
		errCountry: "Укажите страну",
		errFormat: "Укажите формат участия",
		errDuplicate: "Этот адрес уже зарегистрирован на форум",
		errClosed: "Регистрация на форум закрыта",
		errFailed: "Не удалось зарегистрироваться. Попробуйте позже или напишите на orgcom@spacescitech.com",
	},
	submission: {
		title: "Подача тезисов",
		original:
			"Все работы должны быть оригинальными и не должны одновременно подаваться в другой журнал или на другую конференцию. До подачи авторы обязаны получить все необходимые разрешения государственных органов или своих организаций на публикацию.",
		english: "<b>Тезисы</b>, <b>презентации</b> и <b>рукописи</b> подаются на английском языке.",
		pptx: "<b>Презентации</b> готовятся в формате .pptx (соотношение сторон 16:9).",
		docx: "<b>Рукописи</b> оформляются в формате .docx по <template>шаблону рукописи</template>",
		reports:
			"Для докладов на технических сессиях настоятельно рекомендуется английский язык. В редких случаях отдельные доклады могут быть представлены на русском языке со специальным переводом на английский по личному согласованию с местным организационным комитетом.",
		speeches:
			"Выступления на церемонии открытия и ключевые лекции проводятся на английском или русском языке с синхронным переводом (презентации — только на английском).",
		help: "Если вам нужна помощь с подачей, напишите нам: <mail>orgcom@spacescitech.com</mail>.",
	},
	sessions: {
		section: "Сессии и лекции",
		program: "Техническая программа",
		highlight: "Ключевые лекции",
		roundtable: "Круглые столы",
		technical: "Технические сессии",
		plenary: "Пленарные заседания",
		moderator: "Модератор:",
		participants: "Участники",
		description: "Описание",
	},
	notFound: {
		title: "Ошибка 404. Страница не найдена",
		text: "Запрошенная страница не найдена на сервере.",
	},
	topics: {
		"Space Flight Mechanics": "Механика космического полёта",
		"Deep Space Exploration": "Исследование дальнего космоса",
		"Earth Observations": "Наблюдение Земли",
		"Space Sensors & Actuators": "Космические датчики и исполнительные устройства",
		"Space Materials & Structures": "Космические материалы и конструкции",
		"Space Architecture": "Космическая архитектура",
		"AIML In Space Applications": "ИИ и машинное обучение в космических приложениях",
		"Space Power & Propulsion": "Космическая энергетика и двигательные установки",
		"Space Policy, Law & Economics": "Космическая политика, право и экономика",
	},
	countries: {
		Russia: "Россия",
		India: "Индия",
		Brazil: "Бразилия",
		China: "Китай",
		Malaysia: "Малайзия",
		UAE: "ОАЭ",
		Nigeria: "Нигерия",
		Ethiopia: "Эфиопия",
		France: "Франция",
		Italy: "Италия",
		Canada: "Канада",
		Israel: "Израиль",
		Korea: "Корея",
		USA: "США",
		Germany: "Германия",
	},
	orbits: {
		leo: { name: "НОО", info: "h ≈ 420 км · i = 51,6° · T ≈ 92 мин" },
		sso: { name: "Солнечно-синхронная", info: "h ≈ 700 км · i = 98,2° · T ≈ 99 мин" },
		molniya: { name: "«Молния»", info: "e = 0,74 · i = 63,4° · T ≈ 12 ч" },
		gto: { name: "ГПО", info: "Гомановский перелёт · e ≈ 0,73 · T ≈ 10,5 ч" },
		geo: { name: "ГСО", info: "h = 35 786 км · i = 0° · T = 23 ч 56 мин" },
	},
	meta: {
		suffix: "7th SciTech Forum on Space Engineering and Operations Support",
		keywords:
			"космос, космические полёты, механика космического полёта, космическая техника, форум, SciTech, РУДН, РАН, конференция",
	},
};

i18n.use(initReactI18next).init({
	resources: { en: { translation: en }, ru: { translation: ru } },
	lng: "en",
	fallbackLng: "en",
	// Keys like "Space Policy, Law & Economics" are used verbatim.
	keySeparator: ".",
	nsSeparator: false,
	interpolation: {
		escapeValue: false, // react already safes from xss
	},
	react: { transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p", "sup"] },
});

export default i18n;
