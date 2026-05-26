import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import BottomNav from "./bottom-nav";
export default function DiscoverScreen() {
const { about, proud, relationship, laugh, dream, image, special } =
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
        <Text style={styles.name}>Du</Text>

<Text style={styles.special}>
  Besonderheit: {String(special || "Noch keine Antwort.")}
</Text>

<ProfileAnswer
  question="Was sollte man über mich wissen?"
  answer={String(about)}
/>

<ProfileAnswer
  question="Auf was bin ich am meisten stolz?"
  answer={String(proud)}
/>

<ProfileAnswer
  question="Was wünsche ich mir in einer Beziehung?"
  answer={String(relationship)}
/>

<ProfileAnswer
  question="Was bringt dich zum Lachen?"
  answer={String(laugh)}
/>

<ProfileAnswer
  question="Wenn du alles machen könntest was du willst, was wäre es?"
  answer={String(dream)}
/>

{image ? (
  <View>

    <Text style={styles.imageLabel}>
      Ein ehrlicher Blick.
    </Text>

    <Image
      source={{
        uri: String(image),
      }}
      style={styles.image}
    />

  </View>
) : null}

<TouchableOpacity
  style={styles.button}
  onPress={() => router.push("/chat")}
  >
          <Text style={styles.buttonText}>Kennenlernen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
<BottomNav active="discover" />
</View>
);
}

function ProfileAnswer({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <View style={styles.answerBlock}>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.answer}>
  {answer || "Noch nicht beantwortet."}
</Text>
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

answerBlock: {
  backgroundColor: "#FAF8FF",
  borderRadius: 24,

  paddingVertical: 24,
  paddingHorizontal: 22,

  marginBottom: 24,

  borderWidth: 1,
  borderColor: "#EFE7FF",

  marginLeft: -18,
  marginRight: -18,
},

  question: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 12,
    lineHeight: 28,
  },

  answer: {
    fontSize: 16,
    lineHeight: 26,
    color: "#5B5563",
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
});