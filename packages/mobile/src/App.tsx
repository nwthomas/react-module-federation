import { SafeAreaView, StatusBar, Text, View } from "react-native";

import React from "react";

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Text style={{ fontSize: 24 }}>Hello World</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
