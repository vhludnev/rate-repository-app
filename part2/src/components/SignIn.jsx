import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const initialValues = {
  username: "",
  password: "",
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
    .min(5, "Username must be no less than 5 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be no less than 8 characters")
    .required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
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
      <Pressable style={signInFormStyles.loginBtn} onPress={onSubmit}>
        <Text color="white" fontSize="subheading" fontWeight="bold">
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;

    if (username && password) {
      console.log(`values are: ${username}, ${password}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
