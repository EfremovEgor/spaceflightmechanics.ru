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
  return `7th SciTech Forum on Space Engineering and Operations Support | ${title}`;
};

const keywords = {
  name: "keywords",
  content: "space, flights, scitech, forum, engineering, mechanics",
};

export const Routes: TRoutes = {
  home: {
    name: "home",
    path: "/",
    meta: [
      {
        title: makeMetaTitle("Home"),
      },
      {
        name: "description",
        content:
          "7th SciTech Forum on Space Engineering and Operations Support is taking place on November 24-26, 2026 in RUDN University, Moscow, Russia",
      },
      keywords,
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
      {
        name: "description",
        content:
          "International program committee is consisted of the chair Yury N. Razoumny, 7 co-chairs and 14 members. The Forum is taking place in the main building of RUDN university",
      },
      keywords,
    ],
    showInNav: true,
  },
  sessions_and_highlights: {
    name: "sessions_and_highlights",
    path: "/sessions-and-highlights",
    showInNav: true,

    routes: {
      program: {
        name: "program",
        path: "program",
        showInNav: true,
        meta: [
          {
            title: makeMetaTitle("Technical Program"),
          },
          {
            name: "description",
            content:
              "Detailed description of planned forum's program. Explore a multi-day agenda of presentations, and workshops detailing the latest technical innovations",
          },
          keywords,
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
          {
            name: "description",
            content:
              "Discover the main themes to be discussed of the forum, featuring visionary keynotes, authoritative speakers, and the most compelling topics in the industry.",
          },
          keywords,
        ],
        disabled: false,
      },
      roundtable_meetings: {
        name: "roundtable_meetings",
        path: "roundtable-meetings",
        showInNav: true,
        meta: [
          {
            title: makeMetaTitle("Roundtable meetings"),
          },
          {
            name: "description",
            content:
              "Engage in interactive, small-group discussions designed to foster collaboration, debate current trends, and solve shared industry challenges.",
          },
          keywords,
        ],
        disabled: false,
      },
      technical_sessions: {
        name: "technical_sessions",
        path: "technical-sessions",
        showInNav: true,
        meta: [
          {
            title: makeMetaTitle("Technical Sessions"),
          },
          {
            name: "description",
            content:
              "Dive into the core scientific and engineering program of the forum, featuring research presentations and validated technical solutions.",
          },
          keywords,
        ],
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
      {
        name: "description",
        content:
          "Submit your original research, case studies, or technical papers to contribute to the forum's prestigious academic and professional program.",
      },
      keywords,
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
      {
        name: "description",
        content:
          "Register your new profile today to connect with industry leaders and participate in exclusive networking events.",
      },
      keywords,
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
      {
        name: "description",
        content:
          "Welcome to the central hub for SciTech forum series, connecting professional networks with cutting-edge engineering and technical knowledge.",
      },
      keywords,
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
      {
        name: "description",
        content:
          "Reach out to our dedicated organizing committee for assistance with registration, speaking opportunities, or logistics.",
      },
      keywords,
    ],
    showInNav: true,
  },
};
