import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useCallback, useState } from "react";
import {
  PaperProvider,
  Menu,
  Modal,
  Portal,
  Searchbar,
} from "react-native-paper";
import { useDebounce } from "use-debounce";
import Ionicons from "@expo/vector-icons/Ionicons";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const modalStyles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

const repositoryListStyles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const SearchBar = ({ searchQuery, updateSearchQuery }) => {
  const onChangeSearch = (query) => updateSearchQuery(query);

  return (
    <Searchbar
      style={{ borderRadius: 8, backgroundColor: theme.colors.white }}
      elevation={1}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      right={() => (
        <Ionicons
          style={{ paddingEnd: 10 }}
          name="close"
          size={26}
          color="grey"
          onPress={() => updateSearchQuery("")}
        />
      )}
    />
  );
};

const SortComponent = ({
  updateOrderBy,
  updateOrderDirection,
  sort,
  updateSort,
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: "white",
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 4,
  };

  const title = () => {
    switch (sort) {
      case "highest":
        return "Highest rated repositories";
      case "lowest":
        return "Lowest rated repositories";
      default:
        return "Latest repositories";
    }
  };

  const handleSelect = (sort, orderBy, orderDirection) => {
    updateSort(sort);
    updateOrderBy(orderBy);
    updateOrderDirection(orderDirection);
    hideModal();
  };

  return (
    <>
      <Pressable style={modalStyles.container} onPress={showModal}>
        <Text fontSize="subheading">{title()}</Text>
        <Ionicons name="caret-down" size={20} color="grey" />
      </Pressable>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Menu.Item title="Select an item ..." disabled />
          <Menu.Item
            onPress={() => handleSelect("latest", "CREATED_AT", "DESC")}
            title="Latest repositories"
          />
          <Menu.Item
            onPress={() => handleSelect("highest", "RATING_AVERAGE", "DESC")}
            title="Highest rated repositories"
          />
          <Menu.Item
            onPress={() => handleSelect("lowest", "RATING_AVERAGE", "ASC")}
            title="Lowest rated repositories"
          />
        </Modal>
      </Portal>
    </>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [sort, setSort] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword,
    first: 10,
  });

  const updateSearchQuery = (value) => setSearchQuery(value);
  const updateSort = (value) => setSort(value);
  const updateOrderBy = (value) => setOrderBy(value);
  const updateOrderDirection = (value) => setOrderDirection(value);

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  // to prevent re-rendering of same component
  const keyExtractor = useCallback((item) => item.id.toString(), []);
  const renderItem = useCallback(
    ({ item }) => <RepositoryItem item={item} />,
    []
  );
  const onEndReach = useCallback(() => {
    fetchMore();
  }, []);

  return (
    <PaperProvider>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
            <SearchBar
              searchQuery={searchQuery}
              updateSearchQuery={updateSearchQuery}
            />
            <SortComponent
              updateOrderBy={updateOrderBy}
              updateOrderDirection={updateOrderDirection}
              sort={sort}
              updateSort={updateSort}
            />
          </View>
        }
        ListHeaderComponentStyle={repositoryListStyles.container}
        keyExtractor={keyExtractor}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </PaperProvider>
  );
};

export default RepositoryList;
