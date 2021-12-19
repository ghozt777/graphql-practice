import { Box } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { PostsDisplay } from "../components/PostsDisplay";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  return (
    <Box h="100vh" w="100%">
      <NavBar />
      <PostsDisplay />
    </Box>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index); // ssr is enabled
/* ----- Notes ------ :  
  ssr is recommended for SEO
  if ssr is not enabled the JS is not evaluated and it produces HTML page with loader and not the network fetched content
  in next.js the pages after the inital load are not Server Side Rendered even if ssr is enabled and it will do client side rendering
*/
