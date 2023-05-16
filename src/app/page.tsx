import { MessageForm } from "@/components/MessageForm";
import { MessagesList } from "@/components/MessageList";
import { Navbar } from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col">
      <Navbar />
      {session ? (
        <>
          <div className="flex-1 overflow-y-scroll p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <MessagesList />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white/5 border-t border-[#363739]">
            <div className="max-w-4xl mx-auto">
              <MessageForm />
            </div>
          </div>
        </>
      ) : (
        <div className="h-full grid place-items-center">
          <p className="text-lg md:text-2xl text-white">
            Sign in to join the chat!
          </p>
        </div>
      )}
    </div>
  );
}
