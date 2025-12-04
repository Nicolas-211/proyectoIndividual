import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import useLogin from "../hooks/useLogin";

export default function LoginScreen() {
  const { email, password, setEmail, setPassword, handleLogin, loading } = useLogin();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {loading ? "Cargando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f2f2f2" },
  card: { width: "100%", backgroundColor: "white", padding: 20, borderRadius: 12, elevation: 5 },
  title: { textAlign: "center", fontSize: 28, fontWeight: "bold", marginBottom: 25 },
  input: { backgroundColor: "#eee", padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" }
});
