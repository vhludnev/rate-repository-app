import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const signInFormStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 15,
    gap: 15,
  },
  inputView: {
    width: "90%",
  },
  inputText: {
    height: 50,
    outlineColor: theme.colors.lightGrey,
    fontFamily: theme.fonts.platformSpecific,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: theme.colors.lightGrey,
    justifyContent: "center",
    padding: 15,
  },
  loginBtn: {
    width: "90%",
    fontFamily: theme.fonts.platformSpecific,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be between 5 and 30 characters")
    .max(30, "Username must be between 5 and 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be between 5 and 50 characters")
    .max(50, "Password must be between 5 and 50 characters")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={signInFormStyles.container}>
      <View style={signInFormStyles.inputView}>
        <FormikTextInput
          style={signInFormStyles.inputText}
          name="username"
          placeholder="Username"
          placeholderTextColor={theme.colors.lightGrey}
        />
      </View>
      <View style={signInFormStyles.inputView}>
        <FormikTextInput
          style={signInFormStyles.inputText}
          secureTextEntry
          name="password"
          placeholder="Password"
          placeholderTextColor={theme.colors.lightGrey}
        />
      </View>
      <View style={signInFormStyles.inputView}>
        <FormikTextInput
          style={signInFormStyles.inputText}
          secureTextEntry
          name="passwordConfirm"
          placeholder="Password confirmation"
          placeholderTextColor={theme.colors.lightGrey}
        />
      </View>
      <Pressable style={signInFormStyles.loginBtn} onPress={onSubmit}>
        <Text color="white" fontSize="subheading" fontWeight="bold">
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await signUp({ variables: { user: { username, password } } });
    await signIn({ username, password });
    navigate("/");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
