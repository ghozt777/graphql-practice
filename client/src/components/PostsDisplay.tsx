import { Flex, Badge, Text } from "@chakra-ui/react";
import React from "react";
import { HashLoader } from "react-spinners";
import { PostsQuery, usePostsQuery } from "../generated/graphql";

interface PostsProps {
  data: PostsQuery;
}

interface PostProps {
  title: string;
  author: {
    name: string;
    email: string;
  };
  content: string;
}

const Post: React.FC<PostProps> = ({ title, author, content }) => (
  <Flex
    h="10rem"
    w="20rem"
    borderStyle={"solid"}
    borderColor={"black"}
    borderWidth={"2px"}
    borderRadius={"10px"}
    p="20px"
    flexDir={"column"}
    alignItems={"center"}
    justifyContent={"space-evenly"}
  >
    <Text fontWeight={"bold"} size="lg">
      {title}
    </Text>
    <Text fontWeight="bold">
      {author.name}
      <Badge fontWeight={"bold"} ml="1" colorScheme="purple">
        {author.email}
      </Badge>
    </Text>
    <Text size="sm">{content}</Text>
  </Flex>
);

const Posts: React.FC<PostsProps> = (data) => {
  const posts = data.data.posts;

  return (
    <Flex
      mt={"5rem"}
      minHeight={"100%"}
      mb={"0"}
      width={"100%"}
      alignItems={"center"}
      overflowY={"scroll"}
      flexDirection={"column"}
      gap={"2rem"}
    >
      {posts.map(({ title, content, author }) => {
        return <Post title={title} content={content} author={author} />;
      })}
    </Flex>
  );
};

interface PostsDisplayProps {}

export const PostsDisplay: React.FC<PostsDisplayProps> = ({}) => {
  const [{ data, fetching }] = usePostsQuery();
  return (
    <Flex
      flexDirection={"column"}
      height={"70%"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      {fetching ? (
        <HashLoader color="black" size={"100"} />
      ) : (
        <Posts data={data} />
      )}
    </Flex>
  );
};
