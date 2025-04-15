import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';
import useFetch from '../hooks/useFetch';

const Products = ({navigation}) => {

   const {loading,data,error}=useFetch('https://fakestoreapi.com/products');


   const handleProductSelect=(id)=>{
    navigation.navigate('DetailPage',{id})

   }
    const renderProduct = ({ item }) =>     
    <ProductCard product={item} onSelect={()=>handleProductSelect(item.id)}/>;

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (error) {
        return <Text>Hata Oluştu: {error}</Text>;
    }

    return (
        <View>
            <FlatList 
                data={data}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default Products;
