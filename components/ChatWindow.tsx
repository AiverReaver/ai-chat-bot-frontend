"use client";

import { useEffect, useRef } from 'react';
import { ChatMessage } from '../types/chat';
import MessageBubble from './MessageBubble';

type Props = {
  messages: ChatMessage[];
  isTyping?: boolean;
};

export default function ChatWindow({ messages, isTyping }: Props) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, isTyping]);

  return (
    <div
      ref={listRef}
      className="w-full h-[60vh] overflow-y-auto border border-gray-200 rounded-md p-3 bg-white"
    >
      {messages.map(m => (
        <MessageBubble key={m.id} message={m} />
      ))}
      {isTyping ? (
        <div className="text-xs text-gray-500 mt-2">Agent is typing…</div>
      ) : null}
    </div>
  );
}
