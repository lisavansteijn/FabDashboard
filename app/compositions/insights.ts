import type { CvSchema } from "~~/lib/uploads/cv-schema";

export function useInsights() {
  const readFile = ref(false);
  const errorMsg = ref("Error parsing CSV file... Please try again.");
  const hasError = ref(false);
  const processing = ref(false);
  const processedCount = ref(0);
  const totalCount = ref(0);
  const hasPressedSubmit = ref(false);
  const cvState = reactive<Partial<CvSchema>>({
    csvFile: undefined,
  });

  function resetStore() {
    readFile.value = false;
    errorMsg.value = "Error parsing CSV file... Please try again.";
    hasError.value = false;
    processing.value = false;
    hasPressedSubmit.value = false;
  }
  function handleErrors(error: any) {
    hasError.value = true;
    readFile.value = false;
    console.error("Error: ", error);
  }
  return {
    readFile,
    errorMsg,
    hasError,
    processing,
    processedCount,
    totalCount,
    hasPressedSubmit,
    cvState,
    resetStore,
    handleErrors,
  };
}

// export const UseInsights = defineComponent({
//   data: () => {
//     return {
//       readFile: false, // whether the CSV file has been read
//       errorMsg: "Error parsing CSV file... Please try again.", // the error message
//       hasError: false, // whether there has been an error
//       processing: false, // whether the CSV is being processed
//       processedCount: 0, // the number of rows processed
//       totalCount: 0, // the total number of rows in the CSV
//       hasPressedSubmit: false, // whether the submit button has been pressed
//       cvState: shallowRef<Partial<CvSchema>>({
//         csvFile: undefined,
//       }),
//       serverResponded: false, // whether the server has responded
//       serverResponse: null, // the server response
//     };
//   },
//   computed: {

//   },
//   methods: {
//     resetStore() {
//       this.readFile = false;
//       this.errorMsg = "Error parsing CSV file... Please try again.";
//       this.hasError = false;
//       this.processing = false;
//       this.hasPressedSubmit = false;
//     },
//     handleErrors(error: any) {
//       this.hasError = true;
//       this.readFile = false;
//       console.error("Error: ", error);
//     },
//     handleServerResponse() {

//     },
//   },
// });
