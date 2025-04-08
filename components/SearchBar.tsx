import React, { useCallback, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Search, X } from 'lucide-react-native';
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      onSearch(text);
    }, 300),
    []
  );

  const handleTextChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
    
    Animated.timing(fadeAnim, {
      toValue: text.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    fadeAnim.setValue(0);
  };

  return (
    <View style={styles.container}>
      <Search size={20} color="#666666" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Search students..."
        value={query}
        onChangeText={handleTextChange}
        accessibilityLabel="Search students input"
      />
      <Animated.View style={[styles.clearButton, { opacity: fadeAnim }]}>
        <TouchableOpacity
          onPress={handleClear}
          accessibilityLabel="Clear search"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={20} color="#666666" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  clearButton: {
    padding: 4,
  },
});