import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import ProfileAnswer from "../components/ProfileAnswer";
import BottomNav from "./bottom-nav";
import profiles from "./data/profiles";

export default function DiscoverScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const profile = profiles[currentIndex];
  const nextProfile = () => {
  setCurrentIndex((currentIndex + 1) % profiles.length);
};
  useLocalSearchParams();
  
 return (
  <View style={{ flex: 1 }}>

<ScrollView
  style={styles.container}
  contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}
>
    <Text style={styles.title}>
  Menschen sind mehr als ihr erster Eindruck.
</Text>

<Text style={styles.subtitle}>
  Nimm dir Zeit, jemanden wirklich kennenzulernen.
</Text>

      <View style={styles.card}>
        <Text style={styles.name}>
  {profile.name}, {profile.age}
</Text>

<Text style={styles.special}>
  Besonderheit: {String(profile.special || "Noch keine Antwort.")}
</Text>

<ProfileAnswer
  question="Was sollte man über mich wissen?"
  answer={String(profile.about)}
/>

<ProfileAnswer
  question="Auf was bin ich am meisten stolz?"
  answer={String(profile.proud)}
/>

<ProfileAnswer
  question="Was wünsche ich mir in einer Beziehung?"
  answer={String(profile.relationship)}
/>

<ProfileAnswer
  question="Was bringt dich zum Lachen?"
  answer={String(profile.laugh)}
/>

<ProfileAnswer
  question="Wenn du alles machen könntest was du willst, was wäre es?"
  answer={String(profile.dream)}
/>

{profile.image ? (
  <View>

    <Text style={styles.imageLabel}>
      Ein ehrlicher Blick.
    </Text>

    <Image
      source={{
        uri: String(profile.image),
      }}
      style={styles.image}
    />

  </View>
) : null}

<TouchableOpacity
  style={styles.nextButton}
  onPress={nextProfile}
>
  <Text style={styles.nextButtonText}>
    Nächstes Profil
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() =>
  router.push({
    pathname: "/chat",
    params: {
      name: profile.name,
    },
  })
}
  >
          <Text style={styles.buttonText}>Kennenlernen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
<BottomNav active="discover" />
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
  },

  content: {
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 14,
  },

title: {
  fontSize: 30,
  fontWeight: "700",
  color: "#2B2238",
  marginBottom: 12,
  lineHeight: 38,
  textAlign: "center",
},

card: {
  backgroundColor: "#FFFFFF",
  borderRadius: 30,
  padding: 24,

  paddingTop: 32,
  paddingBottom: 34,
  paddingHorizontal: 28,
  marginBottom: 40,

  borderWidth: 1,
  borderColor: "#EFE7FF",

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: {
    width: 100,
    height: 4,
  },
},

  name: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 10,
  },

special: {
  fontSize: 14,
  color: "#8C84A1",
  fontWeight: "600",
  marginBottom: 32,
  textAlign: "center",
},

image: {
  width: "100%",
  height: 320,
  borderRadius: 24,
  marginTop: 14,
  marginBottom: 30,
},

  button: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

subtitle: {
  fontSize: 16,
  color: "#6E6480",
  lineHeight: 24,
  marginBottom: 28,
  textAlign: "center",
  paddingHorizontal: 20,
},

imageLabel: {
  fontSize: 14,
  color: "#8C84A1",
  fontWeight: "600",
  marginBottom: 12,
  textAlign: "center",
  paddingHorizontal: 18,
},

nextButton: {
  borderWidth: 2,
  borderColor: "#C4B5FD",
  paddingVertical: 16,
  borderRadius: 18,
  alignItems: "center",
  marginBottom: 14,
},

nextButtonText: {
  color: "#7C3AED",
  fontSize: 16,
  fontWeight: "700",
},
});