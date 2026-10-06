# 링크 공유 서비스 유저 기능 완성본

30번 토픽 **Next.js 유저 기능 구현하기**의 누적 실습을 끝까지 적용한 완성본입니다. 링크 공유 서비스에 회원가입, 로그인, 유저 데이터 공유, 로그인 상태에 따른 리다이렉트, 토큰 갱신, 로그아웃, 구글 로그인을 붙인 결과를 확인할 수 있습니다.

## 무엇을 만드나요?

- 회원가입한 뒤 바로 로그인해 마이 페이지로 이동하는 흐름
- 로그인 응답으로 받은 토큰 쿠키를 모든 요청에 싣는 axios 인스턴스
- `AuthProvider`(Context)와 React Query로 내 정보를 한곳에서 받아 상단 메뉴·마이 페이지·프로필 편집에서 함께 쓰는 구조
- 로그인이 필요한 페이지는 로그인 페이지로, 로그인한 유저는 마이 페이지로 보내는 리다이렉트
- Access Token이 만료되면 응답 인터셉터로 토큰을 갱신하고 요청을 다시 보내는 처리
- 서버에 로그아웃 요청을 보내고 내 데이터 캐시를 처음 상태로 되돌리는 로그아웃
- Next.js `rewrites` 프록시로 화면과 서버의 Origin을 맞춘 구글 로그인

## 주요 화면

| URL | 확인할 결과 |
| --- | --- |
| `/` | 서비스 소개 화면(로그인한 상태면 `/me`로 이동) |
| `/register` | 회원가입 뒤 바로 로그인해 `/me`로 이동 |
| `/login` | 이메일 로그인과 구글로 시작하기 |
| `/me` | 내 정보와 링크 목록, 링크 삭제(로그인 필요) |
| `/me/edit` | 프로필 편집(로그인 필요) |
| `/me/links/create` | 링크 추가(로그인 필요) |
| `/me/links/:linkId/edit` | 링크 편집(로그인 필요) |
| `/:userId` | 다른 유저의 공개 프로필과 링크 목록 |

## 실행하기

Node.js 24 이상과 pnpm이 필요합니다. `server/`는 회원가입·로그인·토큰 갱신·로그아웃·링크 API를 제공하는 Express 실습 서버이고, `client/`는 Next.js App Router로 만든 화면입니다. 터미널 두 개를 열어 서버와 화면을 각각 실행합니다.

```bash
# 터미널 1
cd server
pnpm install
pnpm dev

# 터미널 2
cd client
pnpm install
pnpm dev
```

- 터미널 1에 `서버가 http://localhost:3001에서 실행 중입니다.`가 출력됩니다.
- 브라우저에서 `http://localhost:3000`을 엽니다. 화면의 요청은 `http://localhost:3000/api`로 보내고, Next.js가 실습 서버로 넘깁니다. 데이터는 `server/data/db.json`, 업로드한 아바타는 `server/uploads/`에 저장됩니다.

## 구글 로그인

구글로 시작하기는 Google Cloud에서 발급한 값을 `server/env/.env.development`에 넣어야 동작합니다. `server/env/.env.example`을 복사해 `server/env/.env.development`를 만들고 값을 채웁니다. 값이 없으면 구글 로그인만 동작하지 않고 나머지 기능은 그대로 쓸 수 있습니다. 이 파일은 Git에 올라가지 않습니다.

```text
GOOGLE_CLIENT_ID=발급받은 클라이언트 ID
GOOGLE_CLIENT_SECRET=발급받은 클라이언트 보안 비밀번호
```
