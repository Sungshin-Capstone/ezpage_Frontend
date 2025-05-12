import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 24 }}>
        <Text style={styles.title}>Login here</Text>
        <Text style={styles.subtitle}>Missed you!{'\n'}Your travel wallet is waiting.</Text>

        <TextInput
          style={styles.input}
          placeholder="ID"
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/SignUp')}>
          <Text style={styles.createAccountText} >Create new account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A2BA4',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#F1F3FB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#1A2BA4',
    fontSize: 13,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#1A2BA4',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1A2BA4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
});

export default LoginScreen;
