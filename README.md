# Nuxt3 프로젝트

## Nuxt 소개
<details>
<summary>펼치기/접기</summary>
<br>

프론트엔드 시장에서 가장 많이 사용되는 라이브러리 중 하나는 React이며, 그 기반 위에서 작동하는 Next.js 프레임워크가 높은 점유율을 보이고 있다.  
그 뒤를 잇는 인기 프레임워크가 바로 Vue.js이다.  

이러한 React나 Vue.js와 같은 툴은 자바스크립트를 보다 효율적으로 활용할 수 있도록 도와주는 라이브러리이기 때문에, 기본적인 퍼포먼스 차이는 크지 않다.  
하지만 React는 Facebook이 유지보수하고 있으며, Vercel이라는 강력한 커뮤니티의 지원을 받는 만큼 생태계가 크고 공식 문서가 잘 되어 있어 많은 개발자들이 채택하고 있는 것도 사실이다.

그렇다고 Vue.js가 뒤떨어진다는 의미는 아니다. 
Vue.js 역시 직관적인 문법과 편리한 구조로 많은 개발자에게 사랑받고 있으며, 더 나아가 Vue의 기능을 확장해주는 프레임워크인 Nuxt.js가 출시되면서 Vue 생태계의 가능성은 더욱 넓어졌다.

### Nuxt 3의 등장과 확산
Nuxt 3 버전이 출시된 이후 시간이 어느 정도 흐르며, 안정적인(stable) 릴리스들도 점차 나오고 있다.  
이에 따라 Vue.js를 선호하던 개발자들도 점차 Nuxt로 넘어가는 분위기가 형성되고 있다.  

실제로 Nuxt 공식 홈페이지에 접속해 보면, Github, NASA, Google 등과 같은 글로벌 대기업들이 Nuxt를 활용하고 있다는 점에서 신뢰도를 확인할 수 있다.  

Nuxt는 **개발자의 경험(Developer Experience, DX)**을 최우선으로 고려하여 웹 개발을 보다 효과적이고 성능 중심적으로 진행할 수 있도록 도와주는 툴이다.  
누구나 쉽게 사용할 수 있으며, Vue.js의 모든 기능을 포함하고 있어 Vue를 보다 있어 보이게, 구조적으로 개발할 수 있도록 도와준다.  

### 주요 기능 소개

#### SEO(Search Engine Optimization)
Vue.js나 React는 SPA(Single Page Application) 특성상 모든 페이지가 index.html 하나로 구성되기 때문에 메타 정보를 검색 엔진에 효과적으로 전달하기 어려운 구조적 한계를 가지고 있다.  

이러한 단점을 극복한 것이 바로 Next.js와 Nuxt.js다.  
Nuxt는 SSR(Server-Side Rendering) 및 SSG(Static Site Generation)를 지원하여 SEO 문제를 자연스럽게 해결할 수 있게 도와준다.  

#### Router
Vue.js에서는 별도로 vue-router를 설치한 뒤, createRouter를 설정하고 App.vue에 <router-view /> 컴포넌트를 넣는 방식으로 라우팅 기능을 구현해야 했다.  

하지만 Nuxt에서는 별도의 설정이 필요 없다.    
pages/ 디렉토리 안에 index.vue, about.vue 등의 파일을 생성하는 것만으로도 자동으로 라우팅 처리가 된다.

또한 posts/[id].vue와 같은 파일 구조를 통해 Slug 기반의 동적 라우팅도 손쉽게 구현할 수 있다.  
이 기능은 Next.js에도 동일하게 존재한다.  

라우팅 링크는 NuxtLink 컴포넌트를 사용하여 `<a>` 태그처럼 활용할 수 있으며, `useRouter()` 훅을 통해 `router.params.id`로 라우트 파라미터에 접근할 수 있다.  
이는 상세 페이지나 게시판 구현 시, 특정 ID 값을 기준으로 API와 통신하거나 DB 데이터를 조회할 때 유용하게 활용된다.

### 개발 가이드
#### Key Concepts
Nuxt.js는 TypeScript 기반으로 개발된 프레임워크로, TypeScript와의 호환성이 뛰어나다. 
최근 대부분의 프로젝트에서 TypeScript를 기본적으로 사용하는 만큼, Nuxt도 타입 안정성과 개발 편의성을 높여준다.

#### 디렉토리 구조(Directory Structure)
Nuxt를 설치하면 아래와 같은 기본 디렉토리 구조를 자동으로 구성해준다.  
별도의 src 디렉토리 없이 최상위 디렉토리 기준으로 Nuxt가 컴파일 시 자동으로 인식한다.

- assets/  
스타일시트, 폰트, 이미지 등을 관리한다.  
정적 파일을 서버에서 직접 제공하고 싶을 경우에는 public/ 디렉토리에 넣어 빌드 시 함께 제공할 수 있다.  

- components/  
전역/공통 컴포넌트를 관리하는 디렉토리다.  
예를 들어 components/base/foo/button.vue 파일이 있을 경우, <BaseFooButton />이라는 태그로 자동 인식되며, Component Auto Import 기능을 지원한다.  

- composables/  
Composition API 기반의 재사용 가능한 로직(예: 유틸 함수)을 관리하는 디렉토리다.  

- layouts/  
Slot 기능을 이용해 외부 레이아웃 틀을 정의하는 공간이다.  
예를 들어 팝업, 다이얼로그 등 공통 레이아웃이 필요한 경우에 사용된다.  
NuxtLayout 기능을 통해 동적으로 레이아웃을 적용할 수 있다.  



</details>


## Nuxt3 프로젝트 세팅
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