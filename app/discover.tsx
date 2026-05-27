import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { router } from "expo-router";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import BottomNav from "./bottom-nav";
import conditionInfo from "./data/conditionInfo";
import profiles from "./data/profiles";
import userPreferences from "./data/userPreferences";

export default function DiscoverScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredProfiles = profiles.filter(
  (profile) => {
    if (
      userPreferences.lookingFor === "Alle"
    ) {
      return true;
    }

    if (
      userPreferences.lookingFor ===
      "Frauen"
    ) {
      return (
        profile.gender === "woman"
      );
    }

    if (
      userPreferences.lookingFor ===
      "Männer"
    ) {
      return (
        profile.gender === "man"
      );
    }

    return true;
  }
);
  const profile =
  filteredProfiles[currentIndex];
  if (!profile) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Noch keine passenden Profile
        </Text>

        <Text style={styles.emptyText}>
          Ändere deine Sucheinstellungen oder schau später wieder vorbei.
        </Text>

        <TouchableOpacity
          style={styles.emptyButton}
          onPress={() => router.push("/settings")}
        >
          <Text style={styles.emptyButtonText}>
            Sucheinstellungen ändern
          </Text>
        </TouchableOpacity>
      </View>

      <BottomNav active="discover" />
    </View>
  );
}
  useEffect(() => {
  setCurrentIndex(0);
}, [userPreferences.lookingFor]);
  const nextProfile = () => {
  setCurrentIndex((currentIndex + 1) % filteredProfiles.length);
};

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

<ProfileCard
  profile={profile}
  onInfoPress={() => {
    const info = conditionInfo[profile.special];

    if (info) {
      alert(
        `${info.title}\n\n${info.short}\n\n${info.respect}`
      );
    }
  }}
  onNext={nextProfile}
  onMeet={() =>
    router.push({
      pathname: "/chat",
      params: {
        name: profile.name,
      },
    })
  }
/>
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

subtitle: {
  fontSize: 16,
  color: "#6E6480",
  lineHeight: 24,
  marginBottom: 28,
  textAlign: "center",
  paddingHorizontal: 20,
},

emptyContainer: {
  flex: 1,
  backgroundColor: "#F7F3FF",
  padding: 28,
  justifyContent: "center",
},

emptyTitle: {
  fontSize: 30,
  fontWeight: "700",
  color: "#2B2238",
  textAlign: "center",
  marginBottom: 16,
},

emptyText: {
  fontSize: 16,
  color: "#6E6480",
  lineHeight: 24,
  textAlign: "center",
  marginBottom: 34,
},

emptyButton: {
  backgroundColor: "#8B5CF6",
  paddingVertical: 18,
  borderRadius: 20,
  alignItems: "center",
},

emptyButtonText: {
  color: "#FFFFFF",
  fontSize: 17,
  fontWeight: "700",
},
});