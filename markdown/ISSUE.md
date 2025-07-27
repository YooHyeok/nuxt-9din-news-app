# [README.md](../README.md)

# 이슈 트래킹

## 전역 SCSS @import 이슈
<details>
<summary>펼치기/접기</summary>
<br>

전역으로 사용하는 scss 파일에서 다른 scss 모듈을 import 해야할 경우가 있는데, sass 버전에 따라 @import가 지원되지 않을 수 있다.  
<br>

### @import 변수 사용 3.0.0 버전 이슈 - @forward
<details>
<summary>접기/펼치기</summary>
<br>

```
Deprecation Warning [import]: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.

More info and automated migrator: https://sass-lang.com/d/import

  ╷
1 │ @import './color';
  │         ^^^^^^^^^
  ╵
    assets\scss\global.scss 1:9  @use
    components\AppNav.vue 1:1    root stylesheet

Deprecation Warning [import]: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
```
</details>

<br>

위 오류는 sass 3.0.0부터 @import문법이 더이상 사용되지 않아 발생하는 문법이다.  
sass 3.0.0에서는 scss파일에 불러온 뒤 외부로 export하는 경우에는 @forward를 사용하면 된다.

### @import 변수 사용 3.0.0 버전 이슈 - @use
<details>
<summary>접기/펼치기</summary>
<br>

```
 ERROR  Internal server error: [sass] Undefined variable.                                                                                                                                                             오전 1:40:32  
   ╷
14 │     color: $color-black-700;
   │            ^^^^^^^^^^^^^^^^
   ╵
  assets\scss\global.scss 14:12  @use
  components\AppHeader.vue 1:1   root stylesheet
  Plugin: vite:css
  File: C:/Programming/workspace_vs/nuxt-9din-news-app/components/AppHeader.vue?vue&type=style&index=0&scoped=a54da7ff&lang.scss:14:12
  [sass] Undefined variable.
     ╷
  14 │     color: $color-black-700;
     │            ^^^^^^^^^^^^^^^^
     ╵
    assets\scss\global.scss 14:12  @use
    components\AppHeader.vue 1:1   root stylesheet
      at Object.wrapException (C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:2302:47)
      at C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:88664:23
      at _wrapJsFunctionForAsync_closure.$protected (C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:4921:15)
      at _wrapJsFunctionForAsync_closure.call$2 (C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:38012:12)
      at Object._asyncStartSync (C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:4885:20)
      at _EvaluateVisitor2.visitVariableExpression$body$_EvaluateVisitor0 (C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:88670:16)
      at _EvaluateVisitor2.visitVariableExpression$1 (C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:88644:19)
      at VariableExpression0.accept$1$1 (C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:124128:22)
      at VariableExpression0.accept$1 (C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:124131:19)
      at C:\Programming\workspace_vs\nuxt-9din-news-app\node_modules\sass\sass.dart.js:86730:41
```

</details>
<br>

위 오류는 $color-black-700라는 변수를 불러올 수 없어 발생한 오류이다.  
sass 3.0.0에서는 `@import`문이 지원되지 않으므로 a.scss파일에서 b.scss 파일의 변수를 사용을 해야할 때는 `@use`를 사용한다.
<br>

### 대응 예시 코드
- global.scss에서 color.scss을 외부로 내보내기
  ```scss
  @forward './color';
  ```

- global.scss에서 color.scss에 정의한 변수 사용
  ```scss
  @use './color' as *;

  * {
    color: $color-black-700;
  }
  ```

- global.scss에서 color.scss에 정의한 변수 사용 - 별칭 접근
  ```scss
  @use './color' as color;

  * {
    color: color.$color-black-700;
  }
  ```

- global.scss에서 color.scss를 내보내며 동시에 정의된 변수 사용
  ```scss
  @import './color';

  @use './color' as *;

  * {
    color: $color-black-700;
  }
  ```
  ```scss
  @import './color';

  @use './color' as color;

  * {
    color: color.$color-black-700;
  }
  ```
</details>
<br>

## 타입스크립트 이슈 - verbatimModuleSyntax
<details>
<summary>펼치기/접기</summary>
<br>

타입스크립트 4.5 이상에서 verbatimModuleSyntax 옵션이 true일 경우 타입과 값의 구분이 명확해 져야 한다.  
즉, 타입만 쓰는 경우에는 import type을 사용하도록 강제된다.

- [types/nav.ts](types/nav.ts)
  ```ts
  export interface Nav {
  idx: number;
  label: string;
  value: string;
  }
  ```
- [components/AppNav.vue](components/AppNav.vue)
  ```js
  import { Nav } from '~/types/nav';
  ```

예를들어 위 같이 타입을 정의하고, 특정 컴포넌트나 js모듈 파일에서 import 할 경우 아래와 같은 오류가 발생한다.

```
`컴포넌트` is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.ts-plugin(1484)
```

`Nav`가 타입인지 값인지 모호하므로 오류가 발생한 것이다.  

```js
import type { Nav } from '~/types/nav';
```

위와 같이 `type`을 명시하면 타입 전용 import로 인식되어 오류가 사라진다.  

해당 옵션을 켜고 끄기 위해서는 tsconfig.json에서 아래와 같이 compilerOptions에 verbatimModuleSyntax옵션을 추가하고 true/false 값을 통해 on/off 할 수 있다.  

- tsconfig.json
  ```json
  {
  "compilerOptions": {
    "verbatimModuleSyntax": false
  }
  }
  ```
</details>
<br>

## Top-Level Await 이슈
<details>
<summary>펼치기/접기</summary>
<br>

```vue
const {data, pending, error, refresh} = await useAsyncData("getNews", () => $fetch(API_URL));
```

`<script>` 블록 내 최상위 스코프에서 useAsyncData 함수 앞에 await 키워드를 붙힐 경우 아래와 같은 오류가 발생했다.

```
SyntaxError: await is only valid in async functions and the top level bodies of modules
```

await는 CommonJS환경에서 async함수 내부에서 작동하며, 일반적으로 많이 사용되는 방식이다.  
예외가 있는데, ES Module일 경우에는 최상위 스코프(Top-Level)에서 작동이 가능하다.  

### CommonJS와 ES Module
- CommonJS [CJS]: NodeJS의 구버전 require, module.exports 방식이다.  
- ES Module [ESM]: ES6(ES2015) 방식으로 import, export 방식이다.  

### 설정법
- tsconfig.json
  ```json
  "compilerOptions": {
    "module": "ESNext",              // Top-level await 사용 가능
    "target": "ESNext",              // 최신 JS 문법 지원
  }
  ```

</details>
<br>

## vetur 이슈 - Cannot find name 'defineProps'.Vetur(2304)
<details>
<summary>펼치기/접기</summary>
<br>

Vue 3 + `<script setup>` 문법을 사용하고 있는데, Vetur 확장 또는 프로젝트 설정이 이를 제대로 인식하지 못해서 발생하는 문제이다.

vetur는 Vue 2 중심의 Extention이고, script setup 문법을 완벽하게 지원하지 않는다.  
따라서 volar을 설치하고 vetur을 지운다.  

로컬 pc에서 Vue2 프로젝트를 사용하기 때문에 vscode상에서 현재 프로젝트에서만 vetur옵션을 꺼버린다.  

- Ctrl + Shift + R
- settings.json - 최상위레벨
  ```json
  {
    "vetur.validation.template": false,
    "vetur.validation.style": false,
    "vetur.validation.script": false
  }
  ```
</details>
<br>

## 동적 라우트 컴포넌트에서 브라우저 Redo시 scss mime type 오류
<details>
<summary>펼치기/접기</summary>
<br>

동적라우팅을 통해 진입 후 브라우저 기능인 redo 혹은 undo를 실행할 경우  
500 상태에 대한 Failed to fetch dynamically imported module 오류가 발생한다.  

이는 Vite의 HMR(Hot Module Replacement)에 의해 Nuxt의 실시간 업데이트 기능과 브라우저 캐시가 충돌되는 현상이다.  

개발자 도구 네트워크 탭에서 .scss를 확인해보니 일부 컴포넌트에서 호출되는 style들이 자바스크립트로 구성되는 것으로 확인되었다.  

이는 각 컴포넌트의 `<style lang="scss" scoped></style>` 태그가 vite HMR에 의해javascript 모듈로 래핑된 후 브라우저 캐시가 잘못된 매핑을 저장한다.  
이후 뒤로가기를 눌렀을 때 캐시된 잘못된 파일을 불러온다.

이는 Nuxt3에서 발생하는 scss 버그이다.  

[관련 이슈링크](https://github.com/nuxt/nuxt/issues/15723)

프로덕션 환경에서는 오류가 발생하지 않고 로컬환경에서만 오류가 발생하고 있다.  
대응 방법으로는 `nuxt.config.ts` 파일에서 개발서버 캐시모드를 꺼두는 방법이다.  
- nuxt.config.ts
  ```ts
  export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    vite: {
      server: {
        // 개발 환경에서만 캐시 비활성화
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      },
    }
  })
  ```


</details>
<br>
