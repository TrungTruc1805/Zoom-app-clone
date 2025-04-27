import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_API_SECRET!;

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "User chưa đăng nhập" }, { status: 401 });
  }

  const token = serverClient.createToken(String(user.id));

  return NextResponse.json({ token });
}