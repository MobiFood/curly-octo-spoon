import * as actions from "./actions";

export const greet = (data) => ({
  type: actions.GREET,
  data: data,
});
