import { createConversation } from "@/actions/conversation.action";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Start a New Chat</h1>
        <form action={createConversation} className="flex items-center gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">New Chat</button>
        </form>
      </main>
    </div>
  );
}
