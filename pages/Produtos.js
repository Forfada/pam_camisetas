import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Alert } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { listarProdutos, excluirProduto, seedProdutosPadrao } from "../Portland/DB";
import { useCart } from "../CartContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Produtos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const itensPorPagina = 4;
  const [page, setPage] = useState(1);

  const { cart, addToCart } = useCart();

  const totalPages = Math.ceil(produtos.length / itensPorPagina);
  const produtosPaginados = produtos.slice(
    (page - 1) * itensPorPagina,
    page * itensPorPagina
  );

  // Seed só na primeira montagem
  useEffect(() => {
    async function inicializar() {
      await seedProdutosPadrao();
      await carregarProdutos();
    }
    inicializar();
    // Listener de foco só recarrega produtos, não roda seed
    const unsubscribe = navigation.addListener("focus", carregarProdutos);
    return unsubscribe;
  }, [navigation]);

  async function carregarProdutos() {
    setLoading(true);
    const lista = await listarProdutos();
    setProdutos(lista);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camisetas de Times</Text>
      <FlatList
        data={produtosPaginados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("ViewProduto", { id: item.id })}
          >
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <Card.Title
              title={item.nome}
              titleStyle={{ color: "#fff", fontWeight: "bold" }}
            />
            <Card.Content>
              <Text style={{ color: "#fff", marginBottom: 8 }}>
                {item.descricao}
              </Text>
              <Button
                mode="contained"
                icon="cart-plus"
                style={styles.addCartBtn}
                labelStyle={{ color: "#fff" }}
                onPress={() => {
                  addToCart(item);
                  Alert.alert("Adicionado ao carrinho!");
                }}
              >
                Adicionar ao Carrinho
              </Button>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListFooterComponent={
          totalPages > 1 && (
            <View style={[styles.paginationContainer, { marginHorizontal: 0, paddingHorizontal: 10 }]}>
              <Button
                mode="contained"
                onPress={() => setPage(page - 1)}
                disabled={page === 1}
                style={[
                  styles.paginationButton,
                  page === 1 && styles.paginationButtonDisabled,
                ]}
                labelStyle={styles.paginationLabel}
                icon="chevron-left"
              >
                Anterior
              </Button>
              <Text style={styles.paginationText}>
                {page} de {totalPages}
              </Text>
              <Button
                mode="contained"
                onPress={() => setPage(page + 1)}
                disabled={page === totalPages}
                style={[
                  styles.paginationButton,
                  page === totalPages && styles.paginationButtonDisabled,
                ]}
                labelStyle={styles.paginationLabel}
                icon="chevron-right"
                contentStyle={{ flexDirection: "row-reverse" }}
              >
                Próxima
              </Button>
            </View>
          )
        }
        refreshing={loading}
        onRefresh={carregarProdutos}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate("AdicionarProduto", {})}
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
        icon="plus"
      >
        Adicionar Camiseta
      </Button>

      {/* Botão do carrinho flutuante */}
      <View style={styles.cartButtonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Carrinho")}
          style={styles.cartButton}
          contentStyle={{ flexDirection: "row" }}
          labelStyle={{ color: "#fff" }}
          icon={() => (
            <Icon name="cart" size={28} color="#fff" />
          )}
        >
          {cart.length > 0 ? cart.length : null}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FA",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001F54",
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 1,
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#111827",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
  },
  imagem: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
    backgroundColor: "#001F54",
  },
  button: {
    backgroundColor: "#001F54",
    marginTop: 10,
    borderRadius: 10,
    elevation: 3,
  },
  addCartBtn: {
    backgroundColor: "#001F54",
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 2,
    alignSelf: "flex-start",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
    width: "100%",
  },
  paginationButton: {
    backgroundColor: "#001F54",
    borderRadius: 8,
    minWidth: 90,
    marginHorizontal: 0,
    elevation: 2,
  },
  paginationButtonDisabled: {
    backgroundColor: "#B0B8C1",
  },
  paginationLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  paginationText: {
    color: "#001F54",
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: 10,
  },
  cartButtonContainer: {
    position: "absolute",
    right: 20,
    bottom: 90,
    zIndex: 10,
  },
  cartButton: {
    backgroundColor: "#001F54",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    padding: 0,
  },
});
