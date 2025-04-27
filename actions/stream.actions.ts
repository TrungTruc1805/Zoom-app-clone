'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamChat } from 'stream-chat';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error('Người dùng chưa được xác thực');
  if (!STREAM_API_KEY) throw new Error('API Key không thể truy cập');
  if (!STREAM_API_SECRET) throw new Error('API Secret không thể truy cập');

  const streamClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

  const token = streamClient.createToken(String(user.id));

  return token;
};