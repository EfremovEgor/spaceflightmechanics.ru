export interface CommitteeMember {
	fullName: string;
	affiliation: string;
	role: string;
}

export const committee: CommitteeMember[] = [
  {
    fullName: "Yury N. Razoumny",
    affiliation: "RUDN University, Russia",
    role: "Chair",
  },
  {
    fullName: "Ketan Kotecha",
    affiliation: "Symbiosis Institute of Technology, India",
    role: "Co-Chair",
  },
  {
    fullName: "Antonio Prado",
    affiliation: "National Institute for Space Research, Brazil",
    role: "Co-Chair",
  },
  {
    fullName: "Shufan Wu",
    affiliation: "Shanghai Jiao Tong University, China",
    role: "Co-Chair",
  },
  {
    fullName: "Renuganth Varatharajoo",
    affiliation: "Universiti Putra Malaysia, Malaysia",
    role: "Co-Chair",
  },
  {
    fullName: "Elena Fantino",
    affiliation: "Khalifa University of Science and Technology, UAE",
    role: "Co-Chair",
  },
  {
    fullName: "Francis Chizea",
    affiliation: "National Space Research and Development Agency, Nigeria",
    role: "Co-Chair",
  },
  {
    fullName: "Yeshurun Alemayehu",
    affiliation: "Ministry of Innovation and Technology, Ethiopia",
    role: "Co-Chair",
  },
  {
    fullName: "Christophe Bonnal",
    affiliation: "CNES, France",
    role: "Member",
  },
  {
    fullName: "Filippo Graziani",
    affiliation: "University of Pisa, Italy",
    role: "Member",
  },
  {
    fullName: "Rock Jeng-Shing Chern",
    affiliation: "Ryerson University, Canada",
    role: "Member",
  },
  {
    fullName: "Pini Gurfil",
    affiliation: "Technion, Israel Institute of Technology, Israel",
    role: "Member",
  },
  {
    fullName: "Djojodihardjo Harijono",
    affiliation: "University Putra, Malaysia",
    role: "Member",
  },
  {
    fullName: "Meena Laad",
    affiliation: "Symbiosis Institute of Technology, India",
    role: "Member",
  },
  {
    fullName: "Bok Jik Lee",
    affiliation: "Seoul National University, Korea",
    role: "Member",
  },
  {
    fullName: "Robert Melton",
    affiliation: "Penn State University, USA",
    role: "Member",
  },
  {
    fullName: "Arun Misra",
    affiliation: "McGill University, Canada",
    role: "Member",
  },
  {
    fullName: "Daniele Mortari",
    affiliation: "University of Arizona, USA",
    role: "Member",
  },
  {
    fullName: "Peter Jan Pahl",
    affiliation: "Freie Universitaet Berlin, Germany",
    role: "Member",
  },
  {
    fullName: "Giancarlo Genta",
    affiliation: "Polytechnic University of Turin, Italy",
    role: "Member",
  },
  {
    fullName: "Maria Antonietta Perino",
    affiliation: "Polytechnic University of Turin, Italy",
    role: "Member",
  },
  {
    fullName: "Sergei Chernyshev",
    affiliation: "Russian Academy of Sciences, Russia",
    role: "Member",
  },
];

/** Russian spelling for members from Russia; other names stay in Latin script. */
export const NAME_RU: Record<string, string> = {
	"Yury N. Razoumny": "Юрий Н. Разумный",
	"Sergei Chernyshev": "Сергей Чернышёв",
};

export const AFFILIATION_RU: Record<string, string> = {
	"RUDN University, Russia": "РУДН, Россия",
	"Symbiosis Institute of Technology, India": "Технологический институт Симбиоз, Индия",
	"National Institute for Space Research, Brazil": "Национальный институт космических исследований (INPE), Бразилия",
	"Shanghai Jiao Tong University, China": "Шанхайский университет Цзяотун, Китай",
	"Universiti Putra Malaysia, Malaysia": "Университет Путра Малайзия, Малайзия",
	"Khalifa University of Science and Technology, UAE": "Университет науки и технологий имени Халифы, ОАЭ",
	"National Space Research and Development Agency, Nigeria":
		"Национальное агентство космических исследований и разработок, Нигерия",
	"Ministry of Innovation and Technology, Ethiopia": "Министерство инноваций и технологий, Эфиопия",
	"CNES, France": "CNES, Франция",
	"University of Pisa, Italy": "Пизанский университет, Италия",
	"Ryerson University, Canada": "Университет Райерсона, Канада",
	"Technion, Israel Institute of Technology, Israel": "Технион — Израильский технологический институт, Израиль",
	"University Putra, Malaysia": "Университет Путра, Малайзия",
	"Seoul National University, Korea": "Сеульский национальный университет, Корея",
	"Penn State University, USA": "Университет штата Пенсильвания, США",
	"McGill University, Canada": "Университет Макгилла, Канада",
	"University of Arizona, USA": "Аризонский университет, США",
	"Freie Universitaet Berlin, Germany": "Свободный университет Берлина, Германия",
	"Polytechnic University of Turin, Italy": "Туринский политехнический университет, Италия",
	"Russian Academy of Sciences, Russia": "Российская академия наук, Россия",
};
