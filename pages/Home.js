import React from "react";
import { View, StyleSheet, Text, Image, ScrollView, Pressable } from "react-native";
import { Button, Card } from "react-native-paper";
import { listarProdutos } from "../Portland/DB";

export default function Home({ navigation }) {
  async function abrirDestaque(navigation, nome) {
    const produtos = await listarProdutos();
    const produto = produtos.find((p) => p.nome === nome);
    if (produto) {
      navigation.navigate("ViewProduto", { id: produto.id });
    }
  }

  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://img.icons8.com/ios-filled/100/001F54/t-shirt.png" }}
          style={styles.logo}
        />
        <Text style={styles.appName}>FERRA Camisas</Text>
        <Text style={styles.slogan}>Sua loja de camisas de futebol premium</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destaques</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Card style={styles.card}>
            <Image
              source={require("../assets/camisas/real_23.jpeg")}
              style={styles.cardImg}
            />
            <Pressable
              onPress={() => abrirDestaque(navigation, "Real Madrid 23/24")}
              android_ripple={{ color: "#001F54", borderless: false }}
              style={({ pressed }) => [
                { opacity: pressed ? 0.8 : 1 },
                { borderRadius: 16 },
              ]}
            >
              <Card.Content>
                <Text style={styles.cardTitle}>Real Madrid 23/24</Text>
                <Text style={styles.cardDesc}>Nova coleção, tecido dry-fit</Text>
              </Card.Content>
            </Pressable>
          </Card>
          <Card style={styles.card}>
            <Image
              source={require("../assets/camisas/psg_23.jpg")}
              style={styles.cardImg}
            />
            <Pressable
              onPress={() => abrirDestaque(navigation, "PSG 23/24")}
              android_ripple={{ color: "#001F54", borderless: false }}
              style={({ pressed }) => [
                { opacity: pressed ? 0.8 : 1 },
                { borderRadius: 16 },
              ]}
            >
              <Card.Content>
                <Text style={styles.cardTitle}>PSG 23/24</Text>
                <Text style={styles.cardDesc}>Edição limitada, Ugarte, gola V</Text>
              </Card.Content>
            </Pressable>
          </Card>
          <Card style={styles.card}>
            <Image
              source={require("../assets/camisas/fla_23.jpg")}
              style={styles.cardImg}
            />
            <Pressable
              onPress={() => abrirDestaque(navigation, "Flamengo 23/24")}
              android_ripple={{ color: "#001F54", borderless: false }}
              style={({ pressed }) => [
                { opacity: pressed ? 0.8 : 1 },
                { borderRadius: 16 },
              ]}
            >
              <Card.Content>
                <Text style={styles.cardTitle}>Flamengo 23/24</Text>
                <Text style={styles.cardDesc}>Versão torcedor, manga longa</Text>
              </Card.Content>
            </Pressable>
          </Card>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Por que comprar na FERRA Camisas?</Text>
        <View style={styles.benefits}>
          <View style={styles.benefitItem}>
            <Image source={{ uri: "https://img.icons8.com/ios-filled/50/001F54/delivery.png" }} style={styles.benefitIcon} />
            <Text style={styles.benefitText}>Entrega rápida</Text>
          </View>
          <View style={styles.benefitItem}>
            <Image source={require("../assets/badg.png")} style={styles.benefitIcon} />
            <Text style={styles.benefitText}>Produtos originais</Text>
          </View>
          <View style={styles.benefitItem}>
            <Image source={{ uri: "https://img.icons8.com/ios-filled/50/001F54/online-support.png" }} style={styles.benefitIcon} />
            <Text style={styles.benefitText}>Atendimento 24h</Text>
          </View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Produtos")}
          style={styles.button}
          labelStyle={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
        >
          Ver Camisetas
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "#001F54",
    paddingVertical: 32,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  appName: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  slogan: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
    fontStyle: "italic",
    opacity: 0.8,
  },
  section: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#F3F6FA",
    borderRadius: 18,
    paddingVertical: 16,
  },
  sectionTitle: {
    color: "#001F54",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#fff",
    marginRight: 16,
    width: 180,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E3ECF7",
  },
  cardImg: {
    width: "100%",
    height: 110,
    backgroundColor: "#E3ECF7",
  },
  cardTitle: {
    color: "#001F54",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
  },
  cardDesc: {
    color: "#001F54",
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 8,
  },
  benefits: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  benefitItem: {
    alignItems: "center",
    flex: 1,
  },
  benefitIcon: {
    width: 36,
    height: 36,
    marginBottom: 6,
  },
  benefitText: {
    color: "#001F54",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
  ctaSection: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#001F54",
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 8,
    elevation: 3,
  },
});
