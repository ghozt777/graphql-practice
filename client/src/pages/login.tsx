import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";

interface registerProps {}

const LOGIN_MUT = `
mutation Login($email :String! , $password :String!){
  login(email : $email , password : $password){
    name ,
    id
  }
}
`;

const Login: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(LOGIN_MUT);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => register(values)}
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
