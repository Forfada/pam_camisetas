import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function AdicionarProduto({ route, navigation }) {
  const { produtos, setProdutos, editar } = route.params || {};

  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    if (editar) {
      setNome(editar.nome);
      setImagem(editar.imagem);
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

  const salvarProduto = () => {
    if (nome.trim() === "" || !imagem) {
      Alert.alert("Atenção", "Preencha o nome e escolha uma imagem.");
      return;
    }

    if (editar) {
      setProdutos(
        produtos.map((p) =>
          p.id === editar.id ? { ...p, nome: nome, imagem: imagem } : p
        )
      );
    } else {
      setProdutos([
        ...produtos,
        { id: Date.now().toString(), nome: nome, imagem: imagem },
      ]);
    }

    navigation.goBack();
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
