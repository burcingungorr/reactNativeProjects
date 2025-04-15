import React from 'react'
import {View,Text, StyleSheet ,Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'

const ProductCard = ({product,onSelect}) => {


  return (
    <TouchableWithoutFeedback onPress={onSelect}> 
    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: product.image }} />
     <View style={styles.body_container}>
        <Text  style={styles.title} >{product.title}</Text>
        <Text style={styles.price}>{product.price}$</Text>
     </View>
   
    </View>
</TouchableWithoutFeedback>
 
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        margin:10,



    },
    image: {
        width: 100,
        minHeight: 100,
        resizeMode:'contain',
        backgroundColor:'white'
    },
    body_container: {
        flex: 1,
        padding:15,
        backgroundColor:'#ccc'


    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    price: {
        color: 'green',
        fontSize: 14,
        textAlign:'right'
    }
});

export default ProductCard