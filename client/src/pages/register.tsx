import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useMutation } from "urql";
import { InputField } from "../components/InputField";
import Wrapper from "../components/Wrapper";
import Link from "next/link";

interface registerProps {}

const REGISTER_MUT = `
mutation Register($data : RegisterInput!){
    register(data : $data){
      name ,
      email ,
      id ,
    }
  }
`;

type valueType = {
  email: string;
  password: string;
  name: string;
};

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);

  const handleSubmit = async (values: valueType): Promise<any> => {};

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={(values) => register({ data: { ...values } })}
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
            <Button
              mt={4}
              colorScheme="teal"
              size="md"
              type="submit"
              isLoading={isSubmitting}
            >
              Register
            </Button>
            <Link href={"/login"}>
              <Button ml={4} mt={4} colorScheme="teal" size="md">
                Login
              </Button>
            </Link>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
