import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { InputField } from "../../components/InputField";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  console.log(token);
  return (
    <Flex
      h={"100vh"}
      w={"100vw"}
      alignItems={"flex-start"}
      justifyContent={"center"}
    >
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values, { setErrors }) => {
          if (values.password.length < 8) {
            setErrors({
              password: "password length must be greater than 8 characters !",
            });
            return;
          }
          if (values.password !== values.confirmPassword) {
            setErrors({
              confirmPassword: "the passwords don't match !",
            });
            return;
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <Box mt={"8"}>
              <InputField
                width={"20vw"}
                name="password"
                label="password"
                placeholder="enter a new password"
                type={"password"}
              />
            </Box>
            <Box mt={4}>
              <InputField
                width={"20vw"}
                name="confirmPassword"
                label="confirm password"
                placeholder="confirm password"
                type={"password"}
              />
            </Box>
            <Button
              mt={4}
              colorScheme="teal"
              size="md"
              type="submit"
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  // this is get the token from the query and then pass it as props to the component
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
