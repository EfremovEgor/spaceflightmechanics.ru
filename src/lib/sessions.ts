export const TechnicalSessions: {
	name: string;
	chair: string;
	description: string;
}[] = [
	{
		name: "Space Flight Mechanics",
		chair: "Antonio Prado, National Institute for Space Research (INPE), Brazil",
		description:
			"The session addresses advances in orbital mechanics, attitude dynamics, guidance, navigation and control of single or multi-spacecraft systems as well as space robotics, including applications related to the guidance, navigation and control of Earth-orbiting and interplanetary spacecraft, formation flying, rendezvous and docking. The session also covers topics on natural orbital dynamics of spacecraft in the Solar System and orbit determination.",
	},
	{
		name: "Space Operations",
		chair: "Renuganth Varatharajoo, University of Putra Malaysia, Malaysia",
		description:
			"The session is dedicated to the intricate processes involved in designing and executing spacecraft missions in near and deep space, including planetary defense and near-Earth objects. This topic covers a variety of innovative approaches crucial for ensuring the success of space missions, from conceptual design through launch, operation, and post-mission evaluation. The focus of the topic is on operational strategies and optimization techniques to maximize mission performance.",
	},
	{
		name: "Small Satellite Missions",
		chair: "Shufan Wu, Shanghai Jiao Tong University, China",
		description:
			"The session is focused on recent advances in small satellite class missions such as microsatellites, nanosatellites, CubeSats, as well as small satellites mega-constellations enabling valuable results for the mission end-user. The session also covers important lessons-learned topics, description of past and perspective space missions, different applications of small satellites and their constellations.",
	},
	{
		name: "Deep Space Exploration",
		chair: "Elena Fomina, Institute of Biomedical Problems of RAS, Russia",
		description:
			"This session covers deep space exploration strategies and architectures, as well as technology roadmaps. The session will address current and future missions to the Moon, planets, and asteroids, including orbital missions, robotic surface missions, as well as life sciences, resource utilisation and preparatory activities for future solar system exploration.",
	},
	{
		name: "Earth Observations",
		chair: "Tarun Singh, Symbiosis International (Deemed University), India",
		description:
			"The session covers technological aspects of Earth observations from space in favor of different industries and rational nature management, including implementation of AIML for analyzing massive amounts of data collected by Earth observation missions, revealing insights through geospatial analytics that are crucial for resource managements, urban planning, oceanographic, atmospheric, geological, geophysical, societal, security, and more. ",
	},
	{
		name: "Space Sensors & Actuators",
		chair: "Emmanuel Mashonjowa, University of Zimbabwe, Zimbabve",
		description:
			"The session addresses essential components that enable spacecraft to perceive their environment, execute control commands, and perform scientific and operational tasks, technological improvements. The session is focused on new developments in sensor technologies and actuator systems, like MEMS-based sensors and piezoelectric actuators, and other crucial on-board equipment that make sensors and actuators smaller and more functional, and contribute to the success of space missions.",
	},
	{
		name: "Space Materials & Structures",
		chair: "Meena Laad, Symbiosis International (Deemed University), India",
		description:
			"The session is devoted to the latest achievements and future directions in materials science for space applications, as well as covers exploration of innovative approaches, challenges, and advancements in the design and construction of structures in extraterrestrial environments. The session is focused to discuss showcase research, technologies, and methodologies involved in creating habitable and functional spaces beyond the Earth.",
	},
	{
		name: "Space Power & Propulsion",
		chair: "Felix Mora-Camino, French Civil Aviation University, France",
		description:
			"The session addresses sub-orbital, Earth to orbit and in-space propulsion, including both chemical and non-chemical rocket propulsion, air-breathing propulsion, and combined air-breathing and rocket systems. The session welcomes advanced solar and nuclear systems for spacecraft power and propulsion, novel power generation and energy harvesting, and examine the prospects for using space-based power plants to provide energy remotely to the Earth or other planets.",
	},
	{
		name: "Space Policy, Law & Economics",
		chair: "Leslie I. Tennen, Private Practice Sterns and Tennen, USA",
		description:
			"The session is devoted to the discussion of the complex and increasingly critical intersection of technical policy development, legal frameworks, and economic considerations that govern space activities. The session is also focused on governance, regulation, and sustainable economic growth in the space sector, commercialization of space exploration activities, current initiatives for commercial space access and their technological developments.",
	},
];

export const HighlightLectures: {
	name: string;
	speaker: string;
	abstract?: string;
	bio?: string;
}[] = [
	{
		name: "Prospects of BRICS Countries in Creating a Surveillance System for Near-Earth Objects",
		speaker:
			"Boris Shustov, Institute of Astronomy of Russian Academy of Sciences, Russia",
	},
	{
		name: "Interstellar Journeys: Will Ever Become Possible or Are Just a Science Fiction Topic?",
		speaker:
			"Giancarlo Genta, Polytechnic University of Turin, Italy (online)",
	},
	{
		name: "Industrial Revolution: New Era of AI Driven Transformations in Space Technologies",
		speaker: "Ketan Kotecha, Symbiosis Institute of Technology, India",
	},
	{
		name: "Mission Design to Triple Asteroids",
		speaker: "Antonio Prado, Institute of Space Research (INPE), Brazil",
	},
	{
		name: "The Nigerian Space Policy and Programme",
		speaker:
			"Francis Chizea, National Agency for Space Research and Development (Nigerian Space Agency), Nigeria (online)",
	},
	{
		name: "Perspectives of AI Implementations in Space Science and Technology",
		speaker:
			"Narendra S. Chaudhari, Assan Science and Technology University, India",
	},
	{
		name: "The Policy and Legal Roadmap for Competitive and Sovereign Space Markets in the 2030s",
		speaker:
			"Narkhanim Orujova, Space Agency of the Republic of Azerbaijan (Azercosmos), Azerbaijan",
	},
	{
		name: "Space for National Development – Explore Innovate Succeed",
		speaker:
			"Anoop Kumar Srivastava, Indian Space Research Organization, India",
	},
	{
		name: "Solar Sail Trajectory Optimization for Interplanetary Mission",
		speaker: "Renuganth Varatharajoo, Universiti Putra Malaysia, Malaysia",
	},
	{
		name: "Optical Space Situational Awareness as the Basis of Sustainable LEO Operations",
		speaker: "Andrey Klimov, Astronomical Research Center, Russia",
	},
	{
		name: "Indian Space Policy: Economical Effect",
		speaker: "Tarun P. Singh, Symbiosis Institute of Geoinformatics, India",
	},
	{
		name: "Venus: Investigation of Mysterious Planet",
		speaker:
			"Lev Zeleny, Institute of Space Research of Russian Academy of Sciences, Russia",
	},
	{
		name: "Space Reforms in India: Vision, Framework and Impact",
		speaker:
			"Chandra Prakash Singh, Indian National Space Promotion and Authorization Centre (IN-SPACe), India (online)",
	},
	{
		name: "Remote Sensing Data Analysis for Crop and Land Cover Change in Thailand",
		speaker:
			"Sarawut Ninsawat, Asian Institute of Technology, Thailand (online)",
	},
	{
		name: "Spacecraft Orbital Stability Under Total Solar Irradiance",
		speaker: "Aleksandr Yefremov, RUDN University, Russia",
	},
	{
		name: "Unlocking the Full Potential of Satellite Technology in Sub-Saharan Africa (SSA) through Training, Capacity Building, and Regional and International Cooperation",
		speaker:
			"Emmanuel Mashonjowa, University of Zimbabwe, Zimbabwe (online)",
	},
	{
		name: "Axisymmetric Supersonic Intake Buzz Characteristics and its Alleviation Adopting Plasma",
		speaker: "Sudip Das, Birla Institute of Technology, India",
	},
	{
		name: "Space Monitoring Legal and Illegal (Galamesay) Mining Industrial Contaminants in Ghana",
		speaker:
			"Manfred Quarshie, Space Science Systems Research Institute, Ghana (online)",
	},
	{
		name: "Hybrid Carbon Nanotube–Graphite Reinforced PVDF Composites: A Novel Approach for Space-Grade Lightweight Materials",
		speaker: "Meena Laad, Symbiosis Institute of Technology, India",
	},
	{
		name: "Navigating the New Space Era: Coordination, Sustainability, and Orbital Stewardship",
		speaker:
			"Bocar Ba, World Space Sustainability Association, President, UAE (online)",
	},
	{
		name: "Space4Water: an UN Proposed Remote Sensing Satellite Mission",
		speaker: "Shufan Wu, Shanghai Jiao Tong University, China",
	},
	{
		name: "Leveraging Earth Observation to Advance Zimbabwe's Socio-Economic Development",
		speaker:
			"Shekede Davis, Zimbabwe National Geospatial and Space Agency, Zimbabwe (online)",
	},
	{
		name: "Success Story Related to Acta Astronautica Journal",
		speaker:
			"Rock Chern, Ryerson University, Canada, Editor-in-Chief of Acta Astronautica Journal",
	},
	{
		name: "Ethiopian Way to Space: Projects and Programs",
		speaker:
			"Yeshurun Alemayehu, Space Science and Geospatial Institute (Ethiopian Space Agency), Ethiopia (online)",
	},
];

export const PlenarySessions: {
	name: string;
	moderator: {
		fullName: string;
		affiliation: string;
	};
	description: string;
	participants: {
		fullName: string;
		affiliation: string;
	}[];
}[] = [
	{
		name: "BRICS AND AFRICA INTERNATIONAL SPACE RESEARCH AND EDUCATION COOPERATION",
		moderator: {
			fullName: "Ravinder Rena",
			affiliation: "Durban University of Technology, South Africa",
		},
		description:
			"Nowadays, more and more nations all over the world have, or plan to have, the capability to develop and launch spacecraft. International cooperation in space research and exploration has the potential to provide significant benefits to all participants. Benefits in the form of monetary efficiency, programmatic and political sustainability, and workforce stability will accrue to those partners who choose to approach space research and exploration as a mutually beneficial endeavor. Furthermore, international cooperation must be explicitly incorporated as an aspect, and goal, of a modern space research and exploration programs to enable coordination prior to the construction of new trends in space education. Such coordination can happen on both the industry, and university levels and allows for education and training the personnel. Outer space must become an arena for international cooperation for global sustainable development, and not a theatre for an arms race, as it began its consideration of international cooperation in the peaceful uses of outer space. The greatest example of international cooperation approach is the International Space Station, which was supported by the Russia, United States, the European Space Agency, Canada, and Japan. The time makes correctives in the list of partners and the goals to achieve. The perspectives of partnership of BRICS and African countries have been proved for many years in different areas and the space international cooperation is not an exclusion here. It seems that it is necessary to formalize and develop to higher levels the international cooperation between countries of BRICS and Africa by creation new international organization – BRICS and Africa Space Research and Education Association. All research and education institution with space or other connected profiles of the countries of BRICS and Africa are invited to join this initiative of Russian Academy of Sciences and RUDN University named after Patrice Lumumba and agree on joint memorandum / declaration during in the frame of this session «BRICS and Africa International Space Research and Education Cooperation” regarding the necessity of creation BRICS and Africa Space Research and Education Association in order the initiative should be joint initiative of the participants of the session.",
		participants: [
			{
				fullName: "Ndiaye Papa Matar",
				affiliation: "Federal University of Rio de Janeiro, Brazil",
			},
			{
				fullName: "Michael Seregin",
				affiliation: "Russian Academy of Sciences, Russia",
			},
			{
				fullName: "Anna Izbitskikh",
				affiliation:
					"Ministry of Foreign Affairs of the Russian Federation",
			},
			{
				fullName: "Yeshurun Alemayehu (online)",
				affiliation: "Ministry of Innovation and Technology, Ethiopia",
			},
			{
				fullName: "Francis Chizea (online)",
				affiliation:
					"National Space Research and Development Agency (NASRDA), Nigeria",
			},
			{
				fullName: "Ketan Kotecha",
				affiliation:
					"Symbiosis International (Deemed University), India",
			},
			{
				fullName: "Petro Ernest Pesha (online)",
				affiliation: "Dar es Salaam Institute of Technology, Tanzania",
			},
			{
				fullName: "Yury Razoumny",
				affiliation: "RUDN University, Russia",
			},
			{
				fullName: "Shufan Wu",
				affiliation: "Shanghai Jiao Tong University, China",
			},
			{
				fullName: "Agaba Doreen (online)",
				affiliation: "Ministry of Science and Technology, Uganda",
			},
			{
				fullName: "Sifiso Nyathi (online)",
				affiliation:
					"Namibian University of Science and Technology, Namibia",
			},
			{
				fullName: "Emmanuel Chipo Mashonjowa",
				affiliation: "University of Zimbabwe, Zimbabve",
			},
			{
				fullName: "Samson Mekonnen Hailu (online)",
				affiliation: "Addis Ababa University, Ethiopia",
			},
			{
				fullName: "Painos Gweme (online)",
				affiliation:
					"Zimbabwe National Geospatial and Space Agency, Zimbabwe",
			},
			{
				fullName: "Dereje Engida Woldemichael (online)",
				affiliation:
					"Addis Ababa Science and Technology University, Ethiopia",
			},
			{
				fullName: "Srivastava Pradeep Kumar",
				affiliation:
					"Indian Institute of Technology Gandhinagar, India",
			},
		],
	},
	{
		name: "SPACE TRAFFIC MANAGEMENT AND SPACE DEBRIS CHALLENGES",
		moderator: {
			fullName: "Felix Mora-Camino",
			affiliation: "French Civil Aviation University, France",
		},
		description:
			"The objective of this session is to display the status of collision risk with space debris, to identify the resulting challenges for space traffic management (STM) and to analyze the proposed solution strategies. During the session the problems of space traffic management and space debris will be highlighted, such as the current level of development of space traffic management technologies, current debris environment and the evolution of spatial collision risk, effectiveness and cost of monitoring and tracking spatial debris, current and future technical solutions for debris management (mitigation policies, collision avoidance, debris removal), current and future market-based and state-based solutions (fees, penalties, sanctions and quotas), governance level with the adoption of internationally agreed standards, improved intergovernmental cooperation and new financing mechanisms for space traffic management. In conclusion, will be analyzed the evolution of the concept of space traffic management.",
		participants: [
			{
				fullName: "Antonio Prado",
				affiliation:
					"National Institute for Space Research (INPE), Brazil",
			},
			{
				fullName: "Natan Eismont",
				affiliation:
					"Space Research Institute of Russian Academy of Sciences, Russia",
			},
			{
				fullName: "Shufan Wu",
				affiliation: "Shanghai Jiao Tong University, China",
			},
			{
				fullName: "Mikhail Zakhvatkin",
				affiliation: "Keldysh Institute of Applied Mathematics, Russia",
			},
			{
				fullName: "Renuganth Varatharajoo",
				affiliation: "University of Putra Malaysia, Malaysia",
			},
		],
	},
	{
		name: "CRITICAL ISSUES IN SPACE TECHNICAL POLICY AND LAW",
		moderator: {
			fullName: "Leslie I. Tennen, Esq. (online)",
			affiliation: "Private practice Sterns and Tennen, USA",
		},
		description:
			"Space technical policy and law at the international level originated in resolutions of general principles adopted by the United Nations General Assembly in the early 1960’s. These initial statements consisted of a handful of principles considered to be essential for the peaceful movement of mankind into outer space, including activities on the Moon and other celestial bodies. Within a few years these resolutions were incorporated and elaborated upon in the Outer Space Treaty of 1967, followed by the Rescue and Return Agreement, the Liability Convention, and the Registration Convention, all of which were drafted by the United Nations Committee on the Peaceful Uses of Outer Space. A fifth treaty, the Moon Agreement, was drafted by COPUOS in 1979, and since then the COPUOS has adopted “soft law” statements of principles, which are more aspirational than binding international law. Several states have implemented national space laws to govern the activities of their citizens in space. The development of space law has expanded into a wide range of issues but has lagged activities conducted at both the national and international levels. As such effective and comprehensive regulations of technical policy and law are lacking in several areas of endeavor. The participants in this plenary will identify and discuss emerging issues in space technical policy and law that are of critical importance for resolution.",
		participants: [
			{
				fullName: "Elina Morozova",
				affiliation:
					"Intersputnik International Organization for Space Communications, Russia",
			},
			{
				fullName: "George Anthony Long (online)",
				affiliation:
					"Consulting Firm Legal Parallax, LLC in Fountain Hills, USA",
			},
			{
				fullName: "Olavo de O. Bittencourt Neto (online)",
				affiliation:
					"International Law and Space Law at the Catholic University of Santos, Brazil",
			},
			{
				fullName: "Irina Сhernych",
				affiliation: "RUDN University, Russia",
			},
			{
				fullName: "Ranjana Kaul (online)",
				affiliation: "International Institute of Space Law, India",
			},
			{
				fullName: "Lulu Makapela (online)",
				affiliation:
					"Aerospace and Composite Initiatives of Council for Scientific and Industrial Research (CSIR), South Africa",
			},
		],
	},
];

export const RoundtableMeetings: {
	name: string;
	moderator: {
		fullName: string;
		affiliation: string;
	};
	description: string;
	participants: {
		fullName: string;
		affiliation: string;
		country: string;
	}[];
}[] = [
	{
		name: "BRICS and Africa International Space Research and Education Cooperation",
		moderator: {
			fullName: "Ravinder Rena",
			affiliation: "Durban University of Technology, South Africa",
		},
		description: "",
		participants: [
			{
				fullName: "Irina Abramova",
				affiliation:
					"Institute for African Studies of the Russian Academy of Sciences",
				country: "Russia",
			},
			{
				fullName: "Yury Razoumny",
				affiliation: "RUDN University",
				country: "Russia",
			},
			{
				fullName: "Antonio Prado",
				affiliation: "Institute of Space Research (INPE)",
				country: "Brazil",
			},
			{
				fullName: "Tarun P. Singh",
				affiliation: "Symbiosis Institute of Geoinformatics",
				country: "India",
			},
			{
				fullName: "Shufan Wu",
				affiliation: "Shanghai Jiao Tong University",
				country: "China",
			},
			{
				fullName: "Francis Chizea",
				affiliation:
					"National Agency for Space Research and Development (Nigerian Space Agency)",
				country: "Nigeria",
			},
			{
				fullName: "Bocar Ba",
				affiliation: "World Space Sustainability Association",
				country: "UAE",
			},
			{
				fullName: "Kuria Catherine Wangari",
				affiliation: "Skylinks International Holdings",
				country: "Kenya",
			},
			{
				fullName: "Emmanuel Chipo Mashonjowa",
				affiliation: "University of Zimbabwe",
				country: "Zimbabwe",
			},
			{
				fullName: "Manfred Quarshie",
				affiliation: "Space Science Systems Research Institute",
				country: "Ghana",
			},
			{
				fullName: "Doreen Agaba",
				affiliation: "Ministry for Science, Technology and Innovation",
				country: "Uganda",
			},
			{
				fullName: "Petro Ernest Pesha",
				affiliation: "Dar es Salaam Institute of Technology",
				country: "Tanzania",
			},
			{
				fullName: "Yeshurun Alemayehu",
				affiliation:
					"Space Science and Geospatial Institute (Ethiopian Space Agency)",
				country: "Ethiopia",
			},
		],
	},
	{
		name: "Lunar Resources: Technical, Commercial and Legal Challenges",
		moderator: {
			fullName: "Leslie I. Tennen",
			affiliation: "Private Practice Sterns and Tennen, USA",
		},
		description: "",
		participants: [
			{
				fullName: "Narkhanim Orujova",
				affiliation:
					"Space Agency of the Republic of Azerbaijan (Azercosmos)",
				country: "Azerbaijan",
			},
			{
				fullName: "Irina Chernyh",
				affiliation: "RUDN University",
				country: "Russia",
			},
		],
	},
	{
		name: "The Sustainability of Outer Space as a Significant Challenge for the Space Ecosystem as a Whole",
		moderator: {
			fullName: "Antonio Prado",
			affiliation: "Institute of Space Research (INPE), Brazil",
		},
		description: "",
		participants: [
			{
				fullName: "Boris Shustov",
				affiliation:
					"Institute of Astronomy of Russian Academy of Sciences",
				country: "Russia",
			},
			{
				fullName: "Bocar Ba",
				affiliation: "World Space Sustainability Association",
				country: "UAE",
			},
			{
				fullName: "Giancarlo Genta",
				affiliation: "Polytechnic University of Turin",
				country: "Italy",
			},
			{
				fullName: "Anoop Kumar Srivastava",
				affiliation: "Indian Space Research Organization",
				country: "India",
			},
			{
				fullName: "Andrey Klimov",
				affiliation: "Astronomical Research Center",
				country: "Russia",
			},
			{
				fullName: "Francis Chizea",
				affiliation:
					"National Agency for Space Research and Development (Nigerian Space Agency)",
				country: "Nigeria",
			},
			{
				fullName: "Shekede Davis",
				affiliation: "Zimbabwe National Geospatial and Space Agency",
				country: "Zimbabwe",
			},
		],
	},
];
