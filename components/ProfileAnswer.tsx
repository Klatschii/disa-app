import {
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ProfileAnswer({
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
        {answer || "Noch keine Antwort."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});