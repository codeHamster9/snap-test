import { isDebug } from "../utils";

export const PREFIX = isDebug ? `http://localhost:4000/api` : `/api`;
