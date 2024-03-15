"use server";
import { registrationSchema } from "./registrationSchema";
import type { Registration } from "./registrationSchema";

export const onDataAction = async (data: Registration) => {
  const parsed = registrationSchema.safeParse(data);

  if (parsed.success)
    return { message: "User successfully registered!", user: parsed.data };
  return {
    message: "Invalid data",
    issues: parsed.error.issues.map((issue) => issue.message),
  };
};
