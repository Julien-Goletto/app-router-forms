import { type NextRequest, NextResponse } from "next/server";
import { registrationSchema } from "../../app/registrationSchema";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = registrationSchema.safeParse(data);
  if (parsedData.success)
    return NextResponse.json({ message: "User successfully registered!" });
  return NextResponse.json({ error: parsedData.error }, { status: 400 });
}
