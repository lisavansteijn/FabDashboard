import { NUXT_PATHS } from "~~/lib/constants";

export const useSEOStore = defineStore("useSEOStore", {
  state: () => ({
    seo: {
      title: "The Fab(ulous) Dashboard",
      description: "",
      og: {
        title: "",
        description: "",
      },
      twitter: {
        title: "",
        description: "",
      },
    },
  }),
  getters: {
    /** Returns SEO for a given path. Call from setup with useRoute().path so useRoute() is not used inside the getter. */
    getSEO: state => (path: string) => {
      switch (path) {
        case NUXT_PATHS.get("Home"):
          return {
            title: `${state.seo.title} | Home`,
            description: "make tracking your sales and project management easier with our integrated dashboard featuring a Trello-like and insightful sales analytics.",
            og: {
              title: state.seo.title + state.seo.title,
              description: state.seo.description,
            },
            twitter: {
              title: state.seo.title + state.seo.title,
              description: state.seo.description,
            },
          };
        case NUXT_PATHS.get("SalesReport"):
          return {
            title: `${state.seo.title} | Sales Report`,
            description: "make tracking your sales and project management easier with our integrated dashboard featuring a Trello-like and insightful sales analytics.",
            og: {
              title: state.seo.title + state.seo.title,
              description: state.seo.description,
            },
            twitter: {
              title: state.seo.title + state.seo.title,
              description: state.seo.description,
            },
          };
        case NUXT_PATHS.get("Dashboard"):
          return {
            title: `${state.seo.title} | Dashboard`,
            description: "make tracking your sales and project management easier with our integrated dashboard featuring a Trello-like and insightful sales analytics.",
            og: {
              title: state.seo.title + state.seo.title,
              description: state.seo.description,
            },
            twitter: {
              title: state.seo.title + state.seo.title,
              description: state.seo.description,
            },
          };
        default:
          return {
            title: `${state.seo.title} | ${path}`,
            description: "make tracking your sales and project management easier with our integrated dashboard featuring a Trello-like and insightful sales analytics.",
            og: {
              title: state.seo.title + state.seo.title,
              description: state.seo.description,
            },
            twitter: {
              title: state.seo.title + state.seo.title,
              description: state.seo.description,
            },
          };
      }
    },
  },
});
