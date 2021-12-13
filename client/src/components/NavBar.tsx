import { Box } from "@chakra-ui/react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <Box
      bg={"#171717"}
      w={"100%"}
      h={"4em"}
      boxShadow={"0px 4px 6px 4px #f0abfc"}
      color={"white"}
      fontWeight={"bold"}
      p = {"2"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"4"}
    >
      {children}
    </Box>
  );
};
