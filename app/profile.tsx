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

export default function ProfileScreen() {
  const {
    about,
    proud,
    relationship,
    laugh,
    dream,
    image,
    special,
  } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {image ? (
          <Image
            source={{ uri: String(image) }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              Kein Bild
            </Text>
          </View>
        )}

        <Text style={styles.name}>Du</Text>

        <Text style={styles.special}>
          Besonderheit: {String(special || "Noch keine Antwort.")}
        </Text>

        <Text style={styles.quote}>
          Menschen sind mehr als ihr erster Eindruck.
        </Text>

        <ProfileBlock
          title="Was sollte man über mich wissen?"
          text={String(about || "Noch nicht ausgefüllt.")}
        />

        <ProfileBlock
          title="Auf was bin ich am meisten stolz?"
          text={String(proud || "Noch nicht ausgefüllt.")}
        />

        <ProfileBlock
          title="Was wünsche ich mir in einer Beziehung?"
          text={String(
            relationship || "Noch nicht ausgefüllt."
          )}
        />

        <ProfileBlock
          title="Was bringt dich zum Lachen?"
          text={String(laugh || "Noch nicht ausgefüllt.")}
        />

        <ProfileBlock
          title="Wenn du alles machen könntest was du willst, was wäre es?"
          text={String(dream || "Noch nicht ausgefüllt.")}
        />

<TouchableOpacity
  style={styles.button}
  onPress={() =>
    router.push({
      pathname: "/profile-setup",
      params: {
        about,
        proud,
        relationship,
        laugh,
        dream,
        image: image ?? "",
        special: String(special ?? ""),
      },
    })
  }
>
  <Text style={styles.buttonText}>
    Profil bearbeiten
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.secondaryButton}
  onPress={() => router.push("/settings")}
>
  <Text style={styles.secondaryButtonText}>
    Einstellungen
  </Text>
</TouchableOpacity>
      </ScrollView>

      <BottomNav active="profile" />
    </View>
  );
}

function ProfileBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>

      <Text style={styles.blockText}>{text}</Text>
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
    paddingBottom: 50,
  },

  image: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignSelf: "center",
    marginBottom: 28,
  },

  imagePlaceholder: {
    width: 170,
    height: 170,
    borderRadius: 85,
    alignSelf: "center",
    marginBottom: 28,
    backgroundColor: "#E9DFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  imagePlaceholderText: {
    color: "#7C3AED",
    fontWeight: "700",
  },

  name: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2B2238",
    textAlign: "center",
    marginBottom: 10,
  },

  special: {
    fontSize: 16,
    color: "#7C3AED",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 24,
  },

  quote: {
    fontSize: 18,
    color: "#5B5563",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 40,
    paddingHorizontal: 20,
  },

  block: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,
  },

  blockTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 10,
  },

  blockText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#5B5563",
  },

  button: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  secondaryButton: {
  borderWidth: 2,
  borderColor: "#C4B5FD",
  paddingVertical: 18,
  borderRadius: 20,
  alignItems: "center",
  marginTop: 14,
},

secondaryButtonText: {
  color: "#7C3AED",
  fontSize: 17,
  fontWeight: "700",
},
});