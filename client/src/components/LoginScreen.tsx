import { useState } from 'react';
import {
  Box,
  Button,
  Field,
  Input,
  InputGroup,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';

// custom
import  CyclingLogo, { images }  from '@/components/CyclingLogo';
import  useImageFade from '@/components/LogoEffectHook';
import  ResetPasswordLink from '@/components/ResetPasswordLink';
import  loginHook from '@/components/LoginQueryHook';

// style
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { LuUser } from "react-icons/lu"

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const { currentImageIndex, fade } = useImageFade(images);

  const { mutateAsync: Login, data, error } = loginHook();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email:     Yup.string()
                      .email('Invalid email address')
                      .required('Required'),
      password: Yup.string()
                      .min(8,"Password must be 8 charaters long.")
                      .matches(/[A-Z]/, "Password must have at least 1 upper case character.")
                      .matches(/[a-z]/, "Password must have at least 1 lower case character.")
                      .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, "Password must have at least 1 special character.")
                      .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await Login(values);
        // redirect here
        console.log(JSON.stringify(data));
        setSubmitting(false);
      } catch (error) {
        setFailedAttempts(failedAttempts + 1);
        setSubmitting(false);
        if (failedAttempts >= 3) {
          alert("Too many failed attempts. Please try again later.");
          // TODO Disable the login button or implement a cooldown
        }
      }
    },
  });

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    width="100vw"
    bg="blue.50"
    position="relative" // Required for absolute positioning of the top bar
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          background: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
        >
        <VStack gap={4}>
          <HStack
          alignItems="center"
          bg="white"
          width='full'
          gap={7}
          ml={3}
          >
            <CyclingLogo currentImageIndex={currentImageIndex} fade={fade} images={images}/>
            <Text w="full" justifySelf={"end"} textAlign={"left"} fontSize="2xl" fontWeight="bold">
              Trigger Master 2
            </Text>
          </HStack>
          <Field.Root id="email" invalid={formik.touched.email !== undefined && formik.touched.email !== false && formik.errors.email !== undefined}>
            <Field.Label>Adaptive Login</Field.Label>
            <InputGroup startElement={<LuUser />}>
            <Input
              placeholder="you@clientdomain.com"
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              />
            </InputGroup>
            {formik.touched.email && formik.errors.email ? (
              <Box color="red.500" fontSize="sm">
                {formik.errors.email}
              </Box>
            ) : null}
          </Field.Root>

          <Field.Root id="password" invalid={formik.touched.password !== undefined && formik.touched.password !== false && formik.errors.password !== undefined}>
            <Field.Label>Password</Field.Label>
            <HStack width="full">
              <Input 
                placeholder="•••••••••••••••"
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
              <Button
                  _hover={{
                    border: "1px solid gray", // Gray outline on hover
                  }}
                  w="10%"
                  variant="surface"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </HStack>
            {formik.touched.password && formik.errors.password ? (
              <Box color="red.500" fontSize="sm">
                {formik.errors.password}
              </Box>
            ) : null}
          </Field.Root>
          <Text w="full" justifySelf={"left"} textAlign={"left"} fontSize="sm" color="red">
              {error == null ? "": error.message}
          </Text>
          <ResetPasswordLink />
          <Button
            _hover={{
              border: "1px solid gray", // Gray outline on hover
            }}
            color="teal"
            bg="cyan.50"
            colorPalette="cyan"
            variant="surface"
            type="submit"
            width="100%"
            loading={formik.isSubmitting}
            >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginScreen;