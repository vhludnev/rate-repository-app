import { View, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import { CREATE_REVIEW } from "../graphql/mutations";

const initialValues = {
  name: "",
  reponame: "",
  rating: "",
  review: "",
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
    minHeight: 50,
    outlineColor: theme.colors.lightGrey,
    fontFamily: theme.fonts.platformSpecific,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: theme.colors.lightGrey,
    justifyContent: "center",
    padding: 15,
    textAlignVertical: "top",
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
  name: yup.string().required("Repository owner name is required"),
  reponame: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .integer()
    .min(0, "Rating between 0 and 100")
    .max(100, "Rating between 0 and 100")
    .required("Rating is required"),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={signInFormStyles.container}>
      <View style={signInFormStyles.inputView}>
        <FormikTextInput
          style={signInFormStyles.inputText}
          name="name"
          placeholder="Repository owner name"
          placeholderTextColor={theme.colors.lightGrey}
        />
      </View>
      <View style={signInFormStyles.inputView}>
        <FormikTextInput
          style={signInFormStyles.inputText}
          name="reponame"
          placeholder="Repository name"
          placeholderTextColor={theme.colors.lightGrey}
        />
      </View>
      <View style={signInFormStyles.inputView}>
        <FormikTextInput
          style={signInFormStyles.inputText}
          name="rating"
          placeholder="Rating between 0 and 100"
          placeholderTextColor={theme.colors.lightGrey}
        />
      </View>
      <View style={signInFormStyles.inputView}>
        <FormikTextInput
          style={signInFormStyles.inputText}
          name="review"
          placeholder="Review"
          placeholderTextColor={theme.colors.lightGrey}
          multiline
        />
      </View>
      <Pressable style={signInFormStyles.loginBtn} onPress={onSubmit}>
        <Text color="white" fontSize="subheading" fontWeight="bold">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();

  const [createReview] = useMutation(CREATE_REVIEW, {
    onCompleted: ({ createReview: { repositoryId } }) => {
      navigate(`/${repositoryId}`, { replace: true });
    },
  });

  const onSubmit = async (values) => {
    const { name, reponame, rating, review } = values;
    const obj = {
      ownerName: name,
      rating: Number(rating),
      repositoryName: reponame,
      text: review,
    };

    await createReview({ variables: { review: obj } });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
