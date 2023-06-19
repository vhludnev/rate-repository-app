import { View, StyleSheet, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";

import theme from "../theme";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.tab}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.tab}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
