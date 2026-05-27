import React, { useEffect, useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";

export default function ProfileSetupScreen() {
  const { special } = useLocalSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [about, setAbout] = useState("");
  const [proud, setProud] = useState("");
  const [relationship, setRelationship] = useState("");
  const [laugh, setLaugh] = useState("");
  const [dream, setDream] = useState("");

  useEffect(() => {
  const loadProfile = async () => {
    const storedProfile =
      await AsyncStorage.getItem("userProfile");

    if (storedProfile) {
      const profile = JSON.parse(storedProfile);

      setAbout(profile.about || "");
      setProud(profile.proud || "");
      setRelationship(profile.relationship || "");
      setLaugh(profile.laugh || "");
      setDream(profile.dream || "");
      setImage(profile.image || null);
    }
  };

  loadProfile();
}, []);

  const isFormValid =
    about.trim().length > 0 &&
    proud.trim().length > 0 &&
    relationship.trim().length > 0 &&
    laugh.trim().length > 0 &&
    dream.trim().length > 0;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Zurück</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Erzähl etwas über dich</Text>

        <Text style={styles.subtitle}>
          Ehrliche Antworten machen echte Verbindungen möglich.
        </Text>

        <Text style={styles.progress}>
  Profil zu 70% vollständig
</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Text style={styles.imageText}>Zeig dich, wie du bist</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.infoText}>
  Du entscheidest selbst, was du über dich teilen möchtest.
</Text>

        <Question
          label="Was sollte man über mich wissen?"
          big
          value={about}
          onChangeText={setAbout}
          placeholder="Nimm dir ruhig etwas Platz. Erzähl ausführlicher, was Menschen über dich, deinen Alltag oder deine Besonderheiten oder Charaktereigenschaften wissen sollten..."
        />

        <Question
          label="Auf was bin ich am meisten stolz?"
          value={proud}
          onChangeText={setProud}
          placeholder="Was macht dich stolz?"
        />

        <Question
          label="Was wünsche ich mir in einer Beziehung?"
          value={relationship}
          onChangeText={setRelationship}
          placeholder="Was ist dir wichtig?"
        />

        <Question
          label="Was bringt dich zum Lachen?"
          value={laugh}
          onChangeText={setLaugh}
          placeholder="Humor, Situationen, Menschen, Momente..."
        />

        <Question
          label="Wenn du alles machen könntest was du willst, was wäre es?"
          value={dream}
          onChangeText={setDream}
          placeholder="Was würdest du tun, wenn alles möglich wäre?"
        />

        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: "#8B5CF6",},
          ]}
          onPress={async () => {

const existingProfileRaw =
  await AsyncStorage.getItem("userProfile");

const existingProfile = existingProfileRaw
  ? JSON.parse(existingProfileRaw)
  : {};

const updatedProfile = {
  about: about.trim() || existingProfile.about || "",
  proud: proud.trim() || existingProfile.proud || "",
  relationship:
    relationship.trim() || existingProfile.relationship || "",
  laugh: laugh.trim() || existingProfile.laugh || "",
  dream: dream.trim() || existingProfile.dream || "",
  image: image || existingProfile.image || "",
  special: String(special || existingProfile.special || ""),
};

await AsyncStorage.setItem(
  "userProfile",
  JSON.stringify(updatedProfile)
);
         
router.push({
  pathname: "/discover",
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
}}
        >
          <Text style={styles.buttonText}>Profil speichern</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Question({
  label,
  value,
  onChangeText,
  placeholder,
  big,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  big?: boolean;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        multiline
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={[
  styles.textArea,
  big && styles.bigTextArea,
]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
  },

  content: {
    paddingHorizontal: 28,
    paddingTop: 90,
    paddingBottom: 60,
  },

  backButton: {
    marginBottom: 24,
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
    marginBottom: 12,
    lineHeight: 42,
  },

  subtitle: {
    fontSize: 17,
    color: "#6E6480",
    lineHeight: 26,
    marginBottom: 40,
  },

  imagePicker: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#E9DFFF",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    overflow: "hidden",
  },

  profileImage: {
    width: "100%",
    height: "100%",
  },

  imageText: {
    color: "#7C3AED",
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  section: {
    marginBottom: 30,
  },

  label: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 14,
    lineHeight: 26,
  },

  textArea: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    minHeight: 140,
    fontSize: 16,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#E9DFFF",
    lineHeight: 24,
    color: "#2B2238",
  },

  button: {
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  progress: {
  fontSize: 15,
  color: "#7C3AED",
  fontWeight: "600",
  marginBottom: 30,
},

bigTextArea: {
  minHeight: 220,
},

infoText: {
  fontSize: 15,
  lineHeight: 24,
  color: "#6E6480",
  marginBottom: 34,
},
});