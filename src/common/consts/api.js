import { isDebug } from "../utils";

export const PREFIX = isDebug(process.env)
  ? `http://localhost:4000/api`
  : `/api`;
