import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ActivityIndicator } from "react-native";
import { listarProdutos } from "../Portland/DB";

export default function ViewProduto({ route }) {
  const { id } = route.params;
  const [produto, setProduto] = useState(null);

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