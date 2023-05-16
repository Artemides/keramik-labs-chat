import { gql, useQuery } from "@apollo/client";
import { Message } from "./Message";
import type { Message as IMessage } from "./Message";
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
export const MessagesList = () => {
  const { loading, error, data } = useQuery<{
    messageCollection: { edges: { node: IMessage }[] };
  }>(gerRecentMessageQuery, { variables: { last: 100 } });
  return (
    <div className="w-full flex flex-col space-y-3 overflow-y-scroll">
      {data?.messageCollection?.edges?.map(({ node }) => (
        <Message key={node.id} message={node} />
      ))}
    </div>
  );
};
