import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
const Index = () => {
  return (
    <Box h="100%" w="100%">
      <NavBar />
    </Box>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
