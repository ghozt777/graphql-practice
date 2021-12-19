import GraphqlSvg from "../assets/graphql.svg";
import { Box, Button, Text, Flex, Link, Image } from "@chakra-ui/react";
import { HashLoader } from "react-spinners";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  // since next.js dosen't have a cookie : on the inital render the me query is going to return null
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(), // dont make a query if we are on the server
  });
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
    <Box
      bg={"#171717"}
      w={"100%"}
      h={"4em"}
      boxShadow={"0px 4px 6px 4px #f0abfc"}
      color={"white"}
      fontWeight={"bold"}
      p={"2"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"4"}
    >
      <Flex gap={"4"} alignItems={"center"}>
        <Text>GraphQL Practice</Text>
        <Image src={GraphqlSvg} height="40px" width="40px" />
      </Flex>
      {body}
    </Box>
  );
};
