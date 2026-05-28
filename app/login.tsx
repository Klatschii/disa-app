import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function LoginScreen() {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Zurück</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Willkommen zurück</Text>

      <Text style={styles.subtitle}>
        Schön, dass du wieder da bist.
      </Text>

      <TextInput
        placeholder="E-Mail"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />

      <TextInput
        placeholder="Passwort"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        style={styles.input}
      />

<TouchableOpacity
  style={styles.loginButton}
 onPress={async () => {
  const storedProfile =
    await AsyncStorage.getItem("userProfile");

  if (storedProfile) {
    router.replace("/discover");
  } else {
    router.push("/register");
  }
}}
>
  <Text style={styles.loginButtonText}>
    Anmelden
  </Text>
</TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>
          Passwort vergessen?
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
    paddingHorizontal: 28,
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: 70,
    left: 28,
  },

  backText: {
    fontSize: 16,
    color: "#7C3AED",
    fontWeight: "600",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 17,
    color: "#6E6480",
    marginBottom: 40,
    lineHeight: 25,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E9DFFF",
  },

  loginButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  forgotPassword: {
    textAlign: "center",
    color: "#7C3AED",
    fontSize: 15,
    fontWeight: "600",
  },
});