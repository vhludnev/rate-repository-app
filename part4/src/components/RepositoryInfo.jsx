import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { format } from "date-fns";

import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";
import useRepository from "../hooks/useRepository";

const betweenCardsStyles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const listHeaderComponentStyle = StyleSheet.create({
  separator: {
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={betweenCardsStyles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} button />;
};

const reviewCardStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    backgroundColor: theme.colors.white,
  },
  container: {
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: theme.colors.white,
  },
  numberWrapper: {
    padding: 15,
  },
  number: {
    display: "grid",
    placeContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  infoContainer: {
    paddingVertical: 15,
    paddingEnd: 15,
    flexGrow: 1,
    gap: 5,
    flex: 1,
    flexWrap: "wrap",
  },
  text: {
    paddingTop: 5,
  },
});

export const ReviewItem = ({ review, children }) => {
  const { rating, createdAt, text, user } = review;
  return (
    <View style={reviewCardStyles.mainContainer}>
      <View style={reviewCardStyles.container}>
        <View style={reviewCardStyles.numberWrapper}>
          <Text
            style={reviewCardStyles.number}
            fontWeight="bold"
            fontSize="subheading"
            color="primary"
          >
            {rating}
          </Text>
        </View>
        <View style={reviewCardStyles.infoContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {user.username}
          </Text>
          <Text color="textSecondary">
            {format(new Date(createdAt), "dd.MM.yyyy")}
          </Text>
          <Text style={reviewCardStyles.text}>{text}</Text>
        </View>
      </View>
      {children}
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, fetchMore } = useRepository({
    id,
    first: 10,
  });

  const keyExtractor = useCallback(({ node }) => node.id.toString(), []);
  const renderItem = useCallback(
    ({ item }) => <ReviewItem review={item.node} />,
    []
  );
  const onEndReach = useCallback(() => {
    fetchMore();
  }, []);

  if (loading) return null;

  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ListHeaderComponentStyle={listHeaderComponentStyle.separator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
