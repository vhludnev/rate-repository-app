import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";

import theme from "../theme";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { useAuthStorage } from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    alignItems: "end",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.header,
    height: 80,
    opacity: 0.95,
  },
  tab: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.platformSpecific,
    paddingLeft: 14,
    paddingBottom: 18,
  },
});

const AppBar = () => {
  const { client, data } = useQuery(GET_USER);
  const authStorage = useAuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.tab}>Repositories</Text>
        </Link>
        {!data?.me ? (
          <Link to="/signin">
            <Text style={styles.tab}>Sign in</Text>
          </Link>
        ) : (
          <Pressable onPress={handleSignOut}>
            <Text style={styles.tab}>Sign out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
