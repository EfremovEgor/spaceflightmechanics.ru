import type { DetailedHTMLProps, MetaHTMLAttributes } from "react";
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
	return `6th SciTech Forum on Space Engineering and Operations Support | ${title}`;
};

export const Routes: TRoutes = {
	home: {
		name: "home",
		path: "/",
		meta: [
			{
				title: makeMetaTitle("Home"),
			},
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
		],
		showInNav: true,
	},
	sessions_and_highlights: {
		name: "sessions_and_highlights",
		path: "/sessions-and-highlights",
		showInNav: true,

		routes: {
			plenary_sessions: {
				name: "plenary_sessions",
				path: "plenary-sessions",
				showInNav: true,
				meta: [
					{
						title: makeMetaTitle("Plenary Sessions"),
					},
				],
				disabled: true,
			},
			technical_sessions: {
				name: "technical_sessions",
				path: "technical-sessions",
				showInNav: true,
				meta: [
					{
						title: makeMetaTitle("Technical Sessions"),
					},
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
				],
				disabled: true,
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
		],
		showInNav: true,
	},
};
