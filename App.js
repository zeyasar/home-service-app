import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Login from "./App/Screens/LoginScreen/Login";
import { ClerkProvider, SignedIn, SignedOut  } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from "./App/Navigations/TabNavigation";
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    "Outfit": require("./assets/fonts/Outfit-Regular.ttf"),
    "Outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "Outfit-medium": require("./assets/fonts/Outfit-Medium.ttf")
  });

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey='pk_test_YWxpdmUtY2ljYWRhLTIyLmNsZXJrLmFjY291bnRzLmRldiQ'
    >
      <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20 }}>
        
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <Login />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

// export default{
//   BLACK:"#000000",
//   PRIMARY:"#8E3FFF",
//   WHITE:"#ffffff",
//   lightgrey:'#ededed'
//   primarylight: #ecdcf7 
//   gray : #858585
// }
