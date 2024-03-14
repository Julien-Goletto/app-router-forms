import { registrationSchema } from "@/app/registrationSchema";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const parsedData = registrationSchema.safeParse(data);

  if (parsedData.success) {
    return NextResponse.json({ message: "User successfully registered!" });
  }
  return NextResponse.json({ error: parsedData.error }, { status: 400 });
}
