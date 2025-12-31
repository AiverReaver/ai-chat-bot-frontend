import ChatUI from '@/components/ChatUI';

export default async function ChatPage({ params }: { params: Promise<{ conversationId: string }> }) {
  const { conversationId } = await params;
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-16 px-6 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-4">Chat Bot</h1>
        <ChatUI conversationId={conversationId} />
      </main>
    </div>
  );
}
