import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import graphQLSVG from "../assets/graphql.svg";
import Link from "next/link";
import Image from "next/image";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { HashLoader } from "react-spinners";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
const Index = () => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
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
      <>
        <Text>
          <small>Signed in as</small> : {data.me.name}
        </Text>
        <Button
          variant={"outline"}
          colorScheme={"pink"}
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </>
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

export default withUrqlClient(createUrqlClient)(Index);
