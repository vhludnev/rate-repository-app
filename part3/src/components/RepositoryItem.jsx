import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

const cardHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 4,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
    gap: 5,
    flex: 1,
    flexWrap: "wrap",
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    alignSelf: "flex-start",
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 5,
    alignItems: "center",
  },
});

const CardHeader = ({ ownerAvatarUrl, fullName, description, language }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image
          style={cardHeaderStyles.avatar}
          source={{ uri: ownerAvatarUrl }}
        />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {fullName}
        </Text>
        <Text color="textSecondary" fontSize="subheading">
          {description}
        </Text>
        <View style={cardHeaderStyles.languageTag}>
          <Text color="white" fontSize="subheading">
            {language}
          </Text>
        </View>
      </View>
    </View>
  );
};

const cardBodyStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-around",
    paddingTop: 15,
  },
  ratingContainer: { flexDirection: "column", alignItems: "center", gap: 5 },
});

const CardBody = ({
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
}) => {
  return (
    <View style={cardBodyStyles.container}>
      <View style={cardBodyStyles.ratingContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {kFormatter(stargazersCount)}
        </Text>
        <Text color="textSecondary" fontSize="subheading">
          Stars
        </Text>
      </View>
      <View style={cardBodyStyles.ratingContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {kFormatter(forksCount)}
        </Text>
        <Text color="textSecondary" fontSize="subheading">
          Forks
        </Text>
      </View>
      <View style={cardBodyStyles.ratingContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {reviewCount}
        </Text>
        <Text color="textSecondary" fontSize="subheading">
          Reviews
        </Text>
      </View>
      <View style={cardBodyStyles.ratingContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {ratingAverage}
        </Text>
        <Text color="textSecondary" fontSize="subheading">
          Rating
        </Text>
      </View>
    </View>
  );
};

const repositoryItemStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: theme.colors.white,
  },
});

const RepositoryItem = ({ item }) => {
  const {
    ownerAvatarUrl,
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
  } = item;
  return (
    <View style={repositoryItemStyles.container}>
      <CardHeader
        ownerAvatarUrl={ownerAvatarUrl}
        fullName={fullName}
        description={description}
        language={language}
      />
      <CardBody
        stargazersCount={stargazersCount}
        forksCount={forksCount}
        reviewCount={reviewCount}
        ratingAverage={ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
