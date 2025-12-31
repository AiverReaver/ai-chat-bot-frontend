"use server";

import instance from '@/utils/axios';
import { redirect } from 'next/navigation';

export async function createConversation(_prevState?: unknown, _formData?: FormData): Promise<void> {
  const { data } = await instance.post('chat/create-conversation');
  const id: string = data?.id
  if (!id) {
    throw new Error('Failed to create conversation');
  }
  redirect(`/chat/${id}`);
}
