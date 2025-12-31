"use client";

import { ChatMessage } from '../types/chat';

type Props = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: Props) {
  const isUser = message.sender === 'user';
  return (
    <div
      className={
        `flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`
      }
    >
      <div
        className={
          `max-w-[75%] rounded-lg px-3 py-2 text-sm ` +
          (isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-900')
        }
      >
        {message.text}
      </div>
    </div>
  );
}
