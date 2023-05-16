"use client";

import { gql, useQuery } from "@apollo/client";
import { Message } from "./Message";
import type { Message as IMessage } from "./Message";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
const gerRecentMessageQuery = gql`
  query GetRecentMessages($last: Int) {
    messageCollection(last: $last) {
      edges {
        node {
          id
          username
          avatar
          body
          likes
          createdAt
        }
      }
    }
  }
`;

type MessageCollection = {
  messageCollection: { edges: { node: IMessage }[] };
};
export const MessagesList = () => {
  const { loading, error, data } = useQuery<MessageCollection>(
    gerRecentMessageQuery,
    {
      variables: { last: 100 },
    }
  );

  const [ref, inView, entry] = useInView({ trackVisibility: true, delay: 500 });

  useEffect(() => {
    if (!inView) return;
    if (!entry || !entry.target) return;

    entry.target.scrollIntoView({ behavior: "smooth" });
  }, [data, inView, entry]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-white">Fetching most recent chat messages.</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-white">Something went wrong. Refresh to try again.</p>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-3 overflow-y-scroll">
      {!inView && (
        <div className="absolute bottom-0 w-full flex justify-center  py-1.5 px-3 mb-[120px] inset-x-0 z-10 text-xs">
          <button
            className="py-1.5 px-3 text-xs bg-[#1c1c1f] border border-[#363739] rounded-full text-white font-medium"
            onClick={() =>
              entry?.target?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Scroll to see the latest messages
          </button>
        </div>
      )}
      {data?.messageCollection?.edges?.map(({ node }) => (
        <Message key={node.id} message={node} />
      ))}
      <div ref={ref} />
    </div>
  );
};
