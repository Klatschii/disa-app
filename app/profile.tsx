import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
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

  const [savedProfile, setSavedProfile] = useState<any>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem("userProfile");

      if (storedProfile) {
        setSavedProfile(JSON.parse(storedProfile));
      }
    };

    loadProfile();
  }, []);

const displayedProfile = savedProfile || {
  about,
  proud,
  relationship,
  laugh,
  dream,
  image,
  special,
};

let age = "";

if (displayedProfile.birthdate) {
const birth = String(displayedProfile.birthdate);

if (birth.length === 8) {
  const day = Number(birth.slice(0, 2));
  const month = Number(birth.slice(2, 4));
  const year = Number(birth.slice(4, 8));

  const birthDate = new Date(
    year,
    month - 1,
    day
  );

  const today = new Date();

  age = String(
    today.getFullYear() - birthDate.getFullYear()
  );

  const monthDiff =
    today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (
      monthDiff === 0 &&
      today.getDate() < birthDate.getDate()
    )
  ) {
    age = String(Number(age) - 1);
  }
}
}

  return (
    <View style={{ flex: 1 }}>
<ScrollView
  ref={scrollRef}
  style={styles.container}
  contentContainerStyle={styles.content}
  showsVerticalScrollIndicator={false}
>
        {displayedProfile.image ? (
          <Image
            source={{ uri: String(displayedProfile.image) }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              Kein Bild
            </Text>
          </View>
        )}

        <Text style={styles.name}>
  Du{age ? `, ${age}` : ""}
</Text>

        <Text style={styles.special}>
          Besonderheit: {String(displayedProfile.special || "Noch keine Antwort.")}
        </Text>

        <Text style={styles.quote}>
          Menschen sind mehr als ihr erster Eindruck.
        </Text>

        <ProfileBlock
          title="Was sollte man über mich wissen?"
          text={String(displayedProfile.about || "Noch nicht ausgefüllt.")}
        />

        <ProfileBlock
          title="Auf was bin ich am meisten stolz?"
          text={String(displayedProfile.proud || "Noch nicht ausgefüllt.")}
        />

        <ProfileBlock
          title="Was wünsche ich mir in einer Beziehung?"
          text={String(
            displayedProfile.relationship || "Noch nicht ausgefüllt."
          )}
        />

        <ProfileBlock
          title="Was bringt dich zum Lachen?"
          text={String(displayedProfile.laugh || "Noch nicht ausgefüllt.")}
        />

        <ProfileBlock
          title="Wenn du alles machen könntest was du willst, was wäre es?"
          text={String(displayedProfile.dream || "Noch nicht ausgefüllt.")}
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
onPress={() => {
  scrollRef.current?.scrollTo({
    y: 0,
    animated: false,
  });

  router.push("/settings");
}}
>
  <Text style={styles.secondaryButtonText}>
    Einstellungen
  </Text>
</TouchableOpacity>

      <TouchableOpacity
  style={styles.logoutButton}
onPress={async () => {
  router.replace("/login");
}}
>
  <Text style={styles.logoutButtonText}>
    Abmelden
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
    paddingBottom: 6,
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

logoutButton: {
  backgroundColor: "#F3EDFF",
  borderRadius: 16,
  paddingVertical: 12,
  alignItems: "center",
  marginTop: 12,
  marginBottom: 30,
},

logoutButtonText: {
  color: "#7C3AED",
  fontSize: 15,
  fontWeight: "700",
},
});