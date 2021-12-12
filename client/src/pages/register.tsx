import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";

interface registerProps {}

const REGISTER_MUT = `
mutation Register($email :String! , $password :String!){
  login(email : $email , password : $password){
    name ,
    id
  }
}
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => register(values)}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="email"  type="email" />
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

export default Register;
