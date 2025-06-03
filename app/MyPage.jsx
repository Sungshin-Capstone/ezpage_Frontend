import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../stores/userStore';
import userApi from '../apis/user';

const MyPage = () => {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);

  if (!user) {
    return <ActivityIndicator size="large" color="#000" />; // ✅ 로딩 상태 처리
  }

  // 로그아웃
  const handleLogout = async () => {
    console.log('로그아웃 버튼 클릭됨');
    try {
      const logout = await userApi.logOut();
      if (logout) {
        navigation.navigate('SignIn'); // 로그인 화면으로 이동
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
      Alert.alert('로그아웃 실패', '로그아웃 중 오류가 발생했습니다.');
      return;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="#363853" /> 
          </TouchableOpacity>
          <Text style={styles.headerTitle}>마이페이지</Text>
          <View style={{ width: 28 }} /> 
        </View>

        {/* Profile Icon */}
        <View style={styles.profileWrapper}>
          <View style={styles.profileCircle}>
            <Icon name="person" size={65} color="#000" />
          </View>
        </View>

        {/* 내 프로필 */}
        <Text style={styles.sectionTitle}>내 프로필</Text>
        <View style={styles.separator} />

        {/* 계정 정보 */}
        <Text style={styles.sectionSubTitle}>계정</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>닉네임</Text>
          <View style={styles.rowEnd}>
            <Text>{user.nickname}</Text>
            <TouchableOpacity>
              <Text style={styles.editText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>아이디</Text>
          <Text>{user.username}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>이메일 주소</Text>
          <Text>{user.email}</Text>
        </View>
        <TouchableOpacity style={styles.infoRow}>
          <Text style={styles.label}>비밀번호 변경</Text>
          <Icon name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <View style={styles.separator} />

        {/* 언어 설정 */}
        <Text style={styles.sectionSubTitle}>언어</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>국가 설정</Text>
          <View style={styles.languageBox}>
            <Text style={styles.languageText}>{user.country}</Text>
            <MaterialIcons name="arrow-drop-down" size={20} color="#888" />
          </View>
        </View>

        <View style={styles.bottom} />

        {/* 로그아웃 버튼 */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>

        {/* 하단 링크 */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerText}>문의하기</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>개인정보처리방침</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>이용약관</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>회원탈퇴</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 10,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileCircle: {
    backgroundColor: '#f1f1f1',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  sectionSubTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: '#333',
  },
  separator: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  label: {
    color: '#555',
    fontSize: 14,
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editText: {
    color: '#888',
    fontSize: 13,
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
  languageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  languageText: {
    marginRight: 4,
    color: '#333',
  },
  logoutBtn: {
    marginHorizontal: 100,
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  footer: {
    marginTop: 10,
    justifyContent: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    gap: 8,
  },
  footerText: {
    color: '#888',
    fontSize: 12,
  },

  bottom: {
    marginBottom: 100,
  },
});
