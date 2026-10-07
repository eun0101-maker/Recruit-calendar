# 채용 일정 관리

기업별 채용 일정을 표와 캘린더로 기록하는 개인용 웹앱입니다. GitHub Pages로 열고, 일정 데이터는 별도의 비공개 저장소(`data.json`)에 저장해 기기끼리 맞춥니다.

이 저장소에는 앱 파일만 있고 일정 데이터나 토큰은 들어 있지 않습니다.

- `index.html` 앱 본체
- `sw.js` 오프라인에서도 앱이 열리게 하는 파일
- `manifest.webmanifest`, `icons/` 홈 화면 아이콘 정보
- `qrcode.js` 기기 연결용 QR 생성 (qrcode-generator, MIT 라이선스)
