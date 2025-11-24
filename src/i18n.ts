import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			"Welcome to React": "Welcome to React and react-i18next",
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
			},
			home: {
				About: "About",
			},
			committee: {
				"Program Committee": "Program Committee",
			},
		},
	},
	ru: {
		translation: {
			"Welcome to React": "Добро пожаловать в реакт",
		},
	},
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
