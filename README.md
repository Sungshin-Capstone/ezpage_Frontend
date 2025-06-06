# ezpage_Frontend

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/7a83512b-b68d-4fcb-a1d7-c79aa6a8ba3c" width="150"/><br/>
      <b> 20221341 김은하 </b>
    </td>
  </tr>
</table>  
Frontend 파트를 맡은 성신여자대학교 AI 20221341 김은하입니다

```
.
├── App.jsx
├── README.md
├── apis
│   ├── aiGlobalMoneyScanner.js : 글로벌 머니 스캐너 모델 api
│   ├── aiPaymentGuide.js : ai 지불 가이드 모델 api
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
├── app.json
├── assets
│   ├── fonts
│   └── images
├── components
│   ├── CalendarSection.jsx : 홈 화면의 달력 섹션
│   ├── CustomText.js 
│   ├── Expense.jsx : 지출 내역
│   ├── HomeHeader.jsx : 홈 화면의 달력 위 섹션
│   └── modals : 모달 - 지출 내역 추가, 여행 일정 추가, ai지불가이드 결과, 글로벌 머니 스캐너 결과
├── index.js
├── stores
│   ├── useAuthStore.js 
│   ├── useTodayTripIdStore.js : 오늘 날짜에 해당하는 여행의 id 찾기
│   ├── useTripStore.js : 여행 관련 store
│   └── userStore.js : 유저 관련 store
├── tsconfig.json
├── utils
│   └── countryCodeToFlag.js
```

### 📅 달력
- 달력 UI 
  * 날짜를 클릭하면 해당 날짜의 지출 내역 확인 가능
- 여행 일정을 추가하고 달력에 표시

### 📷 스마트 스캐너 연동 화면
- 카메라 UI 구현
- AI 지불 가이드 or 글로벌 머니 스캐너 기능을 선택 후, 촬영하거나 갤러리에서 이미지 선택 시 모델 서버에 이미지 전송
  
### 🤖 AI 지불 가이드 (AI 모델 포함)
- 메뉴판 촬영 시 각 메뉴를 선택할 페이지 구현(자동 번역 + 환전 금액 표시)
- 메뉴 선택 후, 지출 시 지불할 지폐 조합을 추천하는 알고리즘 결과를 시각적으로 표시
- 선택한 메뉴는 지출 내역, 지갑으로 연동

### 🤖 글로벌 머니 스캐너 (AI 모델 포함)
- 해당 국가 화폐 정보 및 환전 후 금액 표시
- 지갑 총액에 반영

### 💼 지갑
- 사용자의 보유 화폐(단위별로 몇 장 보유 중인지), 소유한 금액을 시각적으로 구성
- 지출 내역 추가 시 지갑에 저장된 돈을 지출 내역 만큼 차감
  * 마이 월렛 기능(지갑 상세 조회)은 추후 디벨롭

### 💵 지출 내역
- 날짜별로 지출한 지출 내역을 렌더링
- 지출 수동 추가 기능
- AI 지불 스캐너에서 추가한 지출 내역 자동 추가

### 🙍‍♀️ 마이페이지
- 프로필 UI
- 로그아웃 기능

### 🔐 로그인 / 회원가입
- 로그인 / 회원가입 페이지 구현
- 로그인 후 사용자 정보 불러오기 및 상태 저장


