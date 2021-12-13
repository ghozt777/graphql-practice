import { Box, Text, Flex } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import graphQLSVG from "../assets/graphql.svg";
import Link from "next/link";
import Image from "next/image";
import { useMeQuery } from "../generated/graphql";
import { HashLoader } from "react-spinners";
const Index = () => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;
  if (fetching) {
    body = <HashLoader color="white" size={40} />;
  } else if (!data?.me) {
    body = (
      <Flex gap={"4"} alignItems={"center"} mr={4}>
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
      </Flex>
    );
  } else {
    body = (
      <Text>
        <small>Signed in as</small> : {data.me.name}
      </Text>
    );
  }
  return (
    <Box h="100%" w="100%">
      <NavBar>
        <Flex gap={"4"} alignItems={"center"}>
          <Text>GraphQL Practice</Text>
          <Image src={graphQLSVG} width="40px" height="40px" />
        </Flex>
        {body}
      </NavBar>
    </Box>
  );
};

export default Index;
