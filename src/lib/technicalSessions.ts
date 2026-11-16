// Generated from the 2026 Technical Program (sessions overview). Papers are published separately.

export interface TechnicalSessionChair {
	name: string;
	affiliation: string;
}

export interface TechnicalSession {
	number: number;
	code: string;
	title: string;
	/** Day and part of day, e.g. "Wednesday, November 25 – Morning sessions". */
	group: string;
	time: string;
	hall: string;
	description: string;
	chairs: TechnicalSessionChair[];
}

export const technicalSessions: TechnicalSession[] = [
	{
		"number": 1,
		"code": "SFM",
		"title": "Space Flight Mechanics 1",
		"group": "Wednesday, November 25 – Morning sessions",
		"time": "10:00 – 12:30",
		"hall": "Hall Mercury",
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
		]
	},
	{
		"number": 2,
		"code": "SMS",
		"title": "Spacecraft Materials & Structures 1",
		"group": "Wednesday, November 25 – Morning sessions",
		"time": "10:00 – 12:45",
		"hall": "Hall Mars",
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
		]
	},
	{
		"number": 3,
		"code": "SAH",
		"title": "Space Architecture & Habitats 1",
		"group": "Wednesday, November 25 – Morning sessions",
		"time": "10:00 – 13:00",
		"hall": "Hall Saturn",
		"description": "The session addresses the architecture of orbital stations and of habitats on the Moon and Mars: artificial gravity stations, inflatable softgoods, membrane and deployable truss structures, reuse of spent upper stages, modular growth and habitability of orbital settlements, interior ergonomics and lighting, as well as lunar base siting, lava tubes as natural shelters, regolith-printed and sulfurconcrete structures, and thermal, radiation and acoustic protection.",
		"chairs": [
			{
				"name": "Petro Ernest Pesha",
				"affiliation": "Dar es Salaam Institute of Technology, Tanzania"
			},
			{
				"name": "Ivan Khalil",
				"affiliation": "RUDN University, Russia"
			}
		]
	},
	{
		"number": 4,
		"code": "SPLE",
		"title": "Space Policy, Law & Economics",
		"group": "Wednesday, November 25 – Morning sessions",
		"time": "10:00 – 12:45",
		"hall": "Hall Pluton",
		"description": "The session is devoted to the discussion of the complex and increasingly critical intersection of legal frameworks, policy development and economic considerations that govern space activities. It is also focused on governance, regulation and sustainable economic growth in the space sector, protective arrangements around long-term lunar activities, national space legislation and licensing, emerging space economies, human capital for NewSpace, space debris mitigation and the commercialization of space exploration activities.",
		"chairs": [
			{
				"name": "Sergei Kupreev",
				"affiliation": "RUDN University, Russia"
			},
			{
				"name": "Narkhanim Orujova",
				"affiliation": "Space Agency of the Republic of Azerbaijan, Azerbaijan"
			}
		]
	},
	{
		"number": 5,
		"code": "SGI",
		"title": "Spaceports, Ground Infrastructure & Operations 1",
		"group": "Wednesday, November 25 – Morning sessions",
		"time": "10:00 – 12:15",
		"hall": "Hall Neptune",
		"description": "The session is dedicated to the design, construction and operation of spaceports and ground infrastructure: high-strength, fiber-reinforced and ultra-high performance concretes, rubber-based concretes for gas-escape channels, corrosion and residual capacity of reinforced concrete members, strengthening of structures under extreme loads, composite reinforcement, selection of launch sites for light-class launch vehicles, and surveying and information modelling for lunar bases.",
		"chairs": [
			{
				"name": "Francis Chizea",
				"affiliation": "National Space Research and Development Agency (NASRDA), Federal Republic of Nigeria"
			},
			{
				"name": "Vera Galishnikova",
				"affiliation": "RUDN University, Russia"
			}
		]
	},
	{
		"number": 6,
		"code": "SSE",
		"title": "Solar System Exploration",
		"group": "Wednesday, November 25 – Afternoon sessions",
		"time": "14:00 – 16:30",
		"hall": "Hall Mercury",
		"description": "The session covers mission analysis and trajectory design for the exploration of the Solar System and its small bodies, including multi-asteroid tours, missions to trans-Neptunian objects, Venus, Mars and Ganymede, gravitational modelling and spacecraft dynamics around irregular bodies, regional exploration and resources of the Moon, as well as the detection of near-Earth objects and planetary defense strategies.",
		"chairs": [
			{
				"name": "Antonio Prado",
				"affiliation": "National Institute for Space Research (INPE), Brazil"
			},
			{
				"name": "Olga Saltykova",
				"affiliation": "RUDN University, Russia"
			}
		]
	},
	{
		"number": 7,
		"code": "SPP",
		"title": "Space Power & Propulsion",
		"group": "Wednesday, November 25 – Afternoon sessions",
		"time": "14:00 – 16:45",
		"hall": "Hall Mars",
		"description": "The session addresses sub-orbital, Earth-to-orbit and in-space propulsion, including solid propellant research, burn rate and ignition studies, internal ballistics and chamber pressurization, as well as nuclear and other power sources for planetary bases. The session also features university rocketry programmes: development, ground testing and flight validation of sounding rockets, their motors and aerostructures.",
		"chairs": [
			{
				"name": "Felix Mora-Camino",
				"affiliation": "French Civil Aviation University (ENAC), France"
			},
			{
				"name": "Siamak Ghorbani",
				"affiliation": "RUDN University, Russia"
			}
		]
	},
	{
		"number": 8,
		"code": "EO",
		"title": "Earth Observations 1",
		"group": "Wednesday, November 25 – Afternoon sessions",
		"time": "14:00 – 16:45",
		"hall": "Hall Saturn",
		"description": "The session covers Earth observations from space for natural resources, the environment and economic needs: multispectral and radar remote sensing of mineral deposits, lineament analysis for hydrocarbon prospectivity, satellite monitoring of methane emissions, InSAR monitoring of land subsidence and oil and gas fields, monitoring of pipelines, dust storms, soil, groundwater and floods, and machine learning for satellite data.",
		"chairs": [
			{
				"name": "Tarun P. Singh",
				"affiliation": "Symbiosis Institute of Geoinformatics, India"
			},
			{
				"name": "Elizaveta Shemyakina",
				"affiliation": "RUDN University, Russia"
			}
		]
	},
	{
		"number": 9,
		"code": "SSA",
		"title": "Small Satellites, Space Sensors & Actuators 1",
		"group": "Wednesday, November 25 – Afternoon sessions",
		"time": "14:00 – 16:15",
		"hall": "Hall Pluton",
		"description": "The technical session is focused on small satellite missions and on-board systems that enable spacecraft and launch vehicles to perceive their environment and execute commands: CubeSat computers, power and communication buses, FlatSat testing platforms, satellite networks and routing algorithms, intelligent on-board systems, laser sensors, photodetectors, avionics and altimeters, guidance and control of sounding rockets, and assistive actuation for EVA tools.",
		"chairs": [
			{
				"name": "Renuganth Varatharajoo",
				"affiliation": "Universiti Putra Malaysia, Malaysia"
			},
			{
				"name": "Svetlana Agasieva",
				"affiliation": "RUDN University, Russia"
			}
		]
	},
	{
		"number": 10,
		"code": "SGI",
		"title": "Spaceports, Ground Infrastructure & Operations 2",
		"group": "Wednesday, November 25 – Afternoon sessions",
		"time": "14:00 – 16:00",
		"hall": "Hall Neptune",
		"description": "The session is dedicated to the design, construction and operation of spaceports and ground infrastructure: high-strength, fiber-reinforced and ultra-high performance concretes, rubber-based concretes for gas-escape channels, corrosion and residual capacity of reinforced concrete members, strengthening of structures under extreme loads, composite reinforcement, selection of launch sites for light-class launch vehicles, and surveying and information modelling for lunar bases.",
		"chairs": [
			{
				"name": "Francis Chizea",
				"affiliation": "National Space Research and Development Agency (NASRDA), Federal Republic of Nigeria"
			},
			{
				"name": "Vera Galishnikova",
				"affiliation": "RUDN University, Russia"
			}
		]
	},
	{
		"number": 11,
		"code": "SFM",
		"title": "Space Flight Mechanics 2",
		"group": "Thursday, November 26 – Morning sessions",
		"time": "10:00 – 12:45",
		"hall": "Hall Mercury",
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
		]
	},
	{
		"number": 12,
		"code": "SMS",
		"title": "Spacecraft Materials & Structures 2",
		"group": "Thursday, November 26 – Morning sessions",
		"time": "10:00 – 13:00",
		"hall": "Hall Mars",
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
		]
	},
	{
		"number": 13,
		"code": "SAH",
		"title": "Space Architecture & Habitats 2",
		"group": "Thursday, November 26 – Morning sessions",
		"time": "10:00 – 13:00",
		"hall": "Hall Saturn",
		"description": "The session addresses the architecture of orbital stations and of habitats on the Moon and Mars: artificial gravity stations, inflatable softgoods, membrane and deployable truss structures, reuse of spent upper stages, modular growth and habitability of orbital settlements, interior ergonomics and lighting, as well as lunar base siting, lava tubes as natural shelters, regolith-printed and sulfurconcrete structures, and thermal, radiation and acoustic protection.",
		"chairs": [
			{
				"name": "Petro Ernest Pesha",
				"affiliation": "Dar es Salaam Institute of Technology, Tanzania"
			},
			{
				"name": "Ivan Khalil",
				"affiliation": "RUDN University, Russia"
			}
		]
	},
	{
		"number": 14,
		"code": "SSA",
		"title": "Small Satellites, Space Sensors & Actuators 2",
		"group": "Thursday, November 26 – Morning sessions",
		"time": "10:00 – 12:15",
		"hall": "Hall Pluton",
		"description": "The technical session is focused on small satellite missions and on-board systems that enable spacecraft and launch vehicles to perceive their environment and execute commands: CubeSat computers, power and communication buses, FlatSat testing platforms, satellite networks and routing algorithms, intelligent on-board systems, laser sensors, photodetectors, avionics and altimeters, guidance and control of sounding rockets, and assistive actuation for EVA tools.",
		"chairs": [
			{
				"name": "Renuganth Varatharajoo",
				"affiliation": "Universiti Putra Malaysia, Malaysia"
			},
			{
				"name": "Svetlana Agasieva",
				"affiliation": "RUDN University, Russia"
			}
		]
	},
	{
		"number": 15,
		"code": "EO",
		"title": "Earth Observations 2",
		"group": "Thursday, November 26 – Morning sessions",
		"time": "10:00 – 12:30",
		"hall": "Hall Neptune",
		"description": "The session covers Earth observations from space for natural resources, the environment and economic needs: multispectral and radar remote sensing of mineral deposits, lineament analysis for hydrocarbon prospectivity, satellite monitoring of methane emissions, InSAR monitoring of land subsidence and oil and gas fields, monitoring of pipelines, dust storms, soil, groundwater and floods, and machine learning for satellite data.",
		"chairs": [
			{
				"name": "Tarun P. Singh",
				"affiliation": "Symbiosis Institute of Geoinformatics, India"
			},
			{
				"name": "Elizaveta Shemyakina",
				"affiliation": "RUDN University, Russia"
			}
		]
	}
];
