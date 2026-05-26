import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";

export default function RegisterScreen() {
    const [special, setSpecial] = useState("");
    const [consent, setConsent] = useState(false);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Zurück</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Erstelle dein Profil</Text>

      <Text style={styles.subtitle}>
        Der erste Schritt zu ehrlichem Kennenlernen.
      </Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />

      <TextInput
        placeholder="Alter"
        placeholderTextColor="#9CA3AF"
        keyboardType="number-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="E-Mail"
        placeholderTextColor="#9CA3AF"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Passwort"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        style={styles.input}
      />

<TextInput
  placeholder="Körperliche oder persönliche Besonderheit"
  placeholderTextColor="#9CA3AF"
  style={styles.input}
  value={special}
  onChangeText={setSpecial}
/>
<View style={styles.consentContainer}>

  <Pressable
    style={styles.checkbox}
    onPress={() => setConsent(!consent)}
  >
    {consent && <View style={styles.checkboxInner} />}
  </Pressable>

  <Text style={styles.consentText}>
    Diese Angabe ist freiwillig. Du entscheidest selbst,
    was du über dich teilen möchtest.
  </Text>

</View>

<TouchableOpacity
  style={styles.registerButton}
  onPress={() =>
    router.push({
      pathname: "/profile-setup",
      params: {
        special,
      },
    })
  }
>
        <Text style={styles.registerButtonText}>Weiter</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    marginBottom: 36,
    lineHeight: 25,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9DFFF",
  },

  registerButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 12,
  },

  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  consentContainer: {
  flexDirection: "row",
  alignItems: "flex-start",
  marginBottom: 24,
},

checkbox: {
  width: 24,
  height: 24,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: "#8B5CF6",
  marginRight: 14,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 2,
},

checkboxInner: {
  width: 12,
  height: 12,
  borderRadius: 4,
  backgroundColor: "#8B5CF6",
},

consentText: {
  flex: 1,
  fontSize: 14,
  lineHeight: 22,
  color: "#6E6480",
},
});