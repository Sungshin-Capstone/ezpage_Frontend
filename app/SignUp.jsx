import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';

function SignUp () {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState('');

  const SignUpStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <TextInput
              style={styles.input}
              type="name"
              name="name"
              placeholder="이름을 입력해주세요"
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={() => router.replace('/SignIn')}>
              <Text style={styles.createAccountText} >Already have an account</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View>
            <TextInput
              style={styles.input}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              placeholderTextColor="#666"
            />
          </View>
        );
      case 3:
        return (
          <View>
            <TextInput
              style={styles.input}
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              type="password"
              name="password2"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              placeholderTextColor="#666"
            />
          </View>
        )
      case 4:
        return (
          <View>
            <TextInput
              style={styles.input}
              type="nickname"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              placeholderTextColor="#666"
            />
          </View>
        )
      case 5:
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
            </Picker>
          </View>
        )
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 50}}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Your travel wallet is waiting</Text>
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.stepContent}>
          {SignUpStep()}
        </View>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            if (step < 5) setStep(step + 1);
            else router.replace('/SignIn');
          }}
        >
          <Text style={styles.signUpText}>{step < 5 ? '다음' : '회원가입 완료'}</Text>
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
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#1A2BA4',
    fontSize: 13,
    fontWeight: '500',
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
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
    color: '#000',
    fontSize: 16,
    height: 100,
  },
});
