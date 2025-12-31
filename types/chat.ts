export type ChatRole = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  sender: ChatRole;
  text: string;
}

export interface ChatState {
  messages: ChatMessage[];
  error?: string | null;
}
