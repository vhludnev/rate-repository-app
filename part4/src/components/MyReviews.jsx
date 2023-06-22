import { FlatList, StyleSheet, View, Alert } from "react-native";
import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import * as Linking from "expo-linking";

import { GET_USER } from "../graphql/queries";
import { ReviewItem } from "./RepositoryInfo";
import { ItemSeparator } from "./RepositoryList";
import Text from "./Text";
import theme from "../theme";
import { DELETE_REVIEW } from "../graphql/mutations";

const cardFooterStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 20,
  },
  button: {
    flexGrow: 1,
    textAlign: "center",
    borderRadius: 4,
    paddingVertical: 20,
  },
  buttonView: {
    backgroundColor: theme.colors.primary,
  },
  buttonDel: {
    backgroundColor: theme.colors.red,
  },
});

const CardFooter = ({ url, id, refetch }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDeleteReview = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review ?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await deleteReview({
              variables: { id },
            });
            refetch();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={cardFooterStyles.container}>
      <Text
        style={[cardFooterStyles.button, cardFooterStyles.buttonView]}
        color="white"
        fontSize="subheading"
        fontWeight="bold"
        onPress={() => Linking.openURL(url)}
      >
        View repository
      </Text>
      <Text
        style={[cardFooterStyles.button, cardFooterStyles.buttonDel]}
        color="white"
        fontSize="subheading"
        fontWeight="bold"
        onPress={handleDeleteReview}
      >
        Delete review
      </Text>
    </View>
  );
};

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_USER, {
    variables: { includeReviews: true },
  });

  // Get the nodes from the edges array
  const repositoryNodes = data
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const keyExtractor = useCallback((item) => item.id.toString(), []);
  const renderItem = useCallback(
    ({ item }) => (
      <ReviewItem review={item}>
        <CardFooter refetch={refetch} url={item.repository.url} id={item.id} />
      </ReviewItem>
    ),
    []
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default MyReviews;
