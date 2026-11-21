// SciTech Forum 2026 technical program, plenary part ("7th SciTech Forum 2026 Technical Program.pdf").
// Technical sessions with papers live in technicalSessions.ts.

export const PROGRAM_PLACE = "Hall Galaxy";
export const PROGRAM_PDF = "/files/SciTech Forum 2026 Technical Program.pdf";

export interface ProgramEntry {
	kind: "item";
	time: string;
	title: string;
	/** Second line under the title (address, place). */
	note?: string;
	/** Highlighted on a green background, as in the printed program. */
	special?: boolean;
}
export interface CeremonyEntry {
	kind: "ceremony";
	time: string;
	title: string;
	speakers: string[];
}
export interface LectureEntry {
	kind: "lecture";
	number: number;
	time: string;
	title: string;
	speaker: string;
}
export interface RoundtableEntry {
	kind: "roundtable";
	number: number;
	time: string;
	title: string;
	moderator: string;
}
export type SessionEntry = ProgramEntry | CeremonyEntry | LectureEntry | RoundtableEntry;
export interface PlenaryEntry {
	kind: "plenary";
	title: string;
	moderator: string;
	items: SessionEntry[];
}
export interface ProgramDay {
	date: string;
	items: (SessionEntry | PlenaryEntry)[];
}

export const program: ProgramDay[] = [
	{
		date: "Tuesday, November 24",
		items: [
			{
				kind: "item",
				time: "08:00 – 10:00",
				title: "Registration",
				note: "6, Miklukho-Maklaya Str. Moscow, RUDN University, main building"
			},
			{
				kind: "plenary",
				title: "Plenary Session 1",
				moderator: "Yury Razoumny, RUDN University, Russia",
				items: [
					{
						kind: "ceremony",
						time: "10:00 – 11:30",
						title: "Opening Ceremony",
						speakers: [
							"Yulia Ebzeeva, First Vice-Rector – Vice-Rector for Education, Acting Rector of RUDN University, Russia",
							"Aarti Holla-Maini, Director of UNOOSA, Austria",
							"Sergey Chernyshev, Vice President of the Russian Academy of Sciences, Russia",
							"Sergey Ryabkov, Deputy Minister, Ministry of Foreign Affairs of the Russian Federation, Russia",
							"Sergey Saveliev, Deputy General Director of State Corporation “Roscosmos”, Russia",
							"Yury Razoumny, Director of Engineering Academy of RUDN University, Chair of International Program Committee of SciTech Forum"
						]
					}
				]
			},
			{
				kind: "item",
				time: "11:30 – 13:30",
				title: "Meeting with Aarti Holla-Maini, Director of UNOOSA, Austria (by invitation only)",
				special: true
			},
			{
				kind: "plenary",
				title: "Plenary Session 2",
				moderator: "Meena Laad, Symbiosis Institute of Technology, India",
				items: [
					{
						kind: "lecture",
						number: 1,
						time: "11:30 – 12:00",
						title: "Science Fiction, Science, Technology & Spaceflight",
						speaker: "Giancarlo Genta, Polytechnic University of Turin, Italy"
					},
					{
						kind: "lecture",
						number: 2,
						time: "12:00 – 12:30",
						title: "The International Cislunar CubeSat Constellation (C3) Project and Its 12U Micro Satellite Prototype Platform Development",
						speaker: "Shufan Wu, Shanghai Jiao Tong University, China"
					}
				]
			},
			{
				kind: "item",
				time: "12:30 – 13:30",
				title: "Lunch (Moon Village Hall)"
			},
			{
				kind: "roundtable",
				number: 1,
				time: "13:30 – 15:00",
				title: "Global Governance of Outer-Space Activities: COPUOS Agenda",
				moderator: "Aarti Holla-Maini, Director of UNOOSA, Austria"
			},
			{
				kind: "item",
				time: "15:00 – 15:45",
				title: "Meeting of RUDN and MGIMO students with Director of UNOOSA Aarti Holla-Maini",
				note: "RUDN Space Mission Control Center, by invitation only",
				special: true
			},
			{
				kind: "plenary",
				title: "Plenary Session 3",
				moderator: "Ravinder Rena, Durban University of Technology, Republic of South Africa",
				items: [
					{
						kind: "lecture",
						number: 3,
						time: "15:00 – 15:30",
						title: "Quantifying the Economic Multiplier Effect of Indigenous Satellite Data: A Case Study of the NigeriaSat Fleet in National Development",
						speaker: "Francis Chizea, National Space Research and Development Agency, Federal Republic of Nigeria"
					},
					{
						kind: "lecture",
						number: 4,
						time: "15:30 – 16:00",
						title: "Design and Optimization of Small Satellite Constellations for Different Applications",
						speaker: "Antonio Prado, National Institute for Space Research, Brazil"
					},
					{
						kind: "lecture",
						number: 5,
						time: "16:00 – 16:30",
						title: "Position Statement of the International Academy of Astronautics on the “Declaration of Principles Concerning the Conduct of the Search for Extraterrestrial Intelligence (SETI): 2026 Update”",
						speaker: "Leslie Tennen, Sterns and Tennen, USA"
					},
					{
						kind: "lecture",
						number: 6,
						time: "16:30 – 17:00",
						title: "Space at a Crossroads: Operating Sustainably in Space through Decisions, Cooperation, and Shared Responsibilities",
						speaker: "Bocar Ba, World Space Sustainability Association, President, UAE"
					}
				]
			}
		]
	},
	{
		date: "Wednesday, November 25",
		items: [
			{
				kind: "plenary",
				title: "Plenary Session 4",
				moderator: "Renuganth Varatharajoo, Universiti Putra Malaysia, Malaysia",
				items: [
					{
						kind: "roundtable",
						number: 2,
						time: "10:00 – 11:30",
						title: "International Space Research and Education Cooperation: New Challenges",
						moderator: "Ravinder Rena, Durban University of Technology, Republic of South Africa"
					},
					{
						kind: "lecture",
						number: 7,
						time: "11:30 – 12:00",
						title: "Neuro-Symbolic AI for Space Exploration and Applications",
						speaker: "Ketan Kotecha, Symbiosis Institute of Technology, India"
					},
					{
						kind: "lecture",
						number: 8,
						time: "12:00 – 12:30",
						title: "Self-Learning Fuzzy Control for Satellite Attitude Regulation",
						speaker: "Renuganth Varatharajoo, Universiti Putra Malaysia, Malaysia"
					},
					{
						kind: "lecture",
						number: 9,
						time: "12:30 – 13:00",
						title: "Space-Based Technology Integration on Indian Development Programmes",
						speaker: "Tarun P. Singh, Symbiosis Institute of Geoinformatics, India"
					}
				]
			},
			{
				kind: "item",
				time: "13:00 – 14:00",
				title: "Lunch (Moon Village Hall)"
			},
			{
				kind: "plenary",
				title: "Plenary Session 5",
				moderator: "Shufan Wu, Shanghai Jiao Tong University, China",
				items: [
					{
						kind: "lecture",
						number: 10,
						time: "14:00 – 14:30",
						title: "Enhancing Agricultural Resilience in Southern Africa through Satellite-Based CropWatch Monitoring",
						speaker: "Emmanuel Mashonjowa, University of Zimbabwe, Zimbabwe"
					},
					{
						kind: "lecture",
						number: 11,
						time: "14:30 – 15:00",
						title: "From Vision to Orbit: DIT’s Journey in Advancing Tanzania’s National Space Programme",
						speaker: "Petro Ernest Pesha, Dar es Salaam Institute of Technology, Tanzania"
					},
					{
						kind: "lecture",
						number: 12,
						time: "15:00 – 15:30",
						title: "An Analysis of the Economic and Strategic Impact of Africa’s Skewed Historic Narrative in Space Innovations and Applications",
						speaker: "Doreen Agaba, Ministry of Science, Republic of Uganda"
					},
					{
						kind: "lecture",
						number: 13,
						time: "15:30 – 16:00",
						title: "Lightweight Polymer Composites for Next-Generation Space Systems",
						speaker: "Meena Laad, Symbiosis Institute of Technology, India"
					},
					{
						kind: "lecture",
						number: 14,
						time: "16:00 – 16:30",
						title: "Integration of Artificial Intelligence and Space Technology in India: Emerging Developments, Applications and Future Prospects",
						speaker: "Narendra S. Chaudhari, Assam Science and Technology University, India"
					},
					{
						kind: "lecture",
						number: 15,
						time: "16:30 – 17:00",
						title: "Tree Ensembles Outperform Deep Learning for Label-Scarce Winter Wheat Mapping: Evidence from Planet-NICFI Time Series in Zimbabwe",
						speaker: "Davis Shekede, Zimbabwe National Geospatial and Space Agency, Zimbabwe"
					},
					{
						kind: "lecture",
						number: 16,
						time: "17:00 – 17:30",
						title: "Staged Mission Planning for Gradual Deployment of Multipurpose Digital Sky Megaconstellation",
						speaker: "Dmitry Monakhov, L5 Ltd., Russia"
					}
				]
			}
		]
	},
	{
		date: "Thursday, November 26",
		items: [
			{
				kind: "plenary",
				title: "Plenary Session 6",
				moderator: "Antonio Prado, National Institute for Space Research, Brazil",
				items: [
					{
						kind: "lecture",
						number: 17,
						time: "10:00 – 10:30",
						title: "Pulsating and Oscillating Flows on Spiked Blunt Bodies with Various Forebody Bulges and Spikes at Supersonic Speed",
						speaker: "Sudip Das, Birla Institute of Technology, India"
					},
					{
						kind: "lecture",
						number: 18,
						time: "10:30 – 11:00",
						title: "Space Technology for Societal Benefits",
						speaker: "Prakash Chauhan, Indian National Space Promotion and Authorization Centre, India"
					},
					{
						kind: "lecture",
						number: 19,
						time: "11:00 – 11:30",
						title: "From NewSpace to Deep-Space Consortia: A New Economic Model of Cooperation in Far-Space Exploration",
						speaker: "Maria Ulyanova, Institute of Oriental Studies of the Russian Academy of Sciences, Russia"
					},
					{
						kind: "lecture",
						number: 20,
						time: "11:30 – 12:00",
						title: "International Virtual Observatory",
						speaker: "Oleg Malkov, Institute of Astronomy of the Russian Academy of Sciences, Russia"
					},
					{
						kind: "lecture",
						number: 21,
						time: "12:00 – 12:30",
						title: "The Foundation of International Space Law and the Challenge of Space Sustainability",
						speaker: "Narkhanim Orujova, Space Agency of the Republic of Azerbaijan, Azerbaijan"
					},
					{
						kind: "lecture",
						number: 22,
						time: "12:30 – 13:00",
						title: "Investment in Space: Accelerating Global Space Technology",
						speaker: "Ray Zimmerman, Global Investment Administration, USA"
					}
				]
			},
			{
				kind: "item",
				time: "13:00 – 14:00",
				title: "Lunch (Moon Village Hall)"
			},
			{
				kind: "plenary",
				title: "Plenary Session 7",
				moderator: "Tarun P. Singh, Symbiosis Institute of Geoinformatics, India",
				items: [
					{
						kind: "lecture",
						number: 23,
						time: "14:00 – 14:30",
						title: "Beyond the Rocket Equation: the Spin-Density Model as a Physical Basis for Future Space Capabilities",
						speaker: "Yury Razoumny, RUDN University, Russia"
					},
					{
						kind: "lecture",
						number: 24,
						time: "14:30 – 15:00",
						title: "Legacy of “Intercosmos” Association and Modern International Cooperation in Space Science",
						speaker: "Anatoli Petrukovich, Space Research Institute of the Russian Academy of Sciences, Russia"
					},
					{
						kind: "lecture",
						number: 25,
						time: "15:00 – 15:30",
						title: "Detailed Study of the GR-Caused Distortions of Quasi-Elliptic Trajectories in the Vicinity of the Sun",
						speaker: "Aleksandr Yefremov, RUDN University, Russia"
					},
					{
						kind: "lecture",
						number: 26,
						time: "15:30 – 16:00",
						title: "Opportunities and Challenges for Space Solar Systems",
						speaker: "John Mankins, Artemis Innovation Management Solutions, USA"
					},
					{
						kind: "roundtable",
						number: 3,
						time: "16:00 – 17:30",
						title: "Global Engineering the Orbital Grid: Technical and Economic Challenges in Space Solar Energy",
						moderator: "Vyacheslav Sinyugin, Professor of Russian Presidential Academy of National Economy and Public Administration, Russia"
					}
				]
			}
		]
	}
];

export interface HighlightLecture {
	number: number;
	date: string;
	time: string;
	title: string;
	speaker: string;
	abstract?: string;
}

export const highlightLectures: HighlightLecture[] = [
	{
		number: 1,
		date: "Tuesday, November 24",
		time: "11:30 – 12:00",
		title: "Science Fiction, Science, Technology & Spaceflight",
		speaker: "Giancarlo Genta, Polytechnic University of Turin, Italy",
		abstract: "Space exploration and colonization are common themes in science fiction novels, movies, TV series, cartoons and video games. These works have motivated many young people to pursue STEM studies, but they also tend to trivialize real technological achievements and make them seem obvious. In some cases, ideas from science fiction have inspired scientists to introduce new technologies. Yet the main value of science fiction is not predicting technological innovations, but exploring how such advances can influence human lives and behavior."
	},
	{
		number: 2,
		date: "Tuesday, November 24",
		time: "12:00 – 12:30",
		title: "The International Cislunar CubeSat Constellation (C3) Project and Its 12U Micro Satellite Prototype Platform Development",
		speaker: "Shufan Wu, Shanghai Jiao Tong University, China",
		abstract: "The International Cislunar CubeSat (C3) project is a pioneering grand science program initiated by the Deep Space Exploration Laboratory (DSEL), International Deep Space Exploration Association (IDSEA) and supported by the Asia-Pacific Space Cooperation Organization (APSCO). It consists of 30 standard 12U CubeSats and 4 small satellites of 200kg class for lunar resource exploration. It calls for multiple national participation to share the exploration results. This report will brief the C3 project scope and status, and present its 12U CubeSat platform prototype design and development status, including its system configuration and subsystem design and engineering implementation."
	},
	{
		number: 3,
		date: "Tuesday, November 24",
		time: "15:00 – 15:30",
		title: "Quantifying the Economic Multiplier Effect of Indigenous Satellite Data: A Case Study of the NigeriaSat Fleet in National Development",
		speaker: "Francis Chizea, National Space Research and Development Agency, Federal Republic of Nigeria",
		abstract: "Data from the NigeriaSat Earth observation satellites (NigeriaSat-1, NigeriaSat-2 and NigeriaSat-X) have supported major national and international socioeconomic, environmental and infrastructure projects across Nigeria. These datasets, available at short revisit intervals, have saved the country millions of dollars otherwise spent on buying data from foreign partners. They have also helped Nigeria build one of Africa's largest capacities in satellite data acquisition, handling and processing. This lecture focuses on the socioeconomic benefits Nigeria has derived from the NigeriaSat fleet and its data."
	},
	{
		number: 4,
		date: "Tuesday, November 24",
		time: "15:30 – 16:00",
		title: "Design and Optimization of Small Satellite Constellations for Different Applications",
		speaker: "Antonio Prado, National Institute for Space Research, Brazil",
		abstract: "Small satellite constellations offer flexible, cost-effective solutions for Earth observation, communication and monitoring. This presentation explores the design, orbital dynamics and optimization of constellations for various mission objectives. Particular attention is given to regional coverage of the Brazilian Amazon, the entire Brazilian territory and Colombia, involving challenges in orbit selection, satellite distribution, revisit times and coverage optimization. Constellations supporting air traffic monitoring and control, which require continuous coverage and reliable communication, are also investigated. The relationship between the number of satellites, orbital parameters, coverage performance and mission cost is discussed, showing how constellation design can meet diverse operational needs."
	},
	{
		number: 5,
		date: "Tuesday, November 24",
		time: "16:00 – 16:30",
		title: "Position Statement of the International Academy of Astronautics on the “Declaration of Principles Concerning the Conduct of the Search for Extraterrestrial Intelligence (SETI): 2026 Update”",
		speaker: "Leslie Tennen, Sterns and Tennen, USA",
		abstract: "In 2022 the IAA SETI Committee established a Task Group to update the Post-Detection Protocols, making them relevant to the realities of twenty-first century science, media, and public engagement. The new Declaration of Principles Concerning the Conduct of the Search for Extraterrestrial Intelligence (SETI) – 2026 Update was approved by the IAA SETI Committee and unanimously approved by the Board of Trustees and made a Position Paper of the Academy. This presentation reviews the new Declaration and addresses concurrent work towards best practices guidelines / supplementary guidance and future work including rebooting the Post-Detection Sub-Committee within the IAA SETI Committee."
	},
	{
		number: 6,
		date: "Tuesday, November 24",
		time: "16:30 – 17:00",
		title: "Space at a Crossroads: Operating Sustainably in Space through Decisions, Cooperation, and Shared Responsibilities",
		speaker: "Bocar Ba, World Space Sustainability Association, President, UAE",
		abstract: "Orbit is no longer an empty void but a finite, shared environment on which navigation, communications, finance and disaster response depend. In 2025 alone, more than 4,400 satellites were deployed, bringing the operational population above 14,000. This rapid industrialisation of low Earth orbit is colliding with governance frameworks designed for a slower era. Space sustainability extends beyond debris to re-entry impacts, interference with astronomy, spectrum and orbital resources, resilience of critical services and equitable access. The lecture makes the case for a multi-stakeholder platform, the World Space Sustainability Association, as a standing table for shared positions and collective action."
	},
	{
		number: 7,
		date: "Wednesday, November 25",
		time: "11:30 – 12:00",
		title: "Neuro-Symbolic AI for Space Exploration and Applications",
		speaker: "Ketan Kotecha, Symbiosis Institute of Technology, India",
		abstract: "Neuro-Symbolic AI combines deep learning with symbolic reasoning to enable intelligent, explainable, and autonomous space systems. This talk explores its applications in space exploration, satellite operations, planetary exploration, spacecraft autonomy, space situational awareness, and anomaly detection. By integrating data-driven intelligence with scientific knowledge and physical constraints, Neuro-Symbolic AI can enhance mission reliability, autonomous decision-making, and the safety of future space missions."
	},
	{
		number: 8,
		date: "Wednesday, November 25",
		time: "12:00 – 12:30",
		title: "Self-Learning Fuzzy Control for Satellite Attitude Regulation",
		speaker: "Renuganth Varatharajoo, Universiti Putra Malaysia, Malaysia",
		abstract: "Precise attitude control is essential for satellite missions under unknown disturbances such as gravitational perturbations, solar radiation pressure and aerodynamic drag. This study applies fuzzy control enhanced by reinforcement learning to stabilize satellites using fluid wheels. The architecture combines an event-triggered fuzzy controller, which updates control only when an error threshold is exceeded and adapts its gains incrementally, a self-tuning fuzzy controller that refines its rules online, fuzzy sliding mode control that reduces chattering, and a neural actor-critic agent that optimizes sliding-surface parameters. Numerical simulations show pointing accuracy of about 0.0001 degrees in the presence of unknown disturbances."
	},
	{
		number: 9,
		date: "Wednesday, November 25",
		time: "12:30 – 13:00",
		title: "Space-Based Technology Integration on Indian Development Programmes",
		speaker: "Tarun P. Singh, Symbiosis Institute of Geoinformatics, India",
		abstract: "Space-based technologies, particularly satellite remote sensing, GIS and geospatial analytics, have become critical enablers of India's development planning, resource management and governance. The lecture examines how space-based information is integrated into major Government of India programmes such as PM Gati Shakti, SVAMITVA, NAKSHA, FASAL, PMAY-G and watershed development, supporting infrastructure, rural transformation, agriculture, urban planning, water resources and disaster management. Satellite imagery, drone mapping and GIS platforms enable spatial planning, asset geotagging, crop forecasting and land-record modernisation. Geospatial intelligence also improves public expenditure efficiency, transparency and climate resilience, supporting evidence-based policymaking for inclusive and sustainable development."
	},
	{
		number: 10,
		date: "Wednesday, November 25",
		time: "14:00 – 14:30",
		title: "Enhancing Agricultural Resilience in Southern Africa through Satellite-Based CropWatch Monitoring",
		speaker: "Emmanuel Mashonjowa, University of Zimbabwe, Zimbabwe",
		abstract: "Agricultural systems across Southern Africa are increasingly vulnerable to droughts, erratic rainfall and flooding, especially for rain-fed smallholder farmers. The lecture examines deployment, operational efficacy and socio-economic impact of CropWatch, developed by the Aerospace Information Research Institute of the Chinese Academy of Sciences and localized through regional partnerships. CropWatch combines multi-source Earth observation data and cloud computing with ground truth from the GPS-Video-GIS surveying system. Drawing on experience in Zimbabwe, Zambia and Mozambique, the lecture shows how open-access platforms, training and SMS advisories strengthen climate adaptation and food sovereignty, and how to overcome barriers of connectivity, data-processing capacity and funding."
	},
	{
		number: 11,
		date: "Wednesday, November 25",
		time: "14:30 – 15:00",
		title: "From Vision to Orbit: DIT’s Journey in Advancing Tanzania’s National Space Programme",
		speaker: "Petro Ernest Pesha, Dar es Salaam Institute of Technology, Tanzania",
		abstract: "This Highlight Lecture traces Tanzania’s journey from a national vision for space technology to practical preparations for a satellite mission. It examines how the Dar es Salaam Institute of Technology (DIT) is turning that vision into action through joint degree programmes with RUDN University, applied research and hands-on training. Through the UNOOSA–JAXA KiboCUBE programme, DIT is developing TanzaniteSat-1, a CubeSat designed to track boundary beacons in game reserves and collect environmental data. The lecture also explains how ground station development builds local capacity for mission operations and how satellite data could support biodiversity conservation, agriculture, climate response and land-use planning."
	},
	{
		number: 12,
		date: "Wednesday, November 25",
		time: "15:00 – 15:30",
		title: "An Analysis of the Economic and Strategic Impact of Africa’s Skewed Historic Narrative in Space Innovations and Applications",
		speaker: "Doreen Agaba, Ministry of Science, Republic of Uganda",
		abstract: "This lecture presents a collection and analysis of space technologies and applications on the African continent from 1900 to 2000, covering infrastructure, treaties, innovations, launches, patents and indigenous space knowledge. Africa's historical contribution to space science and technology remains unrecognized. Correcting this narrative is critical as the world enters a new space age: a corrected African identity in space is a key tool for building a meaningful African space economy. The study analyses the legal, strategic and economic impact of the skewed narrative, which can lead to flawed space implementation plans and low uptake of space services, and offers recommendations."
	},
	{
		number: 13,
		date: "Wednesday, November 25",
		time: "15:30 – 16:00",
		title: "Lightweight Polymer Composites for Next-Generation Space Systems",
		speaker: "Meena Laad, Symbiosis Institute of Technology, India",
		abstract: "Spacecraft materials must withstand extreme thermal cycling (−150 °C to +120 °C), atomic oxygen, radiation, vacuum and micrometeoroids, while every kilogram raises launch cost. This work presents a lightweight hybrid nanocomposite film of PVDF reinforced with graphite nanoparticles and multiwalled carbon nanotubes, produced by ultrasonication and solution casting. FTIR, XRD, FESEM and EDS confirmed filler–matrix interaction, a uniform CNT network and oxidation-free processing. Comparable PVDF/carbon composites show degradation onset rising from 425 °C to 451–461 °C and nearly doubled storage modulus over the orbital temperature range, making the hybrid promising for satellite panels, thermal management and smart aerospace structures."
	},
	{
		number: 14,
		date: "Wednesday, November 25",
		time: "16:00 – 16:30",
		title: "Integration of Artificial Intelligence and Space Technology in India: Emerging Developments, Applications and Future Prospects",
		speaker: "Narendra S. Chaudhari, Assam Science and Technology University, India",
		abstract: "Integrating Artificial Intelligence with space technology is becoming a key driver of innovation in India's space sector. Examples include AI-enabled electronic intelligence microsatellites (Technology Development Board with Astrome Technologies), the Pixxel–Sarvam AI orbital data centre for in-orbit hyperspectral processing, Chandrayaan-3's hazard detection and Pragyan rover autonomous navigation, and Gaganyaan's humanoid robot Vyommitra. Supported by IN-SPACe, startups and academia are advancing edge AI, onboard data processing and geospatial analytics. AI applied to satellite data also benefits agriculture, weather and climate monitoring, disaster management and urban planning. With continued investment and collaboration, India can strengthen its global position in space technology."
	},
	{
		number: 15,
		date: "Wednesday, November 25",
		time: "16:30 – 17:00",
		title: "Tree Ensembles Outperform Deep Learning for Label-Scarce Winter Wheat Mapping: Evidence from Planet-NICFI Time Series in Zimbabwe",
		speaker: "Davis Shekede, Zimbabwe National Geospatial and Space Agency, Zimbabwe",
		abstract: "Mapping winter wheat in Zimbabwe is constrained by scarce labelled training data, and map accuracy is judged on held-out polygons. We compared two deep learning classifiers (BiLSTM and CNN-LSTM) with two tree ensembles (Random Forest and CatBoost) in Mashonaland West, using Planet-NICFI time series and label budgets from 5 polygons per class group to all 1,028. The tree ensembles matched or exceeded the networks at every budget. On 1,400 stratified random reference points, their maps reached user's accuracy of 0.90 and 0.82 against 0.53–0.57 for the networks. Polygon-based validation can hide large commission errors that only area-weighted reference samples reveal."
	},
	{
		number: 16,
		date: "Wednesday, November 25",
		time: "17:00 – 17:30",
		title: "Staged Mission Planning for Gradual Deployment of Multipurpose Digital Sky Megaconstellation",
		speaker: "Dmitry Monakhov, L5 Ltd., Russia",
		abstract: "Global transportation infrastructure accounts for about 40% of the value of global infrastructure, while space activity accounts for only about 3%. As the global economy may grow fourfold within 25–40 years, at least a quarter of it could rely on space assets, driving rapid constellation deployment. This calls for new forms of participation, not only for megacorporations but also for medium-sized players and emerging space nations, with a sustainable revenue model from the first 10–30 satellites: remote sensing, IoT, navigation, situational awareness and connectivity. The lecture outlines staged growth towards a 10,000+ satellite constellation for the economy of the 2040s."
	},
	{
		number: 17,
		date: "Thursday, November 26",
		time: "10:00 – 10:30",
		title: "Pulsating and Oscillating Flows on Spiked Blunt Bodies with Various Forebody Bulges and Spikes at Supersonic Speed",
		speaker: "Sudip Das, Birla Institute of Technology, India",
		abstract: "Aerodynamic spikes ahead of blunt bodies reduce pressure drag at supersonic and hypersonic speeds by weakening the shock system and creating a shielding recirculation zone, but they make the flow unstable. Two instability types occur: violent, low-frequency pulsation of the shock system, and smaller-amplitude oscillation with a steady recirculation zone. This study examines a flat-faced cylindrical forebody with sharp spikes of L/D 0.5, 1.0 and 1.75 at Mach 2.0. Strong pulsation appears at L/D 0.5 and 1.0, depending on spike geometry; at L/D 1.75 it turns into oscillation, explained by Kenworthy's shear-layer hypothesis. Forebody bulges influence the fluctuations."
	},
	{
		number: 18,
		date: "Thursday, November 26",
		time: "10:30 – 11:00",
		title: "Space Technology for Societal Benefits",
		speaker: "Prakash Chauhan, Indian National Space Promotion and Authorization Centre, India",
		abstract: "India's space programme has emphasized using space technology for national development and societal benefit. Over six decades ISRO has built indigenous capabilities in Earth observation, satellite communication and navigation. Remote sensing and geospatial technologies support agriculture, water management, environmental conservation, urban planning and disaster risk reduction, using satellites such as Resourcesat, RISAT-1A, NISAR and NavIC. Initiatives like the Bhuvan geoportal and the National Database for Emergency Management widen access to geospatial information. The talk highlights India's achievements and operational applications, discusses emerging opportunities from AI, cloud computing and high-resolution observation, and outlines directions towards an inclusive, resilient and sustainable India."
	},
	{
		number: 19,
		date: "Thursday, November 26",
		time: "11:00 – 11:30",
		title: "From NewSpace to Deep-Space Consortia: A New Economic Model of Cooperation in Far-Space Exploration",
		speaker: "Maria Ulyanova, Institute of Oriental Studies of the Russian Academy of Sciences, Russia",
		abstract: "Near space has shifted to a commercial NewSpace paradigm, while far space remains dominated by state agencies. This paper proposes a hybrid cooperation model that replaces legacy national programmes with transboundary consortia: the state acts as anchor tenant, private capital provides agility, and international partners share infrastructure, risk and data, in compliance with Article II of the Outer Space Treaty. Three pillars are identified: anchor demand mechanisms, interoperable open-access infrastructure and innovative risk-pooling finance. Concepts of “functional sovereignty” and “registered operator zones” allow private participation without national appropriation. Far-space leadership belongs to those building the most inclusive cooperation architecture."
	},
	{
		number: 20,
		date: "Thursday, November 26",
		time: "11:30 – 12:00",
		title: "International Virtual Observatory",
		speaker: "Oleg Malkov, Institute of Astronomy of the Russian Academy of Sciences, Russia",
		abstract: "The talk deals with the implementation of an international astronomy project, the Virtual Observatory (VO), whose principal idea is to make all the world's astronomical data transparently available from one's desktop. VO standards are now mature and underpin data discovery, usage and interoperability at most major observatories; new facilities are being built with these standards fully integrated. The VO enables excellence through interoperability of services and data exchange. The talk gives an overview of the importance of the VO to the modern observatory, highlighting its successes and discussing upcoming challenges."
	},
	{
		number: 21,
		date: "Thursday, November 26",
		time: "12:00 – 12:30",
		title: "The Foundation of International Space Law and the Challenge of Space Sustainability",
		speaker: "Narkhanim Orujova, Space Agency of the Republic of Azerbaijan, Azerbaijan",
		abstract: "This highlight lecture traces the path from the foundational rules of international space law to the practical challenge of keeping orbits usable. The first part outlines the institutional and treaty architecture: the UN Committee on the Peaceful Uses of Outer Space, the UN Office for Outer Space Affairs, the 1967 Outer Space Treaty and the four treaties that followed it. The second part examines how space debris mitigation and space traffic management are governed today through non-binding instruments, including the IADC and COPUOS guidelines, and where gaps between treaty obligations and operational practice remain."
	},
	{
		number: 22,
		date: "Thursday, November 26",
		time: "12:30 – 13:00",
		title: "Investment in Space: Accelerating Global Space Technology",
		speaker: "Ray Zimmerman, Global Investment Administration, USA",
		abstract: "Space is no longer only a domain of government programmes. Private capital now plays a major role in turning new space technologies into working systems and services. The talk discusses how investment shapes the global space economy, from launch services and satellite constellations to in-orbit servicing and lunar infrastructure. Key funding models are reviewed, including venture capital, public–private partnerships and international cooperation. Criteria are outlined that investors use to assess technical maturity and market potential. Ways are proposed to connect research teams, industry and investors and to bring promising technologies faster from the laboratory to orbit."
	},
	{
		number: 23,
		date: "Thursday, November 26",
		time: "14:00 – 14:30",
		title: "Beyond the Rocket Equation: the Spin-Density Model as a Physical Basis for Future Space Capabilities",
		speaker: "Yury Razoumny, RUDN University, Russia",
		abstract: "A principle of motion without mass ejection is presented. For a dumbbell with a flywheel in a central field, it is shown that the orbit can be changed by internal exchange of angular momentum. The principle is extended to the quantum level, where spin acts as a flywheel and thrust is directed perpendicular to the spin. The vacuum is treated as a three-phase medium of spinning carriers, and the Spin-Density Model of space-time is proposed. Newton's law of gravitation and inertia are recovered, and laboratory and astronomical tests are outlined. Implications for propellantless space transport are discussed."
	},
	{
		number: 24,
		date: "Thursday, November 26",
		time: "14:30 – 15:00",
		title: "Legacy of “Intercosmos” Association and Modern International Cooperation in Space Science",
		speaker: "Anatoli Petrukovich, Space Research Institute of the Russian Academy of Sciences, Russia",
		abstract: "The development of exploration programs opens new horizons for international cooperation in space. 2026 marks the 60th anniversary of “Intercosmos”, the special Council of the USSR Academy of Sciences, a unique milestone in cooperation and the peaceful use of outer space. More than 100 robotic spacecraft carried scientific payloads designed by many countries, and cosmonauts from more than ten countries flew in international crews to the Salyut and Mir orbital stations. Scientists built instruments for missions to the Moon, Mars, Venus and Halley's Comet. The lecture reviews modern international cooperation of Russian institutions in space science."
	},
	{
		number: 25,
		date: "Thursday, November 26",
		time: "15:00 – 15:30",
		title: "Detailed Study of the GR-Caused Distortions of Quasi-Elliptic Trajectories in the Vicinity of the Sun",
		speaker: "Aleksandr Yefremov, RUDN University, Russia",
		abstract: "Besides the well-known effects of General Relativity (GR), the trajectory of a space probe near the Sun is subject to further, purely relativistic distortions. The lecture critically analyses the standard calculation of a known GR effect, the secular precession of the quasi-elliptical orbit of a massive body, and highlights new observational aspects. Fundamental theoretical issues are discussed. A computational (tabular) tool is proposed for rapid numerical construction of such trajectories, using an extended time step in the weak-field approximation, and for high-precision analysis of the influence of each relativistic factor on the motion of a space object."
	},
	{
		number: 26,
		date: "Thursday, November 26",
		time: "15:30 – 16:00",
		title: "Opportunities and Challenges for Space Solar Systems",
		speaker: "John Mankins, Artemis Innovation Management Solutions, USA",
		abstract: "Space solar power can collect sunlight in orbit, day and night, and send the energy to the Earth or to users in space. The talk reviews new opportunities created by falling launch costs, modular spacecraft design and progress in wireless power transmission. Applications are discussed, from clean baseload power on the Earth to energy supply for lunar bases and in-space industry. Key challenges are outlined: system mass and cost, in-orbit assembly, transmission efficiency, safety and regulation. A path forward is proposed through staged demonstrations and international cooperation."
	}
];

export interface Person {
	name: string;
	affiliation: string;
}
export interface RoundtableMeeting {
	number: number;
	date: string;
	time: string;
	title: string;
	moderator: Person;
	participants: Person[];
	description: string;
}

export const roundtableMeetings: RoundtableMeeting[] = [
	{
		number: 1,
		date: "Tuesday, November 24",
		time: "13:30 – 15:00",
		title: "Global Governance of Outer-Space Activities: COPUOS Agenda",
		moderator: {
			name: "Aarti Holla-Maini",
			affiliation: "Director of UNOOSA, Austria"
		},
		participants: [
			{
				name: "Sergey Chernyshev",
				affiliation: "Vice President of the Russian Academy of Sciences, Academician of the Russian Academy of Sciences, Russia"
			},
			{
				name: "Sergei Belousko",
				affiliation: "Ministry of Foreign Affairs of the Russian Federation, Head of Russian Delegation at UNOOSA, Russia"
			},
			{
				name: "Vasily Gudnov",
				affiliation: "Head of Department, State Corporation “Roscosmos”, Russia"
			},
			{
				name: "Anatoli Petrukovich",
				affiliation: "Director of Space Research Institute of the Russian Academy of Sciences, Academician of the Russian Academy of Sciences, Russia"
			},
			{
				name: "Antonio Prado",
				affiliation: "Deputy Director of National Institute for Space Research, Republic of Brazil"
			},
			{
				name: "Francis Chizea",
				affiliation: "Deputy Director of National Space Research and Development Agency, Federal Republic of Nigeria"
			},
			{
				name: "Painos Gweme",
				affiliation: "Director of Zimbabwe National Geospatial and Space Agency, Republic of Zimbabwe"
			},
			{
				name: "Narkhanim Orujova",
				affiliation: "Space Agency of the Republic of Azerbaijan, Republic of Azerbaijan"
			},
			{
				name: "Yury Razoumny",
				affiliation: "Director of Engineering Academy of RUDN University, Chair of International Research Cooperation at Space Council of the Russian Academy of Sciences, Chair of International Program Committee of SciTech Forum, Russia"
			}
		],
		description: "The roundtable discusses the evolution of global space governance in the context of the current agenda of the United Nations Committee on the Peaceful Uses of Outer Space (COPUOS). The rapid growth of satellite mega-constellations, the entry of new spacefaring nations and private operators, and the return to the Moon challenge the international community to keep outer space safe, secure and sustainable. Participants will address the implementation of the Guidelines for the Long-term Sustainability of Outer Space Activities, space debris mitigation and space traffic coordination, frameworks for space resource activities and the role of national space legislation. Special attention will be paid to capacity building and access to space for developing countries, cooperation within BRICS and with African space agencies, and ways to strengthen the dialogue between governments, space agencies, academia and industry in shaping the rules of the new space age."
	},
	{
		number: 2,
		date: "Wednesday, November 25",
		time: "10:00 – 11:30",
		title: "International Space Research and Education Cooperation: New Challenges",
		moderator: {
			name: "Ravinder Rena",
			affiliation: "Durban University of Technology, Republic of South Africa"
		},
		participants: [
			{
				name: "Lorant Czaran",
				affiliation: "Chief of Space Application Section, UNOOSA, Austria"
			},
			{
				name: "Svetlana Agasieva",
				affiliation: "Deputy Director of Engineering Academy of RUDN University, Russia"
			},
			{
				name: "Doreen Agaba",
				affiliation: "Head of Space Office, Ministry of Science, Republic of Uganda"
			},
			{
				name: "Adolf Mkenda Faustine",
				affiliation: "Minister, Ministry of Education, Science and Technology, Tanzania"
			},
			{
				name: "Tarun P. Singh",
				affiliation: "Symbiosis Institute of Geoinformatics, India"
			},
			{
				name: "Oleg Malkov",
				affiliation: "Institute of Astronomy of the Russian Academy of Sciences, Russia"
			},
			{
				name: "Antonio Prado",
				affiliation: "Deputy Director of National Institute for Space Research, Brazil"
			},
			{
				name: "Emmanuel Mashonjowa",
				affiliation: "University of Zimbabwe, Zimbabwe"
			},
			{
				name: "Augustine Amadikwa Uwakwe",
				affiliation: "Vice Chancellor, Gregory University Uturu, Federal Republic of Nigeria"
			},
			{
				name: "Catherine Wangari Kuria",
				affiliation: "General Manager of Skylinks International Holdings, Republic of Kenya"
			}
		],
		description: "The roundtable focuses on how international cooperation in space research and education can respond to the challenges of a rapidly changing space sector. The growing number of emerging space nations, the demand for qualified engineers and scientists, and the expanding use of space data for sustainable development call for new models of academic partnership. Participants will discuss joint educational programmes and double degrees, student satellite and CubeSat projects, shared ground infrastructure and open access to space data, as well as the role of universities, space agencies and international organizations in capacity building. Attention will be given to the contribution of space technologies to raising living standards and economic development in developing countries: satellite services for agriculture, food and water security, disaster risk reduction, telemedicine and distance education in remote areas, digital connectivity, and the creation of high-tech jobs and national space industries through education and research partnerships."
	},
	{
		number: 3,
		date: "Thursday, November 26",
		time: "16:00 – 17:30",
		title: "Global Engineering the Orbital Grid: Technical and Economic Challenges in Space Solar Energy",
		moderator: {
			name: "Vyacheslav Sinyugin",
			affiliation: "Professor of Russian Presidential Academy of National Economy and Public Administration, Russia"
		},
		participants: [
			{
				name: "Alexandr Sigov",
				affiliation: "President of MIREA – Russian Technological University, Academician of the Russian Academy of Sciences, Russia"
			},
			{
				name: "John Mankins",
				affiliation: "President of Artemis Innovation Management Solutions, USA"
			},
			{
				name: "Yury Razoumny",
				affiliation: "Director of Engineering Academy of RUDN University, Russia"
			},
			{
				name: "Renuganth Varatharajoo",
				affiliation: "Vice-Rector of Universiti Putra Malaysia, Malaysia"
			},
			{
				name: "Shufan Wu",
				affiliation: "Dean of the School of Aeronautics and Astronautics, Shanghai Jiao Tong University, China"
			},
			{
				name: "Preksedis M. Ndomba",
				affiliation: "Rector of the Dar es Salaam Institute of Technology, Tanzania"
			},
			{
				name: "Ketan Kotecha",
				affiliation: "Dean of Faculty of Engineering, Symbiosis Institute of Technology, India"
			},
			{
				name: "Igor Shakhray",
				affiliation: "General Director of Unigreen Energy, Russia"
			},
			{
				name: "Eugeniy Terukov",
				affiliation: "Ioffe Physical-Technical Institute of the Russian Academy of Sciences, Russia"
			},
			{
				name: "Nikolay Evtikhiev",
				affiliation: "President of VPG LaserONE, Russia"
			}
		],
		description: "The roundtable addresses space-based solar power as a source of clean, continuous energy and the engineering and economic challenges of building an orbital power grid. Recent in-orbit demonstrations of wireless power transmission, progress in lightweight photovoltaics and falling launch costs have moved space solar energy from concept towards realistic national roadmaps. Participants will discuss architectures of large orbital power stations and their in-space assembly, microwave and laser power beaming, ground receiving infrastructure, safety and spectrum regulation, as well as life-cycle costs, investment models and public–private partnerships. The discussion will also consider power beaming for lunar bases, satellites and remote areas on Earth, and prospects for international cooperation in creating a global orbital energy infrastructure."
	}
];
