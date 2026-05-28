import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";

export default function WelcomeScreen() {
  useEffect(() => {
  const checkProfile = async () => {
    const storedProfile = await AsyncStorage.getItem("userProfile");

    if (storedProfile) {
      router.replace("/discover");
    }
  };

  checkProfile();
}, []);
  return (
    <View style={styles.container}>
      
<View style={styles.logoContainer}>
  <Image
    source={require("../assets/logo-1.png")}
    style={styles.logo}
    resizeMode="contain"
  />
</View>

      <Text style={styles.headline}>
        Mehr Persönlichkeit{"\n"}als Perfektion.
      </Text>

      <Text style={styles.subline}>
        Eine Dating-App für echte Menschen.
        {"\n"}
        Ehrlich. Offen. Ohne Verstecken.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.primaryButtonText}>
          Anmelden
        </Text>
      </TouchableOpacity>

<TouchableOpacity
  style={styles.secondaryButton}
  onPress={() => router.push("/register")}
>
  <Text style={styles.secondaryButtonText}>
    Registrieren
  </Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },

logoContainer: {
  width: 300,
  height: 300,
  borderRadius: 150,
  overflow: "hidden",
  alignSelf: "center",
  marginBottom: 28,
},

logo: {
  width: "100%",
  height: "100%",
},

  headline: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#2B2238",
    lineHeight: 42,
    marginBottom: 18,
  },

  subline: {
    fontSize: 17,
    textAlign: "center",
    color: "#6E6480",
    lineHeight: 26,
    marginBottom: 60,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: "#8B5CF6",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  secondaryButton: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#C4B5FD",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  secondaryButtonText: {
    color: "#7C3AED",
    fontSize: 18,
    fontWeight: "700",
  },
});