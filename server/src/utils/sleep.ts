/**
 * Function to create an artifical delay to test loaders on the frontend
 */
export const sleep = (ms: number) =>
  new Promise((res, _) => setTimeout(res, ms));
