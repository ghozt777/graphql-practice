import Wrapper from "../components/Wrapper";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { toErrorMap } from "../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
interface registerProps {}

type loginValues = {
  usernameOrEmail: string;
  password: string;
};

const Login: React.FC<registerProps> = ({}) => {
  const [, register] = useLoginMutation(); // custom hook created by code generator to make sure that the response is not of type any
  const router = useRouter();
  // the code generated by code generator is thene in src/generated
  const handleSubmit = async (values: loginValues, setErrors: any) => {
    const response = await register(values);
    if (response.data.login.errors) {
      setErrors(toErrorMap(response.data.login?.errors));
    } else {
      router.push("/");
    }
  };
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={(values, { setErrors }) => handleSubmit(values, setErrors)}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
              type="text"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              colorScheme="teal"
              size="md"
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
