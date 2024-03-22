// ListHeader.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import searchIcon from '../assets/search.png';

function ListHeader({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Crypto</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search something"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  searchBox: {
    flexDirection: 'row',
    maxWidth: 380,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2f3640',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4d5061',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default ListHeader;
