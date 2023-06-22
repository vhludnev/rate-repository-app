import { Image, StyleSheet, View } from "react-native";
import * as Linking from "expo-linking";
import { useNavigate } from "react-router-dom";

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
    paddingHorizontal: 7,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 5,
    alignSelf: "flex-start",
  },
});

const CardHeader = ({
  id,
  ownerAvatarUrl,
  fullName,
  description,
  language,
  button,
}) => {
  const navigate = useNavigate();

  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.avatarContainer}>
        <Image
          style={cardHeaderStyles.avatar}
          source={{ uri: ownerAvatarUrl }}
        />
      </View>
      <View style={cardHeaderStyles.infoContainer}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          onPress={() => !button && navigate(`/${id}`, { replace: true })}
        >
          {fullName}
        </Text>
        <Text color="textSecondary" fontSize="subheading">
          {description}
        </Text>
        <View style={cardHeaderStyles.langAndBtnWrapper}>
          <View style={cardHeaderStyles.languageTag}>
            <Text color="white" fontSize="subheading">
              {language}
            </Text>
          </View>
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

const cardFooterStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
});

const CardFooter = ({ url, button }) => {
  if (!button) return null;

  return (
    <View style={cardFooterStyles.container}>
      <Text
        color="white"
        fontSize="subheading"
        fontWeight="bold"
        onPress={() => Linking.openURL(url)}
      >
        Open in GitHub
      </Text>
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

const RepositoryItem = ({ item, button = false }) => {
  const {
    id,
    ownerAvatarUrl,
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    url,
  } = item;

  return (
    <View style={repositoryItemStyles.container}>
      <CardHeader
        id={id}
        ownerAvatarUrl={ownerAvatarUrl}
        fullName={fullName}
        description={description}
        language={language}
        button={button}
      />
      <CardBody
        stargazersCount={stargazersCount}
        forksCount={forksCount}
        reviewCount={reviewCount}
        ratingAverage={ratingAverage}
      />
      <CardFooter url={url} button={button} />
    </View>
  );
};

export default RepositoryItem;
