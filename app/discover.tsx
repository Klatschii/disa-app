import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import ProfileCard from "../components/ProfileCard";
import BottomNav from "./bottom-nav";
import conditionInfo from "./data/conditionInfo";
import profiles from "./data/profiles";
import userPreferences from "./data/userPreferences";

export default function DiscoverScreen() {
  const fadeAnim =
  useRef(new Animated.Value(1)).current;
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lookingFor, setLookingFor] =
  useState(userPreferences.lookingFor);
useEffect(() => {
  const loadPreferences = async () => {
    const storedPreferences =
      await AsyncStorage.getItem("userPreferences");

    if (storedPreferences) {
      const preferences = JSON.parse(storedPreferences);

      userPreferences.gender =
        preferences.gender || "Mann";

      const savedLookingFor =
        preferences.lookingFor || "Frauen";

      userPreferences.lookingFor =
        savedLookingFor;

      setLookingFor(savedLookingFor);
      setCurrentIndex(0);
    }
  };

  loadPreferences();
}, []);
  const filteredProfiles = profiles.filter(
    
  (profile) => {
    if (
  lookingFor === "Alle"
) {
      return true;
    }

    if (
lookingFor === "Frauen"
    ) {
      return (
        profile.gender === "woman"
      );
    }

   if (
  lookingFor === "Männer"
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

const nextProfile = () => {
  scrollRef.current?.scrollTo({
    y: 0,
    animated: true,
  });

  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 180,
    useNativeDriver: true,
  }).start(() => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % filteredProfiles.length
    );

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 240,
      useNativeDriver: true,
    }).start();
  });
};

 return (
  <View style={{ flex: 1 }}>

<ScrollView
  ref={scrollRef}
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

<Animated.View
  style={{
    opacity: fadeAnim,
  }}
>
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
</Animated.View>
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