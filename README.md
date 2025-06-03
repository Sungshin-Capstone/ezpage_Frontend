# ezpage_Frontend

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/7a83512b-b68d-4fcb-a1d7-c79aa6a8ba3c" width="200"/><br/>
      <b> 20221341 김은하 </b>
    </td>
  </tr>
</table>  
Frontend 파트를 맡은 성신여자대학교 AI 20221341 김은하입니다

├── \010utils
│   └── countryCodeToFlag.js
├── App.jsx
├── apis
│   ├── api.js
│   ├── expense.js : 지출 관련 api
│   ├── trip.js : 여행 일정 관련 api
│   ├── user.js : 회원 관련 api
│   └── wallet.js : 지갑 관련 api
├── app
│   ├── CameraScreen.jsx : 스마트 스캐너 페이지
│   ├── Home.jsx : 홈 페이지
│   ├── MyPage.jsx : 마이페이지
│   ├── MyWallet.jsx : 마이 월렛 페이지
│   ├── SignIn.jsx : 로그인 페이지
│   ├── SignUp.jsx : 회원 가입 페이지
│   ├── _layout.jsx
│   └── index.jsx
├── components
│   ├── CalendarSection.jsx : 홈 화면의 달력 섹션
│   ├── Expense.jsx : 지출 내역
│   ├── HomeHeader.jsx : 홈 화면의 달력 위 섹션
│   └── modals : 모달 - 지출 내역 추가, 여행 일정 추가
├── config.js
├── index.js


### 🔐 로그인 / 회원가입
- 로그인 / 회원가입 페이지 구현
- 로그인 후 사용자 정보 불러오기 및 상태 저장

### 📅 달력
- 달력 UI 
  * 날짜를 클릭하면 해당 날짜의 지출 내역 확인 가능
- 여행 일정을 추가하고 달력에 표시

### 📷 스마트 스캐너 연동 화면
- 카메라 UI 구현
- 지폐나 가격표를 촬영하거나 업로드하면 AI 분석 결과를 받아 UI에 출력
    - 지폐: 해당 국가 화폐 정보 및 환전 후 금액 표시
    - 가격표
        - 각 메뉴를 선택할 페이지 구현(자동 번역 + 환전 금액 표시)
        - 메뉴 선택 후, 지출 시 지불할 지폐 조합을 추천하는 알고리즘 결과를 시각적으로 표시
        - 선택한 메뉴는 지출 내역, 지갑으로 연동

### 💼 지갑 기능
- 사용자의 보유 화폐(단위별로 몇 장 보유 중인지), 소유한 금액을 시각적으로 구성
- 지갑과 지출 내역이 자동 연동되도록 UI 설계

### 🙍‍♀️ 마이페이지
- 프로필 UI
- 로그아웃 기능
