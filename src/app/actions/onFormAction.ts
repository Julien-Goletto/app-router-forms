"use server";
import { registrationSchema } from "../registrationSchema";
import type { Registration } from "../registrationSchema";

export const onFormAction = async (
  prevState: {
    message: string;
    user?: Registration;
    issues?: string[];
  },
  formData: FormData
) => {
  const data = Object.fromEntries(formData);
  const parsed = await registrationSchema.safeParseAsync(data);

  if (parsed.success)
    return { message: "User successfully registered!", user: parsed.data };
  return {
    message: "Invalid data",
    issues: parsed.error.issues
      ? parsed.error.issues.map((issue) => issue.message)
      : undefined,
  };
};
