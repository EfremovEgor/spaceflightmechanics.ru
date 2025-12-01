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
	items: (ProgramItem | PlenarySession | OpeningCeremony)[];
}[] = [
	{
		time: "Tuesday, December 2, 2025",
		items: [
			{
				type: "item",
				time: "08:00 - 10:00",
				title: "Registration (6, Miklukho-Maklaya Str. Moscow, RUDN University, main building)",
			},
			{
				type: "opening_ceremony",
				time: "10:00 - 12:00",
				title: "Opening Ceremony",
				welcome_speeches: [
					"Gennady Krasnikov, President, Russian Academy of Sciences, Russia (TBC)",
					"Oleg Yastrebov, Rector of RUDN University, Russia",
					"Sergey Krikalev, Deputy General Director, State Corporation “ROSCOSMOS”, Cosmonaut, Russia",
					"Christian Feichtinger, Executive Director, International Astronautical Federation, France",
					"Aarti Holla-Maini, Director of UNOSSA, Austria",
					"Olivier Contant, Executive Director, International Academy of Astronautics, France",
					"Tatyana Titova, Daughter of the Second World Cosmonaut German Titov",
					"Yury Razoumny, Chair of International Program Committee of SciTech Forum, Director of Engineering Academy of RUDN University",
				],
			},
			{
				type: "plenary",
				moderator:
					"Meena Laad, Symbiosis Institute of Technology, India",
				title: "Plenary Session 1",
				items: [
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
		time: "Wednesday, December 3, 2025",
		items: [
			{
				type: "plenary",
				moderator:
					"Renuganth Varatharajoo, Universiti Putra Malaysia, Malaysia",
				title: "Plenary Session 3",
				items: [
					{
						type: "highlight_lecture",
						presenter:
							"Ketan Kotecha, Symbiosis Institute of Technology, India",
						time: "10:00 - 10:30",
						paperTitle:
							"Industrial Revolution: New Era of AI Driven Transformations in Space Technologies",
						title: "Highlight Lecture 7",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Erick Lansard, Nanyang Technological University, Singapore",
						time: "10:30 - 11:00",
						paperTitle:
							"Filling critical environmental data gaps over the Tropics with the “Equatorial Sentinels for Environment” remote sensing constellation: From classical North-South cooperation paradigm to disruptive South-South and South-North cooperations",
						title: "Highlight Lecture 8",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Renuganth Varatharajoo, Universiti Putra Malaysia, Malaysia",
						time: "11:00 - 11:30",
						paperTitle:
							"Solar Sail Trajectory Optimization for Interplanetary Mission",
						title: "Highlight Lecture 9",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Andrey Klimov, Astronomical Research Center, Russia",
						time: "11:30 - 12:00",
						paperTitle:
							"Optical Space Situational Awareness as the Basis of Sustainable LEO Operations",
						title: "Highlight Lecture 10",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Tarun P. Singh, Symbiosis Institute of Geoinformatics, India",
						time: "12:00 - 12:30",
						paperTitle: "Indian Space Policy: Economical Effect",
						title: "Highlight Lecture 11",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Lev Zeleny, Institute of Space Research of Russian Academy of Sciences, Russia",
						time: "12:30 - 13:00",
						paperTitle: "Venus: Investigation of Mysterious Planet",
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
				moderator: "Vera Galishnikova, RUDN University, Russia",
				title: "Plenary Session 4",
				items: [
					{
						type: "roundtable_meeting",
						time: "15:00 - 16:00",
						title: "Roundtable Meeting 2",
						topic: "Lunar Resources: Technical, Commercial and Legal Challenges",
						moderators: [
							"Leslie I. Tennen, Private Practice Sterns and Tennen, USA",
						],
					},
					{
						type: "highlight_lecture",
						presenter:
							"Chandra Prakash Singh, Indian National Space Promotion and Authorization Centre (IN-SPACe), India",
						time: "16:00 - 16:30",
						paperTitle:
							"Space Reforms in India: Vision, Framework and Impact",
						title: "Highlight Lecture 13",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Sarawut Ninsawat, Asian Institute of Technology, Thailand",
						time: "16:30 - 17:00",
						paperTitle:
							"Remote Sensing Data Analysis for Crop and Land Cover Change in Thailand",
						title: "Highlight Lecture 14",
					},

					{
						type: "highlight_lecture",
						presenter:
							"Yeshurun Alemayehu, Space Science and Geospatial Institute (Ethiopian Space Agency), Ethiopia",
						time: "17:00 - 17:30",
						paperTitle:
							"Ethiopian Way to Space: Projects and Programs",
						title: "Highlight Lecture 15",
					},
				],
			},
		],
	},

	{
		time: "Thursday, December 4, 2025",
		items: [
			{
				type: "plenary",
				moderator: "Shufan Wu, Shanghai Jiao Tong University, China",
				title: "Plenary Session 5",
				items: [
					{
						type: "highlight_lecture",
						presenter:
							"Aleksandr Yefremov, RUDN University, Russia",
						time: "10:00 - 10:30",
						paperTitle:
							"Spacecraft Orbital Stability Under Total Solar Irradiance",
						title: "Highlight Lecture 16",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Emmanuel Mashonjowa, University of Zimbabwe, Zimbabwe",
						time: "10:30 - 11:00",
						paperTitle:
							"Unlocking the Full Potential of Satellite Technology in Sub-Saharan Africa through Training, Capacity Building, and Regional and International Cooperation",
						title: "Highlight Lecture 17",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Sudip Das, Birla Institute of Technology, India",
						time: "11:00 - 11:30",
						paperTitle:
							"Axisymmetric Supersonic Intake Buzz Characteristics and its Alleviation Adopting Plasma",
						title: "Highlight Lecture 18",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Manfred Quarshie, Space Science Systems Research Institute, Ghana",
						time: "11:30 - 12:00",
						paperTitle:
							"Space Monitoring Legal and Illegal (Galamesay) Mining Industrial Contaminants in Ghana",
						title: "Highlight Lecture 19",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Shufan Wu, Shanghai Jiao Tong University, China",
						time: "12:00 - 12:30",
						paperTitle:
							"Space4Water: an UN Proposed Remote Sensing Satellite Mission",
						title: "Highlight Lecture 20",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Bocar Ba, World Space Sustainability Association, President, UAE",
						time: "12:30 - 13:00",
						paperTitle:
							"Navigating the New Space Era: Coordination, Sustainability, and Orbital Stewardship",
						title: "Highlight Lecture 21",
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
					"Antonio Prado, National Institute of Space Research (INPE), Brazil",
				title: "Plenary Session 6",
				items: [
					{
						type: "roundtable_meeting",
						time: "15:00 - 16:00",
						title: "Roundtable Meeting 3",
						topic: "The Sustainability of Outer Space as a Significant Challenge for the Space Ecosystem as a Whole",
						moderators: [
							"Antonio Prado, Institute of Space Research (INPE), Brazil",
						],
					},
					{
						type: "highlight_lecture",
						presenter:
							"Meena Laad, Symbiosis Institute of Technology, India",
						time: "16:00 - 16:30",
						paperTitle:
							"Hybrid Carbon Nanotube – Graphite Reinforced PVDF Composites: A Novel Approach for Space-Grade Lightweight Materials",
						title: "Highlight Lecture 22",
					},
					{
						type: "highlight_lecture",
						presenter:
							"Antonio Prado, National Institute of Space Research (INPE), Brazil",
						time: "16:30 - 17:00",
						paperTitle: "Mission Design to Triple Asteroids",
						title: "Highlight Lecture 23",
					},

					{
						type: "highlight_lecture",
						presenter:
							"Shekede Davis, Zimbabwe National Geospatial and Space Agency, Zimbabwe",
						time: "17:00 - 17:30",
						paperTitle:
							"Leveraging Earth Observation to Advance Zimbabwe's Socio-Economic Development",
						title: "Highlight Lecture 24",
					},

					{
						type: "highlight_lecture",
						presenter:
							"Rock Chern, Ryerson University, Canada, Editor-in-Chief of Acta Astronautica Journal",
						time: "17:30 - 18:00",
						paperTitle:
							"“Success Story” Related to Acta Astronautica Journal",
						title: "Highlight Lecture 25",
					},
				],
			},
		],
	},
];
