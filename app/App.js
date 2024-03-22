// App.js
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import ListItem from "./components/ListItem";
import ListHeader from "./components/ListHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import api from "./url.js";
import Chart from "./components/Chart.js";

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getCryptoData();
  }, []);

  const getCryptoData = async () => {
    try {
      // Fetch cryptocurrency data
      // const response = await fetch(
      //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=108&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      // );
      // const jsonData = await response.json();
      const jsonData = api;
      setData(jsonData);
      setFilteredData(jsonData); // Set initial filtered data
    } catch (error) {
      console.log(error);
    }
  };

  const bottomSheetRef = useRef(null);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const openModal = (crypto) => {
    setSelectedCrypto([crypto]);
    bottomSheetRef.current?.expand();
  };

  const handleSearch = (query) => {
    const filtered = data.filter(crypto => crypto.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filtered);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ListHeader onSearch={handleSearch} />
        <View style={styles.divider} />
        <ScrollView>
          { filteredData.map((crypto, index) => (
            <ListItem
              key={index}
              name={crypto.name}
              logoUrl={crypto.image}
              symbol={crypto.symbol}
              currentPrice={crypto.current_price}
              onPress={() => openModal(crypto)}
              priceChangePercentage={crypto.price_change_percentage_24h}
            />
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[30, 500]}
      >
        <BottomSheetView style={{padding:30}}>
          <Text>Awesome 🎉</Text>
          {selectedCrypto.length > 0 && (
            <Chart
              currentPrice={selectedCrypto[0].current_price}
              logoUrl={selectedCrypto[0].image}
              name={selectedCrypto[0].name}
              symbol={selectedCrypto[0].symbol}
              priceChangePercentage={
                selectedCrypto[0].price_change_percentage_24h
              }
              // sparkline={selectedCrypto[0].sparkline_in_7d.price}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5c80bc",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "blue",
    marginHorizontal: 16,
    marginTop: 16,
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
