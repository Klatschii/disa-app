import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.slogan}>
        Mehr Persönlichkeit als Perfektion.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Anmelden</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary}>
        <Text style={styles.buttonText}>Registrieren</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F2FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  logo: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 40,
  },

  slogan: {
    fontSize: 24,
    textAlign: "center",
    color: "#333",
    marginBottom: 60,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#7B4DFF",
    width: "100%",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: "center",
  },

  buttonSecondary: {
    backgroundColor: "#A98BFF",
    width: "100%",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});