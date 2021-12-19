import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { InputField } from "../../components/InputField";
import { useChangePasswordMutation } from "../../generated/graphql";
import { FormikErrors } from "formik";
import { Toast, errorToast, successToast } from "../../components/Toast";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const handleSubmit = async (
    values: {
      password: string;
      confirmPassword: string;
    },
    setErrors: (
      errors: FormikErrors<{
        password: string;
        confirmPassword: string;
      }>
    ) => void
  ) => {
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
    const response = await changePassword({
      newPassword: values.confirmPassword,
      token,
    });

    if (response.data.changePassword.errors) {
      response.data.changePassword.errors.map((err) =>
        errorToast(" in " + err.field + " : " + err.message)
      );
    } else {
      successToast(
        "password chnaged successfully for : " +
          response.data.changePassword.user.name +
          " with email : " +
          response.data.changePassword.user.email
      );
      successToast("Redirecting in 3s ...");
      setTimeout(() => router.push("/"), 3000);
    }
  };

  return (
    <Flex
      h={"100vh"}
      w={"100vw"}
      alignItems={"flex-start"}
      justifyContent={"center"}
    >
      <Toast />
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
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

export default withUrqlClient(createUrqlClient)(ChangePassword);
