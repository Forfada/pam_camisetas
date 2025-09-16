import React, { useState } from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [visivel, setVisivel] = useState(false);
  
  const handleEnviar = () => {
    setVisivel(true);
    setNome("");
    setMensagem("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fale com a FERRA Camisas</Text>
      <Text style={styles.subtitle}>
        Tire dúvidas, envie sugestões ou solicite atendimento!
      </Text>
      <TextInput
        mode="outlined"
        label="Seu Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#fff", primary: "#fff" },
        }}
        textColor="#fff"
      />
      <TextInput
        mode="outlined"
        label="Sua Mensagem"
        value={mensagem}
        onChangeText={setMensagem}
        multiline
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#fff", primary: "#fff" },
        }}
        textColor="#fff"
      />
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
        onPress={handleEnviar}
        icon="send"
      >
        Enviar
      </Button>
      <Modal
        transparent
        visible={visivel}
        animationType="fade"
        onRequestClose={() => setVisivel(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Obrigado pelo feedback!</Text>
            <Button
              mode="contained"
              style={styles.modalButton}
              labelStyle={{ color: "#001F54", fontWeight: "bold" }}
              onPress={() => setVisivel(false)}
            >
              OK
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 18,
    opacity: 0.8,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#001F54",
    color: "#fff",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#001F54",
    borderRadius: 10,
    marginTop: 5,
    elevation: 3,
  },
  modalBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 220,
  },
  modalText: {
    color: "#001F54",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#001F54",
    borderRadius: 8,
    marginTop: 5,
  },
});

