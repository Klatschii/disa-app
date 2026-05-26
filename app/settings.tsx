import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";
import BottomNav from "./bottom-nav";

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
    const [gender, setGender] = useState("Mann");
    const [lookingFor, setLookingFor] = useState("Frauen");
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Einstellungen</Text>

        <Text style={styles.subtitle}>
          Passe an, wie du Disa nutzen möchtest.
        </Text>

<OptionGroup
  title="Ich bin"
  options={["Mann", "Frau", "Divers"]}
  selected={gender}
  onSelect={setGender}
/>

<OptionGroup
  title="Ich suche"
  options={["Frauen", "Männer", "Alle"]}
  selected={lookingFor}
  onSelect={setLookingFor}
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
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Zurück</Text>
        </TouchableOpacity>
      </View>

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
    paddingTop: 80,
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

  button: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 18,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
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
});