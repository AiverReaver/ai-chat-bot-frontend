"use server";

import instance from '@/utils/axios';
import { ChatMessage, ChatState } from '../types/chat';

export async function sendMessage(prevState: ChatState, formData: FormData): Promise<ChatState> {
  try {
    const raw = formData.get('message');
    const content = typeof raw === 'string' ? raw.trim() : String(raw || '').trim();
    if (!content) {
      return { ...prevState, error: 'Please enter a message.' };
    }

    const convIdRaw = formData.get('conversationId');
    const conversationId = typeof convIdRaw === 'string' ? convIdRaw : undefined;

    const {data} = await instance.post('chat/message', {
      message: content,
      conversationId,
    });

    const aiMsg: ChatMessage = {
      id: data.id,
      sender: 'bot',
      text: data.reply,
    };
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: content,
    };

    return { messages: [...prevState.messages, userMsg, aiMsg], error: null };
  } catch (err: unknown) {
    return { ...prevState, error: 'Failed to send message' };
  }
}
