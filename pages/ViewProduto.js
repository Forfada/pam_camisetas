import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ActivityIndicator, Alert } from "react-native";
import { listarProdutos, excluirProduto } from "../Portland/DB";
import { useCart } from "../CartContext";
import { IconButton, Button } from "react-native-paper";

export default function ViewProduto({ route, navigation }) {
  const { id } = route.params;
  const [produto, setProduto] = useState(null);
  const { addToCart, removeFromCart } = useCart(); // <-- adicione removeFromCart

  useEffect(() => {
    async function fetchProduto() {
      const produtos = await listarProdutos();
      const found = produtos.find((p) => p.id === id);
      setProduto(found);
    }
    fetchProduto();
  }, [id]);

  if (!produto) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#001F54" size="large" />
        <Text style={styles.nome}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: produto.imagem }} style={styles.imagem} />
      <Text style={styles.nome}>{produto.nome}</Text>
      {produto.descricao ? (
        <Text style={styles.descricao}>{produto.descricao}</Text>
      ) : null}
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <IconButton
          icon="pencil"
          size={28}
          onPress={() =>
            navigation.navigate("AdicionarProduto", { editar: produto })
          }
          style={{ backgroundColor: "#001F54", marginRight: 10 }}
          iconColor="#fff"
        />
        <IconButton
          icon="delete"
          size={28}
          onPress={() => {
            Alert.alert(
              "Excluir",
              "Tem certeza que deseja excluir esta camiseta?",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Excluir",
                  style: "destructive",
                  onPress: async () => {
                    await excluirProduto(produto.id);
                    removeFromCart(produto.id); // <-- remove do carrinho também
                    navigation.goBack();
                  },
                },
              ]
            );
          }}
          style={{ backgroundColor: "#fff" }}
          iconColor="#001F54"
        />
      </View>
      <Button
        mode="contained"
        style={{ marginTop: 20, backgroundColor: "#001F54" }}
        icon="cart-plus"
        onPress={() => {
          addToCart(produto);
          Alert.alert("Adicionado ao carrinho!");
        }}
      >
        Adicionar ao Carrinho
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  imagem: {
    width: 260,
    height: 260,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: "#001F54",
  },
  nome: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  descricao: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    opacity: 0.8,
    marginTop: 8,
  },
});