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
    getSEO: (state) => {
      const route = useRoute();
      if (route.path === "/") {
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
      }
      else if (route.path === "/sales-report") {
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
      }
      else if (route.path === "/dashboard") {
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
      }
      return state.seo;
    },
  },
});
