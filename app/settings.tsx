import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import BottomNav from "./bottom-nav";
import userPreferences from "./data/userPreferences";

export default function SettingsScreen() {
  
    function OptionGroup({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>

      <View style={styles.optionRow}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selected === option && styles.optionButtonActive,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text
              style={[
                styles.optionText,
                selected === option && styles.optionTextActive,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const [privacyConsent, setPrivacyConsent] = useState(true);
const [gender, setGender] = useState(userPreferences.gender);
const [lookingFor, setLookingFor] = useState(userPreferences.lookingFor);
useEffect(() => {
  const loadPreferences = async () => {
    const storedPreferences =
      await AsyncStorage.getItem("userPreferences");

    if (storedPreferences) {
      const preferences = JSON.parse(storedPreferences);

      setGender(preferences.gender || "Mann");
      setLookingFor(preferences.lookingFor || "Frauen");

      userPreferences.gender = preferences.gender || "Mann";
      userPreferences.lookingFor =
        preferences.lookingFor || "Frauen";
    }
  };

  loadPreferences();
}, []);
  return (
<View style={{ flex: 1 }}>
  <ScrollView
    style={styles.container}
    contentContainerStyle={{ paddingBottom: 20 }}
    showsVerticalScrollIndicator={false}
  >
       <TouchableOpacity
    onPress={() => router.back()}
    style={styles.backButton}
  >
    <Text style={styles.backText}>← Zurück</Text>
  </TouchableOpacity>

        <Text style={styles.title}>Einstellungen</Text>

        <Text style={styles.subtitle}>
          Passe an, wie du Disa nutzen möchtest.
        </Text>

<OptionGroup
  title="Ich bin"
  options={["Mann", "Frau", "Divers"]}
  selected={gender}
onSelect={async (value) => {
  setGender(value);
  userPreferences.gender = value;

  await AsyncStorage.setItem(
    "userPreferences",
    JSON.stringify({
      gender: value,
      lookingFor,
    })
  );
}}
/>

<OptionGroup
  title="Ich suche"
  options={["Frauen", "Männer", "Alle"]}
  selected={lookingFor}
onSelect={async (value) => {
  setLookingFor(value);
  userPreferences.lookingFor = value;

  await AsyncStorage.setItem(
    "userPreferences",
    JSON.stringify({
      gender,
      lookingFor: value,
    })
  );
}}
/>

        <SettingBlock
          title="Datenschutz"
          value="Du entscheidest selbst, was du teilst."
        />

        <View style={styles.consentBox}>
  <Pressable
    style={styles.checkbox}
    onPress={() => setPrivacyConsent(!privacyConsent)}
  >
    {privacyConsent && <View style={styles.checkboxInner} />}
  </Pressable>

  <Text style={styles.consentText}>
    Ich verstehe, dass Angaben zu Besonderheiten freiwillig sind und ich sie später ändern oder löschen kann.
  </Text>
</View>

      <TouchableOpacity
  style={styles.deleteButton}
  onPress={() => {
    Alert.alert(
      "Profil löschen?",
      "Dein gespeichertes Profil wird dauerhaft von diesem Gerät entfernt.",
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Löschen",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("userProfile");
            router.replace("/");
          },
        },
      ]
    );
  }}
>
  <Text style={styles.deleteButtonText}>
    Profil löschen
  </Text>
</TouchableOpacity>
      </ScrollView>

      <BottomNav active="profile" />
    </View>
  );
}

function SettingBlock({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      <Text style={styles.blockValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F3FF",
    padding: 24,
    paddingTop: 30,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#6E6480",
    lineHeight: 24,
    marginBottom: 34,
  },

  block: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EFE7FF",
  },

  blockTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2238",
    marginBottom: 8,
  },

  blockValue: {
    fontSize: 15,
    color: "#6E6480",
    lineHeight: 22,
  },

  consentBox: {
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  borderRadius: 24,
  padding: 20,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "#EFE7FF",
},

checkbox: {
  width: 24,
  height: 24,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: "#8B5CF6",
  marginRight: 14,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 2,
},

checkboxInner: {
  width: 12,
  height: 12,
  borderRadius: 4,
  backgroundColor: "#8B5CF6",
},

consentText: {
  flex: 1,
  fontSize: 14,
  lineHeight: 22,
  color: "#6E6480",
},

optionRow: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
},

optionButton: {
  borderWidth: 1,
  borderColor: "#C4B5FD",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 14,
},

optionButtonActive: {
  backgroundColor: "#8B5CF6",
  borderColor: "#8B5CF6",
},

optionText: {
  color: "#7C3AED",
  fontWeight: "700",
},

optionTextActive: {
  color: "#FFFFFF",
},

deleteButton: {
  borderWidth: 1,
  borderColor: "#FCA5A5",
  paddingVertical: 14,
  borderRadius: 16,
  alignItems: "center",
  marginTop: 18,
},

deleteButtonText: {
  color: "#B91C1C",
  fontSize: 15,
  fontWeight: "700",
},

backButton: {
  marginTop: 60,
  marginLeft: 24,
  marginBottom: 20,
},

backText: {
  fontSize: 16,
  color: "#7C3AED",
  fontWeight: "600",
},
});