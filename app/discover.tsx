import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
export default function DiscoverScreen() {
const { about, proud, relationship, laugh, dream, image, special } =
  useLocalSearchParams();
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Menschen entdecken</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Du</Text>

<Text style={styles.special}>
  Besonderheit: {String(special || "Nicht angegeben")}
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
  <Image
    source={{
      uri: String(image),
    }}
    style={styles.image}
  />
) : null}

<TouchableOpacity
  style={styles.button}
  onPress={() => router.push("/chat")}
  >
          <Text style={styles.buttonText}>Kennenlernen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
      <Text style={styles.answer}>{answer}</Text>
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
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 28,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  name: {
    fontSize: 30,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 10,
  },

  special: {
    fontSize: 15,
    color: "#7C3AED",
    fontWeight: "700",
    marginBottom: 28,
  },

  answerBlock: {
    marginBottom: 26,
  },

  question: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 8,
    lineHeight: 24,
  },

  answer: {
    fontSize: 16,
    lineHeight: 26,
    color: "#5B5563",
  },

  image: {
    width: "100%",
    height: 280,
    borderRadius: 24,
    marginTop: 10,
    marginBottom: 24,
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
});