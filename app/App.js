import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity,Image } from 'react-native';
import ListItem from './components/ListItem';
import searchIcon from './assets/search.png';

export default function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  useEffect(() => {
    getCryptoData();
  }, []); 

  const getCryptoData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=108&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.largeTitle}>Crypto</Text>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search something"
            placeholderTextColor="#ffffff"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Image source={searchIcon} style={styles.searchIcon}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView>
        {data.map((crypto, index) => (
          <ListItem
            key={index}
            name={crypto.name}
            logoUrl={crypto.image}
            symbol={crypto.symbol}
            currentPrice={crypto.current_price}
            priceChangePercentage={crypto.price_change_percentage_24h}
          />
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    maxWidth: 350,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2f3640',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e5f2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    paddingVertical: 10,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'blue', 
    marginHorizontal: 16,
    marginTop: 16,
  },
  searchIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain', 
   },
});
