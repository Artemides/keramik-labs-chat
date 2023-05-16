"use client";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

const AddNewMessageMutation = gql`
  mutation AddNewMessage($username: String!, $avatar: URL, $body: String!) {
    messageCreate(
      input: { username: $username, avatar: $avatar, body: $body }
    ) {
      message {
        id
      }
    }
  }
`;
export const MessageForm = () => {
  const [AddNewMessage] = useMutation(AddNewMessageMutation);
  const [body, setBody] = useState<string>("");
  const { data: session } = useSession();
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!body) return;
    AddNewMessage({
      variables: {
        username: session?.user?.name,
        avatar: session?.user?.image,
        body,
      },
    });
    setBody("");
  };
  return (
    <form
      action=""
      onSubmit={handleFormSubmit}
      className="flex items-center space-x-3"
    >
      <input
        autoFocus
        id="message"
        name="message"
        placeholder="write a message..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="flex-1 h-12 px-3  rounded bg-[#222226] border border-[#222226] focus:border-[#222226] focus:outline-none text-white placeholder-white "
      />
      <button
        type="submit"
        className="bg-[#222226] rounded h-12 font-medium text-white w-24 text-lg border border-transparent"
        disabled={!body || !session}
      >
        Send
      </button>
    </form>
  );
};
