import { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import userApi from "../apis/user";

function SignUp() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState('');

  const [username, setUsername] = useState('');  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSignUp = async () => {
    try {
    const result = await userApi.signUp({
      username,
      password: pw,
      password2: pw2,
      nickname,
      name,
      email,
      country: selectedCountry,
      profile_image: null, 
    });
    if (result) {
      alert('회원가입 성공!');
      navigation.replace('SignIn'); // 회원가입 후 로그인 화면으로 이동
    } else {
      alert('회원가입 실패');
    }
  } catch (error) {
    console.error('회원가입 에러:', error);
    alert('회원가입 중 오류가 발생했습니다');
  }
  };

  const SignUpStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력해주세요"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.createAccountText}>Already have an account</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        );
      case 3:
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="아이디를 입력해주세요"
              placeholderTextColor="#666"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        );
      case 4:
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 입력해주세요"
              placeholderTextColor="#666"
              secureTextEntry
              value={pw}
              onChangeText={setPw}
            />
            <TextInput
              style={styles.input}
              placeholder="비밀번호를 한 번 더 입력해주세요"
              placeholderTextColor="#666"
              secureTextEntry
              value={pw2}
              onChangeText={setPw2}
            />
          </View>
        );
      case 5:
        return (
          <View>
            <TextInput
              style={styles.input}
              placeholder="닉네임을 입력해주세요"
              placeholderTextColor="#666"
              value={nickname}
              onChangeText={setNickname}
            />
          </View>
        );
      case 6:
        return (
          <View>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
              style={styles.picker}
              dropdownIconColor="#666"
            >
              <Picker.Item label="국가를 선택하세요" value="" />
              <Picker.Item label="한국" value="kr" />
              {/* 필요하면 국가 더 추가 */}
            </Picker>
          </View>
        );
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    let isValid = false;
    switch (step) {
      case 1:
        isValid = name.trim() !== '';
        if (!isValid) alert('이름을 입력해주세요');
        break;
      case 2:
        isValid = email.trim() !== '';
        if (!isValid) alert('이메일을 입력해주세요');
        break;
      case 3:
        isValid = username.trim() !== '';
        if (!isValid) alert('아이디를 입력해주세요');
        break;
      case 4:
        isValid = pw !== '' && pw === pw2;
        if (!isValid) alert('비밀번호가 맞지 않거나 입력되지 않았습니다');
        break;
      case 5:
        isValid = nickname.trim() !== '';
        if (!isValid) alert('닉네임을 입력해주세요');
        break;
      case 6:
        isValid = selectedCountry !== '';
        if (!isValid) alert('국가를 선택해주세요');
        break;
    }

    if (isValid) {
      setStep(step + 1);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Your travel wallet is waiting</Text>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.stepContent}>
          {SignUpStep()}
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={step < 6 ? handleNextStep : handleSignUp}
        >
          <Text style={styles.signUpText}>{step < 6 ? '다음' : '회원가입 완료'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  stepContent: {
    padding: 10,
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
  signUpButton: {
    backgroundColor: '#1A2BA4',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
  picker: {
    color: '#000',
    fontSize: 16,
    height: 100,
  },
});
