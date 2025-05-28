import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import userApi from '../apis/user';
import { Alert } from 'react-native';

function SignIn() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("로그인 버튼 클릭됨");
    console.log(username, password)
  try {
    const reqOk = await userApi.signIn(username, password);
    console.log("서버 응답:", reqOk);
    if (reqOk) {
      console.log("로그인 성공");
      navigation.replace('Home');
    } else {
      console.log("로그인 실패 - 응답은 false");
      Alert.alert("로그인 실패", "아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  } catch (err) {
    console.error("로그인 중 오류 발생:", err);
    Alert.alert("로그인 실패", "로그인에 실패했습니다. 다시 시도해주세요.");
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 24 }}>
        <Text style={styles.title}>로그인</Text>
        <Text style={styles.subtitle}>Your travel wallet is waiting.</Text>

        <TextInput
          style={styles.input}
          value={username}
          placeholder="ID"
          onChangeText={setUsername}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
    color: '#737373',
    fontSize: 13,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#D0E5FF',
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

export default SignIn;
