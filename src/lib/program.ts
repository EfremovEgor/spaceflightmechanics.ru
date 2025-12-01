export interface ProgramItemBase {
	time: string;
	title: string;
}
export interface ProgramItem extends ProgramItemBase {
	type: "item";
}
export interface HighlightLecture extends ProgramItemBase {
	type: "highlight_lecture";
	paperTitle: string;
	presenter: string;
}
export interface RoundtableMeeting extends ProgramItemBase {
	type: "roundtable_meeting";
	topic: string;
	moderators: string[];
}
export interface OpeningCeremony extends ProgramItemBase {
	type: "opening_ceremony";
	welcome_speeches: string[];
}
export interface PlenarySession {
	type: "plenary";
	title: string;
	items: (HighlightLecture | RoundtableMeeting | OpeningCeremony)[];
	moderator: string;
}
export type AnyProgramItem =
	| ProgramItem
	| HighlightLecture
	| RoundtableMeeting
	| OpeningCeremony
	| PlenarySession;

export const program: {
	time: string;
	items: (ProgramItem | PlenarySession)[];
}[] = [
	{
		time: "Tuesday, December 2",
		items: [
			{
				type: "item",
				time: "08:00 - 10:00",
				title: "Registration (6, Miklukho-Maklaya Str. Moscow, RUDN University, main building)",
			},
			{
				type: "plenary",
				moderator: "Yury Razoumny, RUDN University, Russia",
				title: "Plenary Session 1",
				items: [
					{
						type: "opening_ceremony",
						time: "10:00 - 12:00",
						title: "Opening Ceremony",
						welcome_speeches: [
							"Gennady Krasnikov, President, Russian Academy of Sciences, Russia (TBC)",
						],
					},
					{
						type: "highlight_lecture",
						presenter:
							"Boris Shustov, Institute of Astronomy of Russian Academy of Sciences, Russia",
						time: "12:00 - 12:30",
						paperTitle:
							"Prospects of BRICS Countries in Creating a Surveillance System for Near-Earth Objects",
						title: "Highlight Lecture 1",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Giancarlo Genta, Polytechnic University of Turin, Italy",
						time: "12:30 - 13:00",
						title: "Highlight Lecture 2",
						paperTitle:
							"Interstellar Journeys: Will Ever Become Possible or Are Just a Science Fiction Topic?",
					},
				],
			},
			{
				type: "item",
				time: "13:00 - 15:00",
				title: "Lunch (MOON VILLAGE HALL)",
			},

			{
				type: "plenary",
				moderator:
					"Ravinder Rena, Durban University of Technology, Republic of South Africa",
				title: "Plenary Session 2",
				items: [
					{
						type: "roundtable_meeting",
						time: "15:00 - 16:00",
						title: "Roundtable Meeting 1",
						topic: "BRICS and Africa International Space Research and Education Cooperation",
						moderators: [
							"Francis Chizea, National Agency for Space Research and Development, Nigeria",
							"Ravinder Rena, Durban University of Technology, Republic of South Africa",
						],
					},
					{
						type: "highlight_lecture",
						presenter:
							"Narkhanim Orujova, Space Agency of the Republic of Azerbaijan (Azercosmos), Azerbaijan",
						time: "16:00 - 16:30",
						paperTitle:
							"The Policy and Legal Roadmap for Competitive and Sovereign Space Markets in the 2030s",
						title: "Highlight Lecture 3",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Anoop Kumar Srivastava, Indian Space Research Organization, India",
						time: "16:30 - 17:00",
						paperTitle:
							"Space for National Development – Explore Innovate Succeed",
						title: "Highlight Lecture 4",
					},

					{
						type: "highlight_lecture",
						presenter:
							"Francis Chizea, National Agency for Space Research and Development (Nigerian Space Agency), Nigeria",
						time: "17:00 - 17:30",
						paperTitle: "The Nigerian Space Policy and Programme",
						title: "Highlight Lecture 5",
					},

					{
						type: "highlight_lecture",
						presenter:
							"Narendra S. Chaudhari, Assan Science and Technology University, India",
						time: "17:30 - 18:00",
						paperTitle:
							"Perspectives of AI Implementations in Space Science and Technology",
						title: "Highlight Lecture 6",
					},
				],
			},
		],
	},

	{
		time: "Wednesday, December 3",
		items: [
			{
				type: "plenary",
				moderator: "",
				title: "Plenary Session ",
				items: [
					{
						type: "highlight_lecture",
						presenter: "",
						time: "10:00 - 10:30",
						paperTitle: "",
						title: "Highlight Lecture 7",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "10:30 - 11:00",
						paperTitle: "",
						title: "Highlight Lecture 8",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "11:00 - 11:30",
						paperTitle: "",
						title: "Highlight Lecture 9",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "11:30 - 12:00",
						paperTitle: "",
						title: "Highlight Lecture 10",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "12:00 - 12:30",
						paperTitle: "",
						title: "Highlight Lecture 11",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "12:30 - 13:00",
						paperTitle: "",
						title: "Highlight Lecture 12",
					},
				],
			},
			{
				type: "item",
				time: "13:00 - 15:00",
				title: "Lunch (MOON VILLAGE HALL)",
			},
			{
				type: "plenary",
				moderator: "",
				title: "Plenary Session ",
				items: [
					{
						type: "roundtable_meeting",
						time: "15:00 - 16:00",
						title: "Roundtable Meeting ",
						topic: "",
						moderators: [""],
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "16:00 - 16:30",
						paperTitle: "",
						title: "Highlight Lecture 13",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "16:30 - 17:00",
						paperTitle: "",
						title: "Highlight Lecture 14",
					},

					{
						type: "highlight_lecture",
						presenter: "",
						time: "17:00 - 17:30",
						paperTitle: "",
						title: "Highlight Lecture 15",
					},

					{
						type: "highlight_lecture",
						presenter: "",
						time: "17:30 - 18:00",
						paperTitle: "",
						title: "Highlight Lecture 6",
					},
				],
			},
		],
	},

	{
		time: "Thursday, December 4",
		items: [
			{
				type: "plenary",
				moderator: "",
				title: "Plenary Session ",
				items: [
					{
						type: "highlight_lecture",
						presenter: "",
						time: "10:00 - 10:30",
						paperTitle: "",
						title: "Highlight Lecture 7",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "10:30 - 11:00",
						paperTitle: "",
						title: "Highlight Lecture 8",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "11:00 - 11:30",
						paperTitle: "",
						title: "Highlight Lecture 9",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "11:30 - 12:00",
						paperTitle: "",
						title: "Highlight Lecture 10",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "12:00 - 12:30",
						paperTitle: "",
						title: "Highlight Lecture 11",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "12:30 - 13:00",
						paperTitle: "",
						title: "Highlight Lecture 12",
					},
				],
			},
			{
				type: "item",
				time: "13:00 - 15:00",
				title: "Lunch (MOON VILLAGE HALL)",
			},
			{
				type: "plenary",
				moderator: "",
				title: "Plenary Session ",
				items: [
					{
						type: "roundtable_meeting",
						time: "15:00 - 16:00",
						title: "Roundtable Meeting ",
						topic: "",
						moderators: [""],
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "16:00 - 16:30",
						paperTitle: "",
						title: "Highlight Lecture 13",
					},
					{
						type: "highlight_lecture",
						presenter: "",
						time: "16:30 - 17:00",
						paperTitle: "",
						title: "Highlight Lecture 14",
					},

					{
						type: "highlight_lecture",
						presenter: "",
						time: "17:00 - 17:30",
						paperTitle: "",
						title: "Highlight Lecture 15",
					},

					{
						type: "highlight_lecture",
						presenter: "",
						time: "17:30 - 18:00",
						paperTitle: "",
						title: "Highlight Lecture 6",
					},
				],
			},
		],
	},
];
