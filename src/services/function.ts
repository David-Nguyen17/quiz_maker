import he from "he";
import { uniq } from "lodash";

export const randomOrderAnswer = (answer: string[]) => uniq(answer.sort(() => Math.random() - 0.5));
export const convertEntities = (value: string) => {
  if (!value) {
    return "";
  }
  return he.decode(value);
};
