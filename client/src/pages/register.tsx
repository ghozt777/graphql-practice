import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

type valueType = {
  email: string;
  password: string;
  name: string;
};

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();

  const router = useRouter();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={async (values) => register({ data: { ...values } })}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="email"
              label="email"
              type="email"
            />
            <Box mt={4}>
              <InputField name="name" placeholder="name" label="name" />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <ButtonGroup spacing={"0.5rem"}>
              <Button
                mt={4}
                colorScheme="teal"
                size="md"
                type="submit"
                isLoading={isSubmitting}
              >
                Register
              </Button>
              <Button
                onClick={() => router.push("/login")}
                variant={"link"}
                ml={4}
                mt={4}
                colorScheme="teal"
                size="md"
              >
                Login
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
