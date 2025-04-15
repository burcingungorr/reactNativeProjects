import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function JobItem({ job, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} 
    style={{ padding: 15, borderBottomWidth: 1 }}>

      <Text>name</Text>
      
    </TouchableOpacity>
  );
}
