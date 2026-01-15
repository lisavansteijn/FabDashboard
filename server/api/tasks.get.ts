export default defineEventHandler(async () => {
  // await new Promise(resolve => setTimeout(resolve, 2000));
  // return sendError(event, createError({
  // statusCode: 500,
  // statusMessage: "Simulated server error" },
  // ));
  return [
    {
      id: 1,
      title: "Learn Nuxt",
      completed: false,
    },
    {
      id: 2,
      title: "Build a Trello Board",
      completed: false,
    },
  ];
});
