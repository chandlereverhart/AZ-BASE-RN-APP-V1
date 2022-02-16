import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../../Firebase/firebase";
const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [userId, setUserId] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        navigation.replace("MyTabs");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignup = async () => {
    try {
      const createUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await Promise.all([
        db
          .collection("users")
          .doc(createUser.user.uid)
          .set({
            email: email,
            userId: createUser.user.uid,
            roles: {
              appUser: true,
              clientAdmin: false,
              superAdmin: false,
            },
          }),
      ]);
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    }
  };
  const handleLogin = async () => {
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with:", user.email);
        });
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {error && (
        <View>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        ></TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.helperText}>Have an account?</Text>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.helperText}>Or</Text>

        <Text style={styles.helperText}>Create an account</Text>

        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  error: {
    fontSize: 24,
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  helperText: {
    fontSize: 16,
    color: "white",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#121212",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#121212",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#121212",
    fontWeight: "700",
    fontSize: 16,
  },
});
