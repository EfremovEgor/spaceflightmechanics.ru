interface ProgramItemBase {
	time: string;
	title: string;
}
interface ProgramItem extends ProgramItemBase {
	type: "item";
}
interface HighlightLecture extends ProgramItemBase {
	type: "highlight_lecture";
	presenter: string;
}
interface RoundtableMeeting extends ProgramItemBase {
	type: "roundtable_meeting";
	moderators: string[];
}

interface PlenarySession {
	type: "plenary";
	title: string;
	items: HighlightLecture | RoundtableMeeting;
	moderator: string;
}
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
		],
	},
];
