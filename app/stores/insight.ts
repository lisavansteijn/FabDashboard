export const useInsightStore = defineStore("useInsightStore", {
  state: () => ({
    // Data essentially
    readFile: false, // whether the CSV file has been read
    errorMsg: "Error parsing CSV file... Please try again.", // the error message
    hasError: false, // whether there has been an error
    processing: false, // whether the CSV is being processed
    processedCount: 0, // the number of rows processed
    totalCount: 0, // the total number of rows in the CSV
    hasPressedSubmit: false, // whether the submit button has been pressed
  }),
  getters: {
    // computed essentially.
  },
  actions: {
    // methods essentially.
    resetStore() {
      this.readFile = false;
      this.errorMsg = "Error parsing CSV file... Please try again.";
      this.hasError = false;
      this.processing = false;
      this.hasPressedSubmit = false;
    },
    handleErrors(error: any) {
      this.hasError = true;
      this.readFile = false;
      console.error("Error: ", error);
    },
  },
});
