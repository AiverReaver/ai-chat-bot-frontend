"use client";

import { useActionState, useEffect, useState } from 'react';
import { ChatMessage, ChatState } from '../types/chat';
import ChatWindow from './ChatWindow';
import { useFormStatus } from 'react-dom';
import { sendMessage } from '@/actions/chat.action';
import instance from '@/utils/axios';


const initialState: ChatState = { messages: [], error: null };

function SubmitButton() {
  // TODO: move this to components
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      disabled={pending}
    >
      {pending ? 'Sending…' : 'Send'}
    </button>
  );
}

export default function ChatUI({ conversationId }: { conversationId?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(sendMessage, initialState);

  useEffect(() => {
    async function fetchMessages() {
      if (!conversationId) return;
      try {
        const { data } = await instance.get<{messages: ChatMessage[]}>(`chat/conversations/${conversationId}`);
        const fetchedMessages = data?.messages || [];
        setMessages(fetchedMessages);
      } catch (error) {
        setError('Failed to load messages. Check your connection and URL');
      }
    }
    fetchMessages();
  },[conversationId])

  return (
    <div className="flex flex-col gap-3 w-full">
      <ChatWindow messages={[ ...messages, ...state.messages]} isTyping={isPending} />
      {(state.error || error) ? (
        <div className="text-sm text-red-600" role="alert">{state.error || error}</div>
      ) : null}
      <form action={formAction} className="flex items-center gap-2">
        {conversationId ? (
          <input type="hidden" name="conversationId" value={conversationId} />
        ) : null}
        <input
          name="message"
          placeholder="Type your message…"
          className="flex-1 border border-gray-300 rounded-md px-3 py-2"
          autoComplete="off"
          required
          disabled={isPending}
        />
        <SubmitButton />
      </form>
    </div>
  );
}
