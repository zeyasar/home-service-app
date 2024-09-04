import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();



export default function Login() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("./../../../assets/images/login.png")}
        style={styles.loginImage}
      />
      <View style={styles.container}>
        <Text style={{ fontSize: 27, color: "white", textAlign: "center" }}>
          Let's Find{" "}
          <Text style={{ fontWeight: "bold" }}>
            Professional Cleaning and Repair Service
          </Text>
        </Text>
        <Text style={{fontSize:16, color:'white', marginTop:20, textAlign:'center'}}>
        Best app to find best services near you wich deliver you a
        professional service
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{fontSize:16, color:'#8E3FFF', textAlign:'center'}}>Let's Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 1,
    borderColor: "#D4D6D8",
    borderRadius: 15,
  },
  container: {
    width: "100%",
    backgroundColor: "#8E3FFF",
    height: "70%",
    marginTop: -20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 40,
    paddingHorizontal:30
  },
  button:{
    backgroundColor:'white',
    marginTop:40,
    padding:15,
    borderRadius:30,
  }
});
