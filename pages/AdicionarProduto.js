import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { inserirProduto, atualizarProduto } from "../Portland/DB";

export default function AdicionarProduto({ route, navigation }) {
  const { editar } = route.params || {};

  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState(null);
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (editar) {
      setNome(editar.nome);
      setImagem(editar.imagem);
      setDescricao(editar.descricao || "");
    }
  }, [editar]);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Conceda acesso à galeria para escolher uma imagem.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const salvarProduto = async () => {
    if (nome.trim() === "" || !imagem) {
      Alert.alert("Atenção", "Preencha o nome e escolha uma imagem.");
      return;
    }

    try {
      if (editar) {
        await atualizarProduto(editar.id, nome, imagem, descricao);
      } else {
        await inserirProduto(nome, imagem, descricao);
      }
      navigation.goBack(); // só volta, não precisa recarregar manualmente
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editar ? "Editar Camiseta" : "Nova Camiseta"}</Text>
      <TextInput
        mode="outlined"
        label="Nome da Camiseta"
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
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#fff", primary: "#fff" },
        }}
        textColor="#fff"
        multiline
      />
      <TouchableOpacity style={styles.imgPicker} onPress={escolherImagem}>
        {imagem ? (
          <>
            <Image source={{ uri: imagem }} style={styles.preview} />
            <Text style={styles.chooseText}>Escolher imagem</Text>
          </>
        ) : (
          <Text style={styles.chooseText}>Escolher imagem</Text>
        )}
      </TouchableOpacity>
      <Button
        mode="contained"
        onPress={salvarProduto}
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
      >
        {editar ? "Salvar Alterações" : "Adicionar Camiseta"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  chooseText: {
    position: "absolute",
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    bottom: 10,
    backgroundColor: "rgba(0,31,84,0.7)",
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 1,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#001F54",
    color: "#fff",
    borderRadius: 8,
  },
  imgPicker: {
    backgroundColor: "#001F54",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#001F54",
    marginTop: 10,
    borderRadius: 10,
    elevation: 3,
  },
});
