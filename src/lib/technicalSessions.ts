// Generated from the final 2026 Technical Program (PDF): topics as in the booklet's
// session overview, and every session with its papers.

export interface TechnicalSessionChair {
	name: string;
	affiliation: string;
}

export interface TechnicalSessionPaper {
	time: string;
	/** Submission number, e.g. "SciTech2026-103". */
	id: string;
	title: string;
	/** One line per affiliation group: "Name, Name, Affiliation, Country". */
	authors: string[];
}

export interface TechnicalSession {
	number: number;
	code: string;
	title: string;
	/** e.g. "Wednesday, November 25". */
	date: string;
	time: string;
	hall: string;
	chairs: TechnicalSessionChair[];
	papers: TechnicalSessionPaper[];
}

/** A research topic with one or two sessions, as in the booklet's overview. */
export interface TechnicalTopic {
	code: string;
	title: string;
	description: string;
	chairs: TechnicalSessionChair[];
	/** Session numbers in program order. */
	sessions: number[];
}

export const technicalTopics: TechnicalTopic[] = [
	{
		"code": "SFM",
		"title": "Space Flight Mechanics",
		"description": "The session addresses the dynamics, control and mission design of spacecraft: attitude control with intelligent, fuzzy and reinforcement-learning methods, control moment gyroscope steering, tethered systems and solar sails, deorbiting of space debris, station-keeping in very low Earth orbits, formation flying and collision avoidance, as well as low-thrust and impulsive transfers, trajectory optimization, cislunar missions and lunar navigation constellations.",
		"chairs": [
			{
				"name": "Shufan Wu",
				"affiliation": "Shanghai Jiao Tong University, China"
			},
			{
				"name": "Vladimir Razoumny",
				"affiliation": "RUDN University, Russia"
			}
		],
		"sessions": [
			1,
			11
		]
	},
	{
		"code": "SMS",
		"title": "Spacecraft Materials & Structures",
		"description": "The session is devoted to materials and structures for space applications: titanium alloys produced by additive and SHS technologies, nanoreinforced alloys, shot peening and micro-arc oxidation, fatigue life and residual stresses, functionally graded, polymer, smart and aerogel materials for extreme conditions, as well as the design, optimization and flight validation of spacecraft and launch vehicle structures and lunar surface infrastructure.",
		"chairs": [
			{
				"name": "Meena Laad",
				"affiliation": "Symbiosis Institute of Technology, India"
			},
			{
				"name": "Kazem Reza Kashy Zadeh",
				"affiliation": "RUDN University, Russia"
			}
		],
		"sessions": [
			2,
			12
		]
	},
	{
		"code": "SAH",
		"title": "Space Architecture & Habitats",
		"description": "The session addresses the architecture of orbital stations and of habitats on the Moon and Mars: artificial gravity stations, inflatable softgoods, membrane and deployable truss structures, reuse of spent upper stages, modular growth and habitability of orbital settlements, interior ergonomics and lighting, as well as lunar base siting, lava tubes as natural shelters, regolith-printed and sulfur-concrete structures, and thermal, radiation and acoustic protection.",
		"chairs": [
			{
				"name": "Petro Ernest Pesha",
				"affiliation": "Dar es Salaam Institute of Technology, Tanzania"
			},
			{
				"name": "Ivan Khalil",
				"affiliation": "RUDN University, Russia"
			}
		],
		"sessions": [
			3,
			13
		]
	},
	{
		"code": "SPLE",
		"title": "Space Policy, Law & Economics",
		"description": "The session is devoted to the discussion of the complex and increasingly critical intersection of legal frameworks, policy development and economic considerations that govern space activities. It is also focused on governance, regulation and sustainable economic growth in the space sector, protective arrangements around long-term lunar activities, national space legislation and licensing, emerging space economies, human capital for NewSpace, space debris mitigation and the commercialization of space exploration activities.",
		"chairs": [
			{
				"name": "Irina Chernykh",
				"affiliation": "RUDN University, Russia"
			},
			{
				"name": "Narkhanim Orujova",
				"affiliation": "Space Agency of the Republic of Azerbaijan, Azerbaijan"
			}
		],
		"sessions": [
			4,
			16
		]
	},
	{
		"code": "SGI",
		"title": "Spaceports, Ground Infrastructure & Operations",
		"description": "The session is dedicated to the design, construction and operation of spaceports and ground infrastructure: high-strength, fiber-reinforced and ultra-high performance concretes, rubber-based concretes for gas-escape channels, corrosion and residual capacity of reinforced concrete members, strengthening of structures under extreme loads, composite reinforcement, selection of launch sites for light-class launch vehicles, and surveying and information modelling for lunar bases.",
		"chairs": [
			{
				"name": "Francis Chizea",
				"affiliation": "National Space Research and Development Agency, Federal Republic of Nigeria"
			},
			{
				"name": "Vera Galishnikova",
				"affiliation": "RUDN University, Russia"
			}
		],
		"sessions": [
			5,
			10
		]
	},
	{
		"code": "SSE",
		"title": "Solar System Exploration",
		"description": "The session covers mission analysis and trajectory design for the exploration of the Solar System and its small bodies, including multi-asteroid tours, missions to trans-Neptunian objects, Venus, Mars and Ganymede, gravitational modelling and spacecraft dynamics around irregular bodies, regional exploration and resources of the Moon, as well as the detection of near-Earth objects and planetary defense strategies.",
		"chairs": [
			{
				"name": "Antonio Prado",
				"affiliation": "National Institute for Space Research, Brazil"
			},
			{
				"name": "Olga Saltykova",
				"affiliation": "RUDN University, Russia"
			}
		],
		"sessions": [
			6
		]
	},
	{
		"code": "SPP",
		"title": "Space Power & Propulsion",
		"description": "The session addresses sub-orbital, Earth-to-orbit and in-space propulsion, including solid propellant research, burn rate and ignition studies, internal ballistics and chamber pressurization, as well as nuclear and other power sources for planetary bases. The session also features university rocketry programmes: development, ground testing and flight validation of sounding rockets, their motors and aerostructures.",
		"chairs": [
			{
				"name": "Felix Mora-Camino",
				"affiliation": "French Civil Aviation University, France"
			},
			{
				"name": "Siamak Ghorbani",
				"affiliation": "RUDN University, Russia"
			}
		],
		"sessions": [
			7
		]
	},
	{
		"code": "EO",
		"title": "Earth Observations",
		"description": "The session covers Earth observations from space for natural resources, the environment and economic needs: multispectral and radar remote sensing of mineral deposits, lineament analysis for hydrocarbon prospectivity, satellite monitoring of methane emissions, InSAR monitoring of land subsidence and oil and gas fields, monitoring of pipelines, dust storms and floods, and machine learning for satellite data.",
		"chairs": [
			{
				"name": "Tarun P. Singh",
				"affiliation": "Symbiosis Institute of Geoinformatics, India"
			},
			{
				"name": "Elizaveta Shemyakina",
				"affiliation": "RUDN University, Russia"
			}
		],
		"sessions": [
			8,
			15
		]
	},
	{
		"code": "SSA",
		"title": "Small Satellites, Space Sensors & Actuators",
		"description": "The technical session is focused on small satellite missions and on-board systems that enable spacecraft and launch vehicles to perceive their environment and execute commands: CubeSat computers, power and communication buses, FlatSat testing platforms, satellite networks and routing algorithms, intelligent on-board systems, laser sensors, photodetectors, avionics and altimeters, guidance and control of sounding rockets, and assistive actuation for EVA tools.",
		"chairs": [
			{
				"name": "Renuganth Varatharajoo",
				"affiliation": "Universiti Putra Malaysia, Malaysia"
			},
			{
				"name": "Ekaterina Gosteva",
				"affiliation": "RUDN University, Russia"
			}
		],
		"sessions": [
			9,
			14
		]
	}
];

export const technicalSessions: TechnicalSession[] = [
	{
		"number": 1,
		"code": "SFM",
		"title": "Space Flight Mechanics 1",
		"date": "Wednesday, November 25",
		"time": "10:00 – 12:45",
		"hall": "Hall Mercury",
		"chairs": [
			{
				"name": "Shufan Wu",
				"affiliation": "Shanghai Jiao Tong University, China"
			},
			{
				"name": "Vladimir Razoumny",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-103",
				"title": "Adaptive Neuro-Fuzzy Inference System for Satellite Attitude Control",
				"authors": [
					"Jia Jian Tee, Renuganth Varatharajoo, Universiti Putra Malaysia, Malaysia"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-142",
				"title": "Nonlinear Attitude Control Analysis of an Orbital Insertion Stage with Cold-Gas Propulsion Using On-Off Control with Hysteresis, Deadband, and Maximum Actuation Time",
				"authors": [
					"Gabriel Silva, Waldemar Leite, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-162",
				"title": "Accelerating PPO Reinforcement Learning through Consistent Pre-Initialization of Actor and Critic in an Aircraft Flight Control Task and Prospects for Applying the Approach to Spacecraft Control",
				"authors": [
					"Ahmad Braje, RUDN University, Syria",
					"Sergei Kupreev, RUDN University, Russia"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-191",
				"title": "Singular Approaches in Control Moment Gyroscope Steering as Folds of the Time Map: Forecasting and Certified Switching Deadlines",
				"authors": [
					"Caio Fagonde, Federal University of ABC, Brazil",
					"Willer Santos, Aeronautics Institute of Technology, Brazil",
					"Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-085",
				"title": "Bifurcation Control of Tether System Dynamics: From Chaos to Order",
				"authors": [
					"Sergei Kupreev, RUDN University, Russia",
					"Ahmad Braje, RUDN University, Syria",
					"Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-151",
				"title": "Analytical Study of Space Debris Deorbiting Using Electrodynamic Tethers",
				"authors": [
					"Jean Pablo Costa, Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-165",
				"title": "Comparison of Three Control Strategies for Very Low Earth Orbit Station-Keeping: Fixed-Period, Hysteresis, and Predictive Hysteresis",
				"authors": [
					"Kagan Yurtkolesi, Izmir University of Economics, Azerbaijan",
					"Ali Kaan Karaabali, Yasar University, Azerbaijan"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-157",
				"title": "Distributed Finite-Time Control with Prescribed Performance and Collision Avoidance for Spacecraft Formation Flying Near Irregular Asteroids",
				"authors": [
					"Yuedong Wu, Ruiqin Xu, Shufan Wu, Shanghai Jiao Tong University, China",
					"Yury Razoumny, RUDN University, Russia"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-166",
				"title": "Dynamics and Parametric Study of Electric Solar Wind Sails",
				"authors": [
					"Alejandro Reyes Alves de Abreu, Maria Cecilia Pereira, Federal University of Minas Gerais, Brazil",
					"Lucas Gouvea Meireles, São Paulo State University, Brazil",
					"Pedro Palma Maia Ornelas, Joao Gabriel Nicacio de Jesus, Federal University of Minas Gerais, Brazil"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-169",
				"title": "A study on the challenges of Artificial Intelligence methods for solar sailing",
				"authors": [
					"Lucas Meireles, Othon Winter, São Paulo State University, Brazil",
					"Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "12:30 – 12:45",
				"id": "SciTech2026-193",
				"title": "Controlled Deployment and Stabilization of a Phobos Space Elevator",
				"authors": [
					"Vladimir Aslanov, Alexander Ledkov, Samara National Research University, Russia"
				]
			}
		]
	},
	{
		"number": 2,
		"code": "SMS",
		"title": "Spacecraft Materials & Structures 1",
		"date": "Wednesday, November 25",
		"time": "10:00 – 13:00",
		"hall": "Hall Mars",
		"chairs": [
			{
				"name": "Meena Laad",
				"affiliation": "Symbiosis Institute of Technology, India"
			},
			{
				"name": "Kazem Reza Kashy Zadeh",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-029",
				"title": "A new low-alloyed Ti-based alloy, produced via selective laser melting method, as a promising material for the future application in the space industry",
				"authors": [
					"Malika Kagieva, RUDN University, Russia"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-027",
				"title": "Lightweight Crack-Resistant TiAl-Based Materials via Zr Alloying and SHS-Compression for Next-Generation Space Applications",
				"authors": [
					"Ivan Nazarko, Pavel Bazhin, RUDN University, Russia"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-079",
				"title": "Micro-Arc Oxidation in Addressing Complex Challenges of Space Engineering",
				"authors": [
					"Bichiko Dekanozishvili, RUDN University, Russia"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-006",
				"title": "Fatigue Life Enhancement of AISI 1050 Carbon Steel by Different Types of Shot Peening Process for Aerospace Structural Applications",
				"authors": [
					"Kazem Reza Kashyzadeh, Artur Asoyan, Sergey Khlopkov, RUDN University, Russia",
					"Biru Melese Yihune, RUDN University, Ethiopia"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-007",
				"title": "Experimental and Numerical Investigation of Residual Stress Relaxation in Shot Peened AISI 1060 Steel under Cyclic Loading: Application in Aerospace",
				"authors": [
					"Kazem Reza Kashyzadeh, Artur Asoyan, Sergey Khlopkov, RUDN University, Russia",
					"Eric Irankunda, RUDN University, Burundi"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-008",
				"title": "Taguchi-Based Sensitivity Analysis of Shot Peening Parameters on Hardness, Grain Size, and Residual Stress in AISI 1060 Steel for Aerospace Surface Engineering",
				"authors": [
					"Kazem Reza Kashyzadeh, Artur Asoyan, Sergey Khlopkov, RUDN University, Russia",
					"Biru Melese Yihune, RUDN University, Ethiopia"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-010",
				"title": "Thermal Stability of Natural Frequencies in Functionally Graded Zirconia–Steel Beams: Finite Element Simulation and Machine Learning Prediction",
				"authors": [
					"Kazem Reza Kashyzadeh, Siamak Ghorbani, RUDN University, Russia",
					"Abdoul Karim Issoufa Mamne, RUDN University, Niger"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-018",
				"title": "Prospective Polymer Materials for Extreme Operating Conditions: Technologies for Pipeline and Space Infrastructure in BRICS Countries",
				"authors": [
					"Evgeniya Chueva, Mariya Berdnik, RUDN University, Russia",
					"Honore Tcharo, RUDN University, Benin"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-044",
				"title": "Intelligent Space Structures: Sensor-Driven Materials and Adaptive Systems for Interplanetary Missions",
				"authors": [
					"Mahmoud Obeid, RUDN University, Jordan",
					"Mohammed Abu-Mahadi, RUDN University, Russia"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-100",
				"title": "Engineered Timber and Bio-Based Materials for Interiors and Secondary Structures of Space Habitats: Opportunities and Constraints",
				"authors": [
					"Emil Akshov, RUDN University, Russia"
				]
			},
			{
				"time": "12:30 – 12:45",
				"id": "SciTech2026-106",
				"title": "Aerogel insulation materials in the construction of space-based structures: thermal protection, energy efficiency, and prospects for application on the Moon and Mars",
				"authors": [
					"Shakir M. N. Al-Oayef, Asser M. Elsheikh, Vladimir Migin, RUDN University, Russia"
				]
			},
			{
				"time": "12:45 – 13:00",
				"id": "SciTech2026-206",
				"title": "Graphene-Reinforced Polymer Nanocomposites for Space Structures: A Literature-Based ANOVA of Loading Effects on Mechanical Properties",
				"authors": [
					"Fiza Pathan, Meena Laad, Symbiosis Institute of Technology, India"
				]
			}
		]
	},
	{
		"number": 3,
		"code": "SAH",
		"title": "Space Architecture & Habitats 1",
		"date": "Wednesday, November 25",
		"time": "10:00 – 13:00",
		"hall": "Hall Saturn",
		"chairs": [
			{
				"name": "Petro Ernest Pesha",
				"affiliation": "Dar es Salaam Institute of Technology, Tanzania"
			},
			{
				"name": "Ivan Khalil",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-003",
				"title": "Artificial Gravity Station Design: A First-Principles Architectural Approach",
				"authors": [
					"Sidi Mohammed Kadi, RUDN University, Algeria"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-002",
				"title": "Inflatable Softgoods Architecture: A Roadmap for In-Space Manufacturing of Resilient Space Structures",
				"authors": [
					"Jiachuan Zhang, RUDN University, China"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-094",
				"title": "Design for Repurposing: Spent Upper Stages and Launch Vehicle Tanks as Habitable Volumes in Orbit",
				"authors": [
					"Czyunyuj Lu, RUDN University, China",
					"Danila Ershov, RUDN University, Russia"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-134",
				"title": "Modular Growth Strategies for Orbital Stations: Architectural Scalability and System Integration",
				"authors": [
					"Xue Guo, RUDN University, Russia"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-136",
				"title": "Tensioned Membrane Architecture for Expandable Orbital Habitats: Structural Efficiency and Outfitting Integration",
				"authors": [
					"Ahmed Abdrabbo, RUDN University, Palestine"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-137",
				"title": "Deployable Truss Structures for Large-Scale Orbital Infrastructure: Architectural Applications and Constraints",
				"authors": [
					"Vladislav Kovalev, RUDN University, Russia"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-130",
				"title": "Urban Planning Principles for Orbital Habitats: Lessons from Terrestrial Settlement Patterns",
				"authors": [
					"Ammar Alhasan, RUDN University, Syria"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-146",
				"title": "Habitability Factors in Orbital Habitats: Integrating Psychological and Physiological Requirements into Architectural Design",
				"authors": [
					"Adli Hijazi, RUDN University, Jordan"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-038",
				"title": "Linear Orbital Structures in Architectural and Technological Concepts for Recreational and Commercial Use under Conditions of Human Presence in Space",
				"authors": [
					"Alexander Rummo, RUDN University, Russia"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-053",
				"title": "Spacecraft Interior Architecture: Ergonomics and Spatial Design for Long-Duration Missions",
				"authors": [
					"Alexey Osinkin, RUDN University, Russia"
				]
			},
			{
				"time": "12:30 – 12:45",
				"id": "SciTech2026-091",
				"title": "Circadian Lighting Design for Long-Duration Missions: Spectral Tuning, Spatial Distribution and Sensor Feedback",
				"authors": [
					"Danila Ershov, Ivan Halil, RUDN University, Russia"
				]
			},
			{
				"time": "12:45 – 13:00",
				"id": "SciTech2026-098",
				"title": "Transformable Multifunctional Furniture and Kinematic Partitions for Small-Volume Space Habitats",
				"authors": [
					"Veronika Ershova, Ivan Halil, RUDN University, Russia"
				]
			}
		]
	},
	{
		"number": 4,
		"code": "SPLE",
		"title": "Space Policy, Law & Economics 1",
		"date": "Wednesday, November 25",
		"time": "10:00 – 12:45",
		"hall": "Hall Pluton",
		"chairs": [
			{
				"name": "Irina Chernykh",
				"affiliation": "RUDN University, Russia"
			},
			{
				"name": "Narkhanim Orujova",
				"affiliation": "Space Agency of the Republic of Azerbaijan, Azerbaijan"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-197",
				"title": "(Online) The fragmentation of international space law in the context of competing lunar initiatives: the Artemis Accords, the positions of Russia and China, and the prospects for a universal legal regime for lunar exploration",
				"authors": [
					"Andrei Dementev, RUDN University, Russia"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-213",
				"title": "A Commons Approach to Governance of Outer Space Exploitation",
				"authors": [
					"Nomfundo Pearl Zondi, Anthoni van Nieuwkerk, Thabo Mbeki African School of Public and International Affairs, South Africa"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-198",
				"title": "Registration Aspects of Space Objects: Considerations from the Perspective of ISL Science",
				"authors": [
					"Irina Chernykh, RUDN University, Russia"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-199",
				"title": "Contribution of the International Telecommunication Union to Regulating the Use of Radio Spectrum and Orbital Satellites",
				"authors": [
					"Maksim Kuznetsov, RUDN University, Russia"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-200",
				"title": "Active Remediation of Space Debris Objects: Legal Barriers and Consent Regimes",
				"authors": [
					"Danila Zaryugin, RUDN University, Russia"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-201",
				"title": "International Legal Activities of the USSR in Shaping the International Legal Regime for the Exploration and Use of Outer Space at the Final Stage of Its Existence (1985-1991)",
				"authors": [
					"Mekan Khemraev, RUDN University, Russia"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-202",
				"title": "From Observation to Threat Assessment: The International Legal Significance of the Distinction Between SSA and SDA",
				"authors": [
					"Ruslan Konygin, RUDN University, Russia"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-203",
				"title": "In-Orbit Servicing: Challenges for International Law",
				"authors": [
					"Anastasia Konygina, MGIMO University, Russia"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-204",
				"title": "International legal aspects of the extraction of space resources: experience of Arctic development",
				"authors": [
					"Yulia Shipilova, RUDN University, Russia"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-205",
				"title": "Perspectives on American projects for the deployment of data centers in outer space",
				"authors": [
					"Dmitry Shishov, Ministry of Economic Development of the Russian Federation, Russia"
				]
			},
			{
				"time": "12:30 – 12:45",
				"id": "SciTech2026-101",
				"title": "Beyond Launches: Building Resilient Space Operations Ecosystems for Africa's Emerging NewSpace Economy and Sustainable Development",
				"authors": [
					"Ravinder Rena, Woxsen University, India",
					"Linda Paul, Durban University of Technology, South Africa"
				]
			}
		]
	},
	{
		"number": 5,
		"code": "SGI",
		"title": "Spaceports, Ground Infrastructure & Operations 1",
		"date": "Wednesday, November 25",
		"time": "10:00 – 12:15",
		"hall": "Hall Neptune",
		"chairs": [
			{
				"name": "Francis Chizea",
				"affiliation": "National Space Research and Development Agency, Federal Republic of Nigeria"
			},
			{
				"name": "Vera Galishnikova",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-042",
				"title": "Residual load-bearing capacity of corroded reinforced concrete members of spaceport ground facilities",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Mikhail E. Ershov, RUDN University, Russia",
					"Wael Diab, RUDN University, Syria"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-049",
				"title": "Modified high-strength concretes based on industrial and agricultural wastes for flexural structural elements of spaceport facilities",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Mohammad Alipour, RUDN University, Iran"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-063",
				"title": "Frost-Resistant High-Strength Fiber-Reinforced Concrete for Spaceport Structures",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Hossein Soltanizadeh, RUDN University, Iran"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-161",
				"title": "Load-Bearing Potential of the Developed Ultra-High Performance Concrete for Spaceport Infrastructure",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Ala Edinne Remita, RUDN University, Algeria"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-013",
				"title": "Application of rubber-based concretes for the construction of gas-escape channels of the rocket launch pad at the cosmodrome",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Andrei A. Anisimov, RUDN University, Russia",
					"Arina A. Bakirova, RUDN University, Kazakhstan"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-031",
				"title": "Rubber Concrete for Propellant Spill Zones of Launch Facilities",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Yulianna A. Morozova, RUDN University, Russia",
					"Wael Diab, RUDN University, Syria"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-047",
				"title": "Energy Dissipation in EPS-Modified Functionally Graded Reinforced Concrete for Space Cosmodrome Infrastructure under Dynamic Loading",
				"authors": [
					"Gizachew M. Dabi, RUDN University, Ethiopia",
					"Marina Rynkovskaya, RUDN University, Russia",
					"Ababo K. Soboka, RUDN University, Ethiopia",
					"Evgenia Ermakova, RUDN University, Russia"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-051",
				"title": "Hybrid Steel-Basalt Fiber Concrete Beam-Column Joints under Launch-Induced Dynamic Loading",
				"authors": [
					"Tewodros Temede Baza, Marina Rynkovskaya, RUDN University, Russia"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-055",
				"title": "Experimental Screening of CFRP and Superelastic NiTi Anchorage Systems for Strengthening Concrete Structural Elements with Potential Application to Space Infrastructure",
				"authors": [
					"Lami Sileshi Dereje, Marina Rynkovskaya, RUDN University, Russia",
					"Debiso Bedaso Gemeda, Bule Hora University, Ethiopia"
				]
			}
		]
	},
	{
		"number": 6,
		"code": "SSE",
		"title": "Solar System Exploration",
		"date": "Wednesday, November 25",
		"time": "14:00 – 16:45",
		"hall": "Hall Mercury",
		"chairs": [
			{
				"name": "Antonio Prado",
				"affiliation": "National Institute for Space Research, Brazil"
			},
			{
				"name": "Olga Saltykova",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "14:00 – 14:15",
				"id": "SciTech2026-143",
				"title": "On detection strategy of dangerous asteroids",
				"authors": [
					"Boris Shustov, Andrey Shugarov, Institute of Astronomy of the Russian Academy of Sciences, Russia"
				]
			},
			{
				"time": "14:15 – 14:30",
				"id": "SciTech2026-140",
				"title": "Synergy of space-born and ground-based systems to detect decameter size asteroid in near Earth space",
				"authors": [
					"Andrey Shugarov, Boris Shustov, Institute of Astronomy of the Russian Academy of Sciences, Russia"
				]
			},
			{
				"time": "14:30 – 14:45",
				"id": "SciTech2026-159",
				"title": "Trajectory Design and Optimization for Asteroid-Based Planetary Defense Missions",
				"authors": [
					"Olga Chernenko, Natan Eismont, Vladislav Zubko, Maxim Pupkov, Space Research Institute of the Russian Academy of Sciences, Russia"
				]
			},
			{
				"time": "14:45 – 15:00",
				"id": "SciTech2026-156",
				"title": "Low-Energy Multi-Asteroid Missions Using Venus-Resonant Orbits and Split-Probe Deployment",
				"authors": [
					"Vladislav Zubko, Natan Eismont, Olga Chernenko, Maksim Pupkov, Space Research Institute of the Russian Academy of Sciences, Russia"
				]
			},
			{
				"time": "15:00 – 15:15",
				"id": "SciTech2026-150",
				"title": "GravDyn: An Open-Source Framework for Gravitational Modeling and Orbital Dynamics Around Irregular Celestial Bodies",
				"authors": [
					"Safwan Aljbaae, Universidad de Atacama, Chile",
					"Valerio Carruba, São Paulo State University, Brazil",
					"Allan de Almeida Jr, Universidade de Coimbra, Portugal",
					"Gabriel Carita, São Paulo State University, Brazil",
					"Antonio Prado, National Institute for Space Research, Brazil",
					"Marcelo Mota, Instituto Federal de Hortolândia, Brazil",
					"Carlos Lopes, Universidad de Atacama, Chile"
				]
			},
			{
				"time": "15:15 – 15:30",
				"id": "SciTech2026-147",
				"title": "Derivative-Free Optimization of a Direct Earth-Mars Interplanetary Trajectory: A Comparative Study of Metaheuristic Algorithms",
				"authors": [
					"Gabriel Rocha Pinto, Antonio Prado, Nandamudi Lankalapalli Vijaykumar, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "15:30 – 15:45",
				"id": "SciTech2026-171",
				"title": "Trajectory Operations for the Deployment of Multiple Atmospheric Probes into Venus During Parachute Descent",
				"authors": [
					"Michael Vincent Quispe Mendoza, Moscow Aviation Institute, Bolivia",
					"Boris Liubeznyi, Victor Vorontsov, Moscow Aviation Institute, Russia"
				]
			},
			{
				"time": "15:45 – 16:00",
				"id": "SciTech2026-173",
				"title": "Constellation Design Around Ganymede Using Hall-Effect Thrusters",
				"authors": [
					"Thamis Ferreira, São Paulo State University, Brazil",
					"Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "16:00 – 16:15",
				"id": "SciTech2026-023",
				"title": "Regional Exploration on the Moon",
				"authors": [
					"Guzeliya Mullagalyamova, RUDN University, Russia",
					"Mohammad Idrees Quraishi, RUDN University, Afghanistan"
				]
			},
			{
				"time": "16:15 – 16:30",
				"id": "SciTech2026-178",
				"title": "Petroleum Engineering in Space: Applications and Future Visions",
				"authors": [
					"Haoyue Yang, RUDN University, China",
					"Mani Momeni, RUDN University, Russia"
				]
			},
			{
				"time": "16:30 – 16:45",
				"id": "SciTech2026-211",
				"title": "ASTRA: Uncertainty-Aware Classification of Kepler Transit Candidates with Subjective Logic and Conformal Prediction",
				"authors": [
					"Advik Sethi, Meena Laad, Symbiosis Institute of Technology, India"
				]
			}
		]
	},
	{
		"number": 7,
		"code": "SPP",
		"title": "Space Power & Propulsion",
		"date": "Wednesday, November 25",
		"time": "14:00 – 17:00",
		"hall": "Hall Mars",
		"chairs": [
			{
				"name": "Felix Mora-Camino",
				"affiliation": "French Civil Aviation University, France"
			},
			{
				"name": "Siamak Ghorbani",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "14:00 – 14:15",
				"id": "SciTech2026-081",
				"title": "Uranium Mining on the Moon: Research, Hypotheses, Utilization, Cooling and Radiological Safety",
				"authors": [
					"Alla Kostenko, RUDN University, Russia"
				]
			},
			{
				"time": "14:15 – 14:30",
				"id": "SciTech2026-115",
				"title": "Development and Validation of Solid Vulcan: Benchmarking an In-House Internal Ballistics Simulator Against Open-Source Software and Static Fire Data",
				"authors": [
					"Tiago Gomes, Joao Vitor Macena, Daniel Gudin, Pablo Moura, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "14:30 – 14:45",
				"id": "SciTech2026-118",
				"title": "Computational Fluid Dynamics Study of Chamber Filling and Pressurization transient in Solid Rocket Motors",
				"authors": [
					"Joao Vitor Macena, Daniel Gudin, Pablo Moura, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "14:45 – 15:00",
				"id": "SciTech2026-114",
				"title": "Effect of Potassium Nitrate Particle Size on the Burn Rate of KNSB Solid Propellant",
				"authors": [
					"Ari Gabriel da Silva, Joao Vitor Macena, Daniel Gudin, Pablo Moura, Ines Castro, Keven Domingos, Igor Muzzi, Joao Khazrik, Tiago Gomes, Raissa Joyce, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "15:00 – 15:15",
				"id": "SciTech2026-116",
				"title": "Effect of SLES Surfactant on the Burn Rate of KNSB Solid Propellant: Preliminary Strand Tests",
				"authors": [
					"Ines Castro, Joao Vitor Macena, Daniel Gudin, Pablo Moura, Keven Domingos, Igor Muzzi, Joao Khazrik, Ari Gabriel da Silva, Tiago Gomes, Raissa Joyce, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "15:15 – 15:30",
				"id": "SciTech2026-117",
				"title": "Effects of Iron Oxide Primer on Ignition Delay and Linear Regression Rate of KNSB Propellant",
				"authors": [
					"Keven Domingos, Joao Vitor Macena, Daniel Gudin, Pablo Moura, Ines Castro, Igor Muzzi, Joao Khazrik, Ari Gabriel da Silva, Tiago Gomes, Raissa Joyce, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "15:30 – 15:45",
				"id": "SciTech2026-119",
				"title": "Solid Propellant Grain Density Optimization via Vibratory Compaction: Implications for Burn Uniformity",
				"authors": [
					"Daniel Gudin, Tiago Gomes, Igor Muzzi, Joao Vitor Macena, Pablo Moura, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "15:45 – 16:00",
				"id": "SciTech2026-123",
				"title": "Recrystallization and Preliminary Characterization of Potassium Nitrate from Commercial Fertilizer for Solid Propellants",
				"authors": [
					"Joao Khazrik, Daniel Gudin, Joao Vitor Macena, Pablo Moura, Ines Castro, Keven Domingos, Igor Muzzi, Ari Gabriel da Silva, Tiago Gomes, Raissa Joyce, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "16:00 – 16:15",
				"id": "SciTech2026-107",
				"title": "Analytical Assessment of Transonic Shock-Induced Structural Response in a Sounding Rocket",
				"authors": [
					"Ana Julia Machado, Pablo Moura, Beatriz Perecmanis, Joao Vitor Macena, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "16:15 – 16:30",
				"id": "SciTech2026-108",
				"title": "Aeroelastic Fin Flutter Analysis of Sounding Rockets in the Transonic Regime",
				"authors": [
					"Bernardo Valerio, Pablo Moura, Beatriz Perecmanis, Joao Vitor Macena, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "16:30 – 16:45",
				"id": "SciTech2026-121",
				"title": "Comparative Validation of Sounding Rocket Flight Trajectory Simulations Through Experimental Data and Uncertainty Analysis",
				"authors": [
					"Sofia Dias, Pablo Moura, Joao Vitor Macena, Fabio Krykhtine, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "16:45 – 17:00",
				"id": "SciTech2026-210",
				"title": "Dielectric Materials Withstanding Low Temperatures",
				"authors": [
					"Gunjan Goyal, Akansha Wadhwani, Meena Laad, Symbiosis Institute of Technology, India"
				]
			}
		]
	},
	{
		"number": 8,
		"code": "EO",
		"title": "Earth Observations 1",
		"date": "Wednesday, November 25",
		"time": "14:00 – 16:15",
		"hall": "Hall Saturn",
		"chairs": [
			{
				"name": "Tarun P. Singh",
				"affiliation": "Symbiosis Institute of Geoinformatics, India"
			},
			{
				"name": "Elizaveta Shemyakina",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "14:00 – 14:15",
				"id": "SciTech2026-021",
				"title": "Satellite Remote Sensing of Lithium-Bearing Pegmatites: Application of Novel Spectral Indices and Multisensor Data",
				"authors": [
					"Zakiou Aboulaye N’Diaye, Aboulaye Coulibaly, RUDN University, Mali",
					"Guzeliya Mullagalyamova, RUDN University, Russia"
				]
			},
			{
				"time": "14:15 – 14:30",
				"id": "SciTech2026-020",
				"title": "Remote Sensing for Mineral Exploration: Multisensor Data and Spectral Analysis",
				"authors": [
					"Guzeliya Mullagalyamova, RUDN University, Russia",
					"Aboulaye Coulibaly, Zakiou Aboulaye N’Diaye, RUDN University, Mali"
				]
			},
			{
				"time": "14:30 – 14:45",
				"id": "SciTech2026-024",
				"title": "Structural Controls on Uranium Mineralization in the Mkuju River (Southern Tanzania) Based on Processed Harmonized Landsat Sentinel-2 Remote Sensing Data",
				"authors": [
					"Julia Ivanova, RUDN University, Russia",
					"Jusmine Macaranga, Doreen Mshiu, RUDN University, Tanzania"
				]
			},
			{
				"time": "14:45 – 15:00",
				"id": "SciTech2026-078",
				"title": "Application of multispectral satellite imagery analysis for preliminary prospectivity assessment of placer deposits",
				"authors": [
					"Mikhail Neymyshev, RUDN University, Russia"
				]
			},
			{
				"time": "15:00 – 15:15",
				"id": "SciTech2026-082",
				"title": "Application of Artificial Intelligence Algorithms in the Geological Interpretation of Satellite Data and Radio Sounding Results in Southern Peru",
				"authors": [
					"Vladimir Abramov, RUDN University, Russia"
				]
			},
			{
				"time": "15:15 – 15:30",
				"id": "SciTech2026-039",
				"title": "From Space to the Subsurface: Integrating Satellite Observations to Explore Petroleum Systems from Source Rocks to Traps",
				"authors": [
					"Mohammad Idrees Quraishi, RUDN University, Afghanistan",
					"Moises Romero, RUDN University, Russia"
				]
			},
			{
				"time": "15:30 – 15:45",
				"id": "SciTech2026-059",
				"title": "Application of Space Technologies for Hydrocarbon Prospectivity Prediction: Integrated Morphometric and Lineament Analysis of ALOS PALSAR Data",
				"authors": [
					"Valentina Usova, Anna Zaitseva, RUDN University, Russia",
					"Jelson Pasiencia Junior, RUDN University, Angola"
				]
			},
			{
				"time": "15:45 – 16:00",
				"id": "SciTech2026-028",
				"title": "Integrated Application of Satellite Imagery and Artificial Intelligence in the Oil and Gas Industry",
				"authors": [
					"Honore Tcharo, RUDN University, Benin",
					"Abdulkadir Muhammad Bature, RUDN University, Federal Republic of Nigeria"
				]
			},
			{
				"time": "16:00 – 16:15",
				"id": "SciTech2026-187",
				"title": "A Cloud-Based Framework for Satellite-Derived Dust Susceptibility Mapping Using Metaheuristic-Optimized LightGBM",
				"authors": [
					"Javad Hatamiafkoueieh, RUDN University, Russia"
				]
			}
		]
	},
	{
		"number": 9,
		"code": "SSA",
		"title": "Small Satellites, Space Sensors & Actuators 1",
		"date": "Wednesday, November 25",
		"time": "14:00 – 16:45",
		"hall": "Hall Pluton",
		"chairs": [
			{
				"name": "Renuganth Varatharajoo",
				"affiliation": "Universiti Putra Malaysia, Malaysia"
			},
			{
				"name": "Ekaterina Gosteva",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "14:00 – 14:15",
				"id": "SciTech2026-026",
				"title": "Improving the Reliability of Ignition of Laser Sensors for the Spacecraft Stabilization System",
				"authors": [
					"Anton Sinelnikov, Ilya Smetanin, RUDN University, Russia",
					"Esteban Josue Gutierrez Benavides, RUDN University, Costa Rica"
				]
			},
			{
				"time": "14:15 – 14:30",
				"id": "SciTech2026-076",
				"title": "Threshold power density of mono-pulse nanosecond laser radiation for back-illuminated InGaAs p–i–n photodiodes",
				"authors": [
					"Kirill Belik, Aleksei Koronnov, RUDN University, Russia"
				]
			},
			{
				"time": "14:30 – 14:45",
				"id": "SciTech2026-057",
				"title": "Intelligent Systems in Space Engineering for High Performance",
				"authors": [
					"Frank Ibikunle, Hensard University, Federal Republic of Nigeria"
				]
			},
			{
				"time": "14:45 – 15:00",
				"id": "SciTech2026-111",
				"title": "Design, Manufacturing, and Validation of a Pitot Probe for a High-Subsonic Sounding Rocket",
				"authors": [
					"Pablo Moura, Fabio Krykhtine, Claudio Miceli, Beatriz Fonseca, Denilson Junior, Laurent Janod, Fernando Bezerra, Rafael Bernardino, Yasmin Araujo, Joao Vitor Macena, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "15:00 – 15:15",
				"id": "SciTech2026-132",
				"title": "System-Level Design of a Dual-Satellite Relay Architecture for Real-Time Earth Observation",
				"authors": [
					"Alexander Starkov, Moscow Aviation Institute, Russia",
					"Aung Myo Thant, Nay Htet Linn, Kaung Htet Win, Moscow Aviation Institute, Myanmar"
				]
			},
			{
				"time": "15:15 – 15:30",
				"id": "SciTech2026-126",
				"title": "Design of an Onboard Altimeter with Sensor Fusion for Event Detection in a Two-Stage Rocket",
				"authors": [
					"Fellipe Borges, Denilson Junior, Yasmin Araujo, Joao Vitor Macena, Pablo Moura, Claudio Miceli, Fabio Krykhtine, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "15:30 – 15:45",
				"id": "SciTech2026-127",
				"title": "Data Acquisition System for High-Rate Onboard Measurement of Parachute Opening Shock Force",
				"authors": [
					"Gustavo Daniel Cruz, Denilson Junior, Yasmin Araujo, Gabriela Aragao, Gabrielle Correa, Laurent Janod, Joao Vitor Macena, Pablo Moura, Claudio Miceli, Fabio Krykhtine, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "15:45 – 16:00",
				"id": "SciTech2026-128",
				"title": "Modular Power Supply System for a Two-Stage Rocket Altimeter and Its Pyrotechnic Channels",
				"authors": [
					"Nathan Fernandes, Denilson Junior, Yasmin Araujo, Joao Vitor Macena, Pablo Moura, Claudio Miceli, Fabio Krykhtine, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "16:00 – 16:15",
				"id": "SciTech2026-129",
				"title": "Onboard Guidance Navigation and Control Architecture for Trajectory Estimation in a Two-Stage Rocket",
				"authors": [
					"Gabrielle Mendonca, Denilson Junior, Yasmin Araujo, Joao Vitor Macena, Pablo Moura, Claudio Miceli, Fabio Krykhtine, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "16:15 – 16:30",
				"id": "SciTech2026-194",
				"title": "Probabilistic and Risk-Based Multi-Criteria Approach for the Scheduling of Space Project Activities at the Preliminary Design Phase",
				"authors": [
					"Eugenii Tatarchenko, Research Center for Space Economy and Policy, Russia"
				]
			},
			{
				"time": "16:30 – 16:45",
				"id": "SciTech2026-209",
				"title": "Statistical Assessment of Magnetic Materials for Aerospace Applications: A Literature-Based Comparative Study",
				"authors": [
					"Priyanka Jagtap, Meena Laad, Symbiosis Institute of Technology, India"
				]
			}
		]
	},
	{
		"number": 10,
		"code": "SGI",
		"title": "Spaceports, Ground Infrastructure & Operations 2",
		"date": "Wednesday, November 25",
		"time": "14:00 – 16:00",
		"hall": "Hall Neptune",
		"chairs": [
			{
				"name": "Francis Chizea",
				"affiliation": "National Space Research and Development Agency, Federal Republic of Nigeria"
			},
			{
				"name": "Vera Galishnikova",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "14:00 – 14:15",
				"id": "SciTech2026-160",
				"title": "High-Strength Concrete with Polydisperse Reinforcements for Space Rocket Launch Pads and Ground Infrastructure: Role, Performance, and Application Prospects",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Ahmad Bilal Najib, RUDN University, Afghanistan"
				]
			},
			{
				"time": "14:15 – 14:30",
				"id": "SciTech2026-014",
				"title": "Improvement of the methodology for calculating structures using composite reinforcement for spaceport facilities",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Mohannad Mousa Aqel Uwais, RUDN University, Jordan"
				]
			},
			{
				"time": "14:30 – 14:45",
				"id": "SciTech2026-030",
				"title": "Timber dowel joints with pressed-in composite bushings for cosmodrome and pre-flight testing facilities",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Serafim S. Zagorodnii, RUDN University, Russia",
					"Gardy Prophete, RUDN University, Haiti"
				]
			},
			{
				"time": "14:45 – 15:00",
				"id": "SciTech2026-035",
				"title": "Permanent steel-mesh formwork for concrete structures: load-bearing capacity, deformations, and elements for spaceport launch pads",
				"authors": [
					"Galina E. Okolnikova, RUDN University, National Research University MGSU, Russia",
					"Kenan Alzaibak, RUDN University, Syria"
				]
			},
			{
				"time": "15:00 – 15:15",
				"id": "SciTech2026-163",
				"title": "Factors to Be Taken into Account When Selecting a Launch Site for a Super-Light-Class Launch Vehicle",
				"authors": [
					"Andrei Ivanov, Igor Borovik, Moscow Aviation Institute, Russia"
				]
			},
			{
				"time": "15:15 – 15:30",
				"id": "SciTech2026-017",
				"title": "Automated Geodetic and Mine Surveying Technologies for the Construction of the International Lunar Research Station",
				"authors": [
					"Anna Bykova, Sergei Paramonov, RUDN University, Russia"
				]
			},
			{
				"time": "15:30 – 15:45",
				"id": "SciTech2026-073",
				"title": "An Algorithm for Constructing a Feasible Location Area for Lifting Equipment During Modular Lunar Base Assembly",
				"authors": [
					"Vladimir Migin, Asser M. Elsheikh, Shakir M. N. Al-Oayef, RUDN University, Russia"
				]
			},
			{
				"time": "15:45 – 16:00",
				"id": "SciTech2026-075",
				"title": "An Asset Information Model for Maintenance Management of Lunar Base Modules: Adapting the BIM–FM Approach to Resource-Constrained Environments",
				"authors": [
					"Karrar Al-jaberi, RUDN University, Iraq",
					"Yusuf Mohamed Ali, Asser Elsheikh, RUDN University, Russia"
				]
			}
		]
	},
	{
		"number": 11,
		"code": "SFM",
		"title": "Space Flight Mechanics 2",
		"date": "Thursday, November 26",
		"time": "10:00 – 12:45",
		"hall": "Hall Mercury",
		"chairs": [
			{
				"name": "Shufan Wu",
				"affiliation": "Shanghai Jiao Tong University, China"
			},
			{
				"name": "Vladimir Razoumny",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-155",
				"title": "Investigation of the switching function for coplanar low-thrust transfers with a constant orbital period",
				"authors": [
					"Anton Emelyanov, Alexey Ivanyukhin, Moscow Aviation Institute, RUDN University, Russia"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-084",
				"title": "The Orbital Ferry as a Logistics Backbone for a Permanent Lunar Base",
				"authors": [
					"Sergei Kupreev, Fadi Ibrahim, RUDN University, Russia",
					"Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-152",
				"title": "Orbital and Propulsion Sensitivities of Combined Low-Thrust Maneuvers for Small Satellites",
				"authors": [
					"Pedro Gonzalez, Antonio Prado, National Institute for Space Research, Brazil",
					"Claudia Celeste, Federal University of ABC, Brazil"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-104",
				"title": "Formulation and Implementation of a Hybrid Evolutionary Neural Network Method for Spacecraft Trajectory Optimization",
				"authors": [
					"Amirul Fiqri Abdullah, Renuganth Varatharajoo, Universiti Putra Malaysia, Malaysia"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-196",
				"title": "Computational Analysis of Dynamics and Control of Space Robot Manipulators: Minimizing Capture Contact Force",
				"authors": [
					"Yeshurun Alemayehu, Space Science and Geospatial Institute (Ethiopian Space Agency), Ethiopia"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-139",
				"title": "Family-archive differential evolution (FADE) for two-impulse Earth–Moon transfers in the bicircular four-body problem",
				"authors": [
					"Gabriel Carita, São Paulo State University, Brazil",
					"Leticia Camila Silva de Souza, Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-144",
				"title": "Dynamical Analysis and Metaheuristic Optimization of Bi-Impulsive Earth–Moon Escape Transfers",
				"authors": [
					"Victor Gaspar, National Institute for Space Research, Brazil",
					"Gabriel Carita, São Paulo State University, Brazil",
					"Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-138",
				"title": "Initial populations from earlier solutions for transfers to distant retrograde and retrograde co-orbital orbits",
				"authors": [
					"Lucas Caprio Ribeiro, National Institute for Space Research, Brazil",
					"Gabriel Carita, São Paulo State University, Brazil",
					"Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-105",
				"title": "GDOP Performance Analysis of Lunar Navigation Satellite Constellations Considering Orbital Perturbations",
				"authors": [
					"Ana Paula Chiaradia, São Paulo State University, Brazil"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-124",
				"title": "Analysis of Transfer Trajectories and Mission Architectures to Extreme Trans-Neptunian Objects",
				"authors": [
					"Vladislav Zubko, Space Research Institute of the Russian Academy of Sciences, Russia"
				]
			},
			{
				"time": "12:30 – 12:45",
				"id": "SciTech2026-183",
				"title": "Orbit Selection for Space-Ground Millimetre VLBI Imaging of Supermassive Black Holes: Coverage Trade-Space, Nodal Precession and Commensurability Effects",
				"authors": [
					"Daniil Matiunin, RUDN University, Russia"
				]
			}
		]
	},
	{
		"number": 12,
		"code": "SMS",
		"title": "Spacecraft Materials & Structures 2",
		"date": "Thursday, November 26",
		"time": "10:00 – 13:15",
		"hall": "Hall Mars",
		"chairs": [
			{
				"name": "Meena Laad",
				"affiliation": "Symbiosis Institute of Technology, India"
			},
			{
				"name": "Kazem Reza Kashy Zadeh",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-009",
				"title": "A New Probabilistic Algorithm for Fatigue Life Assessment of Structural Components under Random Non-Proportional Multi-Axial Loading",
				"authors": [
					"Kazem Reza Kashyzadeh, RUDN University, Russia",
					"Eric Irankunda, RUDN University, Burundi"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-011",
				"title": "Frequency-Domain Fatigue Life Assessment of Structural Components: A Review",
				"authors": [
					"Kazem Reza Kashyzadeh, Siamak Ghorbani, RUDN University, Russia",
					"Abdoul Karim Issoufa Mamne, RUDN University, Niger"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-012",
				"title": "Stiffness and Natural Frequency Enhancement of Aluminum 6061 by Titanium Carbide Nanoparticle Reinforcement for Satellite Structures",
				"authors": [
					"Kazem Reza Kashyzadeh, Siamak Ghorbani, RUDN University, Russia",
					"Yixiao Zhou, RUDN University, China"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-077",
				"title": "Topology Optimization and Lightweight Design of a Satellite Equipment Mounting Bracket",
				"authors": [
					"Mingxiao Zhou, RUDN University, China"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-083",
				"title": "Tube reduction technology for rigid struts in spacecraft structures: advantages over welded joints and critical performance verification",
				"authors": [
					"Andrei Chikin, Pavel Davydenko, RUDN University, Russia"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-045",
				"title": "Materials and Structural Design for Extraterrestrial Habitats",
				"authors": [
					"Mahmoud Obeid, RUDN University, Jordan",
					"Mohammed Abu-Mahadi, RUDN University, Russia"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-052",
				"title": "Lunar Surface Infrastructure: Experimental Investigation of Concrete Cover Effects on Shear Failure in Wide Reinforced Concrete Beams",
				"authors": [
					"Hewan Dejene Delsho, Marina Rynkovskaya, RUDN University, Russia"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-110",
				"title": "Finite Element Analysis and In-Flight Structural Validation of Thrust and Recovery Bulkheads for High-Power Rockets",
				"authors": [
					"Lucas Augusto, Pablo Moura, Beatriz Perecmanis, Joao Vitor Macena, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-122",
				"title": "Manufacturing Quality and Mechanical Performance of Composite Rocket Airframes",
				"authors": [
					"Marcelo Lobo, Pablo Moura, Beatriz Perecmanis, Joao Vitor Macena, Fabio Krykhtine, Claudio Miceli, Minerva Rockets, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-112",
				"title": "Toroidal and Semi-Ellipsoidal In-house Fabricated Parachutes: A Comparative Perspective on Sounding Rocket Recovery Systems",
				"authors": [
					"Luis Guilherme Nogueira Torres, Gabriela Aragao, Gabrielle Camargo, Pablo Moura, Joao Vitor Macena, Laurent Janod, Joao Pedro Martini Duarte, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "12:30 – 12:45",
				"id": "SciTech2026-113",
				"title": "Forebody-Wake Effects on Pilot Parachute Extraction: A Sizing Expression for a Sounding Rocket Recovery System",
				"authors": [
					"Joao Pedro Martini Duarte, Gabriela Aragao, Gabrielle Camargo, Pablo Moura, Luis Guilherme Nogueira Torres, Laurent Janod, Joao Vitor Macena, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "12:45 – 13:00",
				"id": "SciTech2026-125",
				"title": "In-Flight Performance Assessment of a Reefing Parachute for Experimental Rocket Recovery Systems",
				"authors": [
					"Gabrielle Correa de Camargo, Gabriela Aragao, Pablo Moura, Joao Vitor Macena, Laurent Janod, Luigi Bussadori, Joao Pedro Martini, Luis Guilherme Torres, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "13:00 – 13:15",
				"id": "SciTech2026-207",
				"title": "Self-Cleaning Functional Coatings for Space Applications: A Descriptive Statistical Analysis of Materials, Performance and Research Trends",
				"authors": [
					"Akhila Shalu, Meena Laad, Symbiosis Institute of Technology, India"
				]
			}
		]
	},
	{
		"number": 13,
		"code": "SAH",
		"title": "Space Architecture & Habitats 2",
		"date": "Thursday, November 26",
		"time": "10:00 – 13:00",
		"hall": "Hall Saturn",
		"chairs": [
			{
				"name": "Petro Ernest Pesha",
				"affiliation": "Dar es Salaam Institute of Technology, Tanzania"
			},
			{
				"name": "Ivan Khalil",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-096",
				"title": "GIS-Based Multi-Criteria Assessment of Lunar South Polar Sites for Habitat Placement: Illumination, Slope and Communication Constraints",
				"authors": [
					"Kseniya Tokmagasheva, RUDN University, Kazakhstan"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-095",
				"title": "From Orbital Radar to Architectural Concept: Lava Tubes and Skylights as Natural Shelters for Lunar Habitats",
				"authors": [
					"Vej Chen, RUDN University, China",
					"Ivan Halil, RUDN University, Russia"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-097",
				"title": "Funicular Form-Finding for Regolith-Printed Lunar Shelters: Reconciling Structural Efficiency with Layer-Wise Printing Constraints",
				"authors": [
					"Mariam Ibishova, RUDN University, Azerbaijan"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-071",
				"title": "Hybrid Softgoods-Regolith Habitats: Architectural Strategies for Minimizing Surface Infrastructure Dependencies",
				"authors": [
					"Jihad Mortada Zeaiter, RUDN University, Lebanon"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-036",
				"title": "Parametric Design of Modular Mars Habitats: Site-Specific Configurations Using In-Situ Regolith",
				"authors": [
					"Rafael Vargas, RUDN University, Colombia"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-058",
				"title": "Mars Settlement Architecture: Symbiotic Design Frameworks for Dual Habitation",
				"authors": [
					"Mohammed Al-Khayani, RUDN University, Yemen"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-068",
				"title": "Lunar Surface Architecture: Structural Solutions for Extreme Thermal Environments",
				"authors": [
					"Anna Mareeva, RUDN University, Russia",
					"Ahmed Osama Mohammed Abdrabbo, RUDN University, Palestine"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-072",
				"title": "Sulfur Concrete as a Waterless Binder for Construction on the Moon and Mars",
				"authors": [
					"Arkadii Kurilov, RUDN University, Russia"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-099",
				"title": "Radiation Protection as a Spatial Design Driver: Occupancy-Weighted Zoning of Crew Habitats on the Lunar Surface",
				"authors": [
					"Sofiya Yarish, RUDN University, Russia"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-149",
				"title": "Lunar Habitat Window Systems: Architectural Frameworks for Visual Access Under Extreme Environmental Constraints",
				"authors": [
					"Nastaran Abbaszadeh, RUDN University, Iran"
				]
			},
			{
				"time": "12:30 – 12:45",
				"id": "SciTech2026-066",
				"title": "Soundscape Design for Space Habitats: Acoustic Architecture for Psychological and Operational Performance",
				"authors": [
					"Maozhen Wang, RUDN University, China"
				]
			},
			{
				"time": "12:45 – 13:00",
				"id": "SciTech2026-093",
				"title": "Acoustic Comfort in Pressurised Habitats: Noise-Control Design Strategies and Sensor-Based Soundscape Management",
				"authors": [
					"Danila Ershov, RUDN University, Russia",
					"Kazur Marah, RUDN University, Syria"
				]
			}
		]
	},
	{
		"number": 14,
		"code": "SSA",
		"title": "Small Satellites, Space Sensors & Actuators 2",
		"date": "Thursday, November 26",
		"time": "10:00 – 12:30",
		"hall": "Hall Pluton",
		"chairs": [
			{
				"name": "Renuganth Varatharajoo",
				"affiliation": "Universiti Putra Malaysia, Malaysia"
			},
			{
				"name": "Ekaterina Gosteva",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-109",
				"title": "A Methodology for the Comprehensive Evaluation of Routing Algorithm Performance in Multi Satellite Communication Systems",
				"authors": [
					"Yuri Malusin, Pavel Savelev, Moscow Aviation Institute, Russia"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-145",
				"title": "Modeling and Optimization of Hybrid GEO/LEO Satellite Communication Networks for Developing Countries (Case Study in Myanmar)",
				"authors": [
					"Alexander Starkov, Moscow Aviation Institute, Russia",
					"Aung Myo Thant, Nay Htet Linn, Kaung Htet Win, Moscow Aviation Institute, Myanmar"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-092",
				"title": "Ergonomic Design and Assistive Actuation for EVA Gloves and Hand Tools: A Human–Tool System Approach",
				"authors": [
					"Danila Ershov, Arina Nikishenkova, RUDN University, Russia"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-033",
				"title": "Application of Quantum-Inspired Methods for Space Sensors and Actuators",
				"authors": [
					"Daniil Mityagin, RUDN University; MIREA – Russian Technological University, Russia"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-004",
				"title": "Dimensionality- and Substrate-Driven Electronic and Magnetic Transitions in CrN: A DFT+U Study",
				"authors": [
					"Anastasia Bashkatova, Bauman Moscow State Technical University, Russia",
					"Leonid Kushchuk, HSE University, Russia",
					"Tatyana Medintseva, Alexey Kartsev, RUDN University, Russia"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-167",
				"title": "From Mission-Specific Avionics to a Mission-Agnostic CubeSat On-Board Computer: Hardware Evolution and Reliability-Oriented Design",
				"authors": [
					"Eduarda Marques, Rafael Silva, Gabrielle Sousa, Lucas Pacheco, Manuella Oliveira, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-168",
				"title": "High-Efficiency Power Generation for CubeSats: MPPT Hardware Architecture and Validation Strategy",
				"authors": [
					"Lucas Pacheco, Pedro Mattos, Rafael Silva, Manuella Oliveira, Eduarda Marques, Gabrielle Sousa, Claudio Miceli, Fabio Krykhtine, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-172",
				"title": "Reliable Communication Architecture for CubeSats: CAN Protocol Implementation and Validation Strategy",
				"authors": [
					"Gabrielle Sousa, Lucas Pacheco, Rafael Silva, Manuella Oliveira, Eduarda Marques, Claudio Miceli, Fabio Krykhtine, Victor Moreira, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-170",
				"title": "Design of a Low-Cost FlatSat Platform for CubeSat Integration, Simulation and Remote Verification",
				"authors": [
					"Rafael Bernardino, Eduarda Marques, Gabrielle Sousa, Lucas Pacheco, Cesar Matheus Pestana, Manuella Oliveira, Claudio Miceli, Fabio Krykhtine, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-208",
				"title": "A Mission-Driven Comparison Method for Metallic and Composite Deployable Booms",
				"authors": [
					"Avani Singh, Meena Laad, Symbiosis Institute of Technology, India"
				]
			}
		]
	},
	{
		"number": 15,
		"code": "EO",
		"title": "Earth Observations 2",
		"date": "Thursday, November 26",
		"time": "10:00 – 12:30",
		"hall": "Hall Neptune",
		"chairs": [
			{
				"name": "Tarun P. Singh",
				"affiliation": "Symbiosis Institute of Geoinformatics, India"
			},
			{
				"name": "Elizaveta Shemyakina",
				"affiliation": "RUDN University, Russia"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-186",
				"title": "Integrating Sentinel-1 InSAR and Explainable Machine Learning for Land Subsidence Hazard Assessment",
				"authors": [
					"Javad Hatamiafkoueieh, RUDN University, Russia"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-087",
				"title": "Integrated Open-Pit Slope Stability Monitoring: Combining Satellite Radar and Ground-Based Measurements",
				"authors": [
					"Ekaterina Esina, RUDN University, Russia",
					"Akbar Doskalov, Roksana Doskalova, RUDN University, Uzbekistan"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-037",
				"title": "Structural Control of Uranium Mineralization in the Karoo Basin, Southern Tanzania, Based on Harmonized Landsat Sentinel-2 and ASTER GDEM Data",
				"authors": [
					"Julia Ivanova, RUDN University, Russia",
					"Eunice Masunga, Jamila Omar, RUDN University, Tanzania"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-180",
				"title": "Integrating Satellite InSAR and Well Data for Safer Drilling and Oil and Gas Extraction",
				"authors": [
					"Yahya Bouhari, RUDN University, Niger",
					"Mani Momeni, RUDN University, Russia"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-040",
				"title": "Prospects of Application of Satellite Monitoring of Methane Emissions for Oil Production Optimization",
				"authors": [
					"Honore Tcharo, RUDN University, Benin",
					"Elie Junior Djo Bi, RUDN University, Côte d'Ivoire",
					"Jozua Ezra Samuel Tsoi Tjon A, RUDN University, Suriname"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-061",
				"title": "Improving Oil and Gas Production with Satellite Technologies",
				"authors": [
					"Honore Tcharo, RUDN University, Benin",
					"Yuzhe Wu, RUDN University, China"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-019",
				"title": "Integration of Earth Remote Sensing Data and GIS for Monitoring the Reliability of Main Pipelines",
				"authors": [
					"Evgeniya Chueva, Mariya Berdnik, RUDN University, Russia",
					"Honore Tcharo, RUDN University, Benin"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-135",
				"title": "Artificial Intelligence and Satellite Remote Sensing (Sentinel-1/2) for Flood Monitoring and Environmental Risk Management in the Congo Basin",
				"authors": [
					"Divin Kengamu, Divin Initiative, DR Congo"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-154",
				"title": "AI-Based Pre-Filtering for State Vectors from SP3 Files",
				"authors": [
					"Hector Jose Puentes Ruiz, Jhonathan Orlando Murcia Pineros, Antonio Prado, National Institute for Space Research, Brazil"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-212",
				"title": "Monitoring Urban Expansion and Vegetation Loss in Pune’s Urban Hills Using Multi-Temporal Satellite Imagery",
				"authors": [
					"Shaina Dewangan, Meena Laad, Symbiosis Institute of Technology, India"
				]
			}
		]
	},
	{
		"number": 16,
		"code": "SPLE",
		"title": "Space Policy, Law & Economics 2",
		"date": "Thursday, November 26",
		"time": "10:00 – 12:45",
		"hall": "Hall Venus",
		"chairs": [
			{
				"name": "Ekaterina Kovaleva",
				"affiliation": "RUDN University, Russia"
			},
			{
				"name": "Narkhanim Orujova",
				"affiliation": "Space Agency of the Republic of Azerbaijan, Azerbaijan"
			}
		],
		"papers": [
			{
				"time": "10:00 – 10:15",
				"id": "SciTech2026-174",
				"title": "Operational Deconfliction vs. National Appropriation: Protective Arrangements Around Long-Term Lunar Installations Under Article II of the Outer Space Treaty",
				"authors": [
					"Sher Afgan, HSE University, Russia"
				]
			},
			{
				"time": "10:15 – 10:30",
				"id": "SciTech2026-158",
				"title": "Terms and terminological collocations in space law discourse",
				"authors": [
					"Andrey Korzin, RUDN University, Russia"
				]
			},
			{
				"time": "10:30 – 10:45",
				"id": "SciTech2026-177",
				"title": "Economic and managerial frameworks for space debris mitigation and satellite mega-constellations regulation",
				"authors": [
					"Albina Marinova, Independent researcher, Russia"
				]
			},
			{
				"time": "10:45 – 11:00",
				"id": "SciTech2026-214",
				"title": "Equity in the Use of Geostationary Orbit Resources",
				"authors": [
					"Fabio Krykhtine, Federal University of Rio de Janeiro, Brazil",
					"Oludolapo A. Olanrewaju, Durban University of Technology, South Africa",
					"Sergio Gonzalez-Rojo, Instituto Tecnológico de Chihuahua, Mexico",
					"Felix Mora-Camino, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "11:00 – 11:15",
				"id": "SciTech2026-102",
				"title": "From Safari to Space: Reimagining Africa's Tourism Economy Through Commercial Spaceflight and NewSpace Entrepreneurship Ecosystems",
				"authors": [
					"Linda Paul, Ravinder Rena, Durban University of Technology, South Africa"
				]
			},
			{
				"time": "11:15 – 11:30",
				"id": "SciTech2026-185",
				"title": "Accountable Autonomy in Space Mission Operations: A Trust–Liability Governance Framework for Human-Agentic AI Teaming",
				"authors": [
					"Nageswara Rao Aderla, Ravinder Rena, Woxsen University, India"
				]
			},
			{
				"time": "11:30 – 11:45",
				"id": "SciTech2026-141",
				"title": "Operational Planning of Critical Rocket Missions: Organizational Structure, Safety Protocols and Lessons from a Motor Static Firing and a Flight Operation",
				"authors": [
					"Lucas Miranda, Pablo Moura, Joao Vitor Macena, Gabriela Aragao, Laurent Janod, Denilson Junior, Fabio Krykhtine, Claudio Miceli, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "11:45 – 12:00",
				"id": "SciTech2026-184",
				"title": "Talent as the Binding Constraint: A Human-Capital Readiness Framework for India’s Liberalised NewSpace Economy",
				"authors": [
					"Ravinder Rena, Nageswara Rao Aderla, Woxsen University, India"
				]
			},
			{
				"time": "12:00 – 12:15",
				"id": "SciTech2026-120",
				"title": "Organizational Learning and Technological Capability Accumulation in University aerospace engineering research group: Member Turnover and Knowledge Transfer",
				"authors": [
					"Willian Rocha, Joao Vitor Macena, Fabio Krykhtine, Pablo Moura, Claudio Miceli, Thiago Cavalcante, Federal University of Rio de Janeiro, Brazil"
				]
			},
			{
				"time": "12:15 – 12:30",
				"id": "SciTech2026-133",
				"title": "Current Opportunities for Space Exploration: Legal and Economic Aspects",
				"authors": [
					"Nelson Avakyan, MGIMO University, Russia"
				]
			},
			{
				"time": "12:30 – 12:45",
				"id": "SciTech2026-192",
				"title": "Legal Regulation of Dark and Quiet Skies and Unintended Electromagnetic Radiation from Large Satellite Constellations: International Legal Gaps and Ways Forward",
				"authors": [
					"Valeriya Amelina, Vladimir Koltsov, Taisiya Kalimulina, MGIMO University, Russia"
				]
			}
		]
	}
];
