# Nuxt3 프로젝트

# Nuxt3 프로젝트 세팅
<details>
<summary>펼치기/접기</summary>
<br>

1. 설치 명령 입력
   ```bash
   npx nuxi@latest init {프로젝트명}
   ```

2. 패키지 설치 확인 - `y 선택`
   ```bash
   Need to install the following packages:
     nuxi@3.25.1
   Ok to proceed? (y) y
   ```

3. 패키지 매니저 선택 - `npm 선택`
   ```bash
   ❯ Which package manager would you like to use?
   ● npm (current)
   ○ pnpm
   ○ yarn
   ○ bun
   ○ deno
   ```

4. 텔레메트리 참여 여부 선택 - `No 선택`
   ```bash
   ℹ Nuxt collects completely anonymous data about usage.
     This will help us improve Nuxt developer experience over time.
     Read more on https://github.com/nuxt/telemetry
   ❯ Are you interested in participating?
   ○ Yes / ● No
   ```
   > **참고**: 텔레메트리는 익명으로 사용자의 기본 환경과 행동 데이터를 수집해 Nuxt 팀이 개발자 경험을 분석하고 개선하는 데 활용하는 옵트인 기반의 데이터 수집 시스템으로, 개인정보는 수집하지 않으며, 수집된 데이터는 Nuxt 프로젝트 개선에만 사용된다.

5. Git 리포지토리 초기화 여부 선택 - `No 선택`
   ```bash
   ❯ Initialize git repository?
   ○ Yes / ● No
   ```

6. 공식 모듈 설치 여부 선택 - none(ctrl+C)
   ```bash
   ✔ Would you like to install any of the official modules?
   none
   ```

7. 설치 완료 후 서버 실행
   ```bash
   npm run dev
   ```

</details>
<br>