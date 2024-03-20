import React from "react";
import {View,Text, TouchableOpacity,Image,StyleSheet} from 'react-native';

const ListItem = ({name,symbol,currentPrice,priceChangePercentage,logoUrl})=>{
    return (
        <TouchableOpacity>
        <View style={styles.itemWrapper}>

            <View style={styles.leftWrapper}>
                    <Image source={{uri:logoUrl}}
                    style={styles.image}
                    />
            <View  style={styles.titlesWrapper}>
            <Text style={styles.title}>
               {name}
            </Text> 
            <Text style={styles.subtitle}>
                {symbol}
            </Text>

            </View>

            </View >


            <View style={styles.rightWrapper}>
                <Text style={styles.title}>
                       {currentPrice} $ 
                </Text>
                <Text style={[styles.subtitle,{color: 'blue'}]}>
                 {priceChangePercentage}
                </Text>

            </View>

            
        </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    itemWrapper:{
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    leftWrapper:{
        flexDirection: "row",
        alignItems:"center",

    },
    image:{
        height: 48,
        width: 48,
    },
    titlesWrapper:{
        marginLeft:12,
    },
    title:{
        fontSize: 18,
    },
    subtitle:{},
    rightWrapper:{},



})

export default ListItem