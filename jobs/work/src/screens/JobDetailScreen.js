import React from "react";
import { View, Button } from "react-native";
import { WebView } from "react-native-webview";


export default function JobDetailScreen({  }) {

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ html: job.contents }} style={{ flex: 1 }} />
      
    </View>
  );
}
