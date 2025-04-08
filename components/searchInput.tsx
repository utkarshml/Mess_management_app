import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet } from "react-native";

interface SearchComponentProps<T> {
  data: T[];
  searchKey: keyof T;
  
}

const SearchComponent = <T,>({ data, searchKey }: SearchComponentProps<T>) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim() === "") {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(text.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default SearchComponent;
