import React from "react";
import { View, Text, Modal, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingOverlayProps {
  visible: boolean;
  loadingText?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, loadingText = "Loading..." }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="#fff" />
          {loadingText ? <Text style={styles.text}>{loadingText}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoadingOverlay;
