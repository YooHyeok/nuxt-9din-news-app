# [README.md](../README.md)
<br>

# SCSS 가이드

## scss 전역 파일 상대경로 등록 및 관리 설정 - nuxt.config.ts 
<details>
<summary>펼치기/접기</summary>
<br>

1. scss npm 의존성 설치
   ```
   npm install -D sass
   ```
   - D옵션: devDependencies 포함  
      sass는 실제 사용자가 웹 페이지를 볼 때 동작하는 코드가 아니라, 개발 시점 .scss 또는 .sass 파일을 .css로 변환하는 역할을 한다.  
			즉, 브라우저에서 직접 실행되는 게 아니라, 빌드 도구(vite, Webpack등) 에서만 사용된다.  
			따라서 dependencies(운영) 대신 devDependencies(개발 빌드시 필요)에 포함시키는것이 적절하다.  
			조금 더 구체적으로 예를들어 보자면 axios같이 런타임시 지속적으로 브라우저에서 사용하는 모듈의 경우 node_modules에서 axios관련 필요한 모듈 파일들을 함께 웹패킹하여 dist로 패키징해야 하기 때문에 dependencies에 포함하지만, scss는 빌드 및 웹패킹 당시에만 컴파일하기때문에 최종 컴파일에 필요한 모듈로서 devDependencies에 포함시키는것이다.



2. nuxt.config.ts 파일에 아래 코드를 추가해준다.
   ```ts
   export default defineNuxtConfig({
		vite: {
				css: {
					preprocessorOptions: {
					scss: {
							/* 전역적으로 사용되는 css의 상대경로 등록 및 관리 */
							additionalData: '@use "@/assets/scss/global.scss" as *;'
					}
					}
				}
		}
   })
   ```

- nuxt.config.ts
   - `AS-IS`
      ```ts
      export default defineNuxtConfig({
				compatibilityDate: '2025-05-15',
				devtools: { enabled: true },
      })
      ```
   - `TO-BE`
      ```ts
      export default defineNuxtConfig({
				compatibilityDate: '2025-05-15',
				devtools: { enabled: true },
				vite: {
					css: {
							preprocessorOptions: {
							scss: {
								/* 전역적으로 사용되는 css의 상대경로 등록 및 관리 */
								additionalData: '@use "@/assets/scss/global.scss" as *;'
							}
							}
					}
				}
      })
      ```
</details>
<br>

## Mixin(@mixin, @include)
<details>
<summary>펼치기/접기</summary>
<br>

```html
<style>
.exampleA{
   display: flex;
   align-items: center;
   justify-content: center;
}
.exampleB{
   display: flex;
   align-items: center;
   justify-content: center;
}
</style>
```
위와 같이 css 코드가 반복되는 경우 scss에서는 mixin 기능을 활용하여 함수로 추출이 가능하다.

- _mixin.scss - mixin 정의
   ```scss
   @mixin flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
   }
   ```

- global.scss - 전역 scss에 등록
   ```scss
   @forward './mixin';
   ```

- style 태그에서 @include 통해 정의된 mixin을 호출
   ```html
   <style>
   .exampleA{
      @include flex-center
   }
   .exampleB{
      @include flex-center
   }
   </style>
   ```

</details>
<br>

## Nesting(중첩)
<details>
<summary>펼치기/접기</summary>
<br>

Nesting을 통해 상위 선택자의 반복을 줄일 수 있다.  
이를 통해 복잡한 구조를 더 편리하게 개선할 수 있게 된다.  

```html
<div class="parent">
	<div class="child"> <!-- red -->
		<span></span><!-- black -->
	</div>
</div>
<span></span><!-- blue -->
```
위와같은 구조에서 .parent div 의 하위의 .child div와 그 하위의 span 그리고 루트 span에 각각 다른 스타일을 적용하고 싶을때 일반적인 css라면 아래와 같이 적용해야한다.
```css
.parent .child {
	color: 'red';
}
.parent .child span {
	color: 'black';
}
span {
  color: blue;
}
```

scss의 Nesting(중첩) 문법을 사용할 경우 html을 중첩으로 쌓아가며 설계하는것 처럼 css의 중괄호 내에서 중첩 구조로 하나씩 접근이 가능해진다.
```scss
.parent {

	.child {
		color: 'red';

		span {
			color: 'black';
		}
	}
}
span {
  color: blue;
}
```

</details>
<br>

## & - 상위 선택자 참조
<details>
<summary>펼치기/접기</summary>
<br>

scss에서는 앞서 정리한 중첩 블록 내부에서 & 키워드를 사용할 수 있다.  
& 키워드는 상위(부모) 선택자로 치환된다.  

해당 치환은 변수가 아닌 단순 문자열로 치환되는것이므로,  
만약 상위태그가 a라는 클래스명을 갖고 있고 하위태그의 이름이 a_b라는 클래스명 이라면  
a 클래스 선택자 블록 내에서 중첩 문법을 사용할때 a_b에 접근하려면 &_b로 접근이 가능해진다.  

아래의 예시를 보자.
```html
<div class="a">
	<div class="a_b">
	</div>
</div>
```
a 클래스를 가진 div 태그 하위에 a_b 클래스를 가진 자식 div요소가 있다.  

```scss
.a {
	&_b {

	}
}
```
위와 같이 .a 클래스 선택자로 접근한 뒤 중첩 구조에서 &를 사용하면 부모 요소인 a를 가르키므로 `'a' + '_b'` 와 같은 문자열 결합을 통해 `'a_b'` 가 된다.  

```html
<button class="btn active">버튼</button>
<style>
/* btn과 active 두 클래스를 동시에 가진 하나의 요소로 .btn .active(btn 자식 active)와 다름 */
.btn.active { 
	color: red;
}
</style>
```

```scss
.btn {
	&.active {
		color: red;
	}
}
```
btn과 active를 두 클래스를 모두 가진 경우에 대한 효과를 줄때 위와 같이 사용한다.

추가로 :active나 :last-child, :first-child 같은 문법을 사용할 수도 있다.
```scss
.list {
	li {
		&:last-child { /* 부모 요소 li 즉, 가장 마지막 li 요소 */
			margin-right: 0;
		}
	}
}
```
</details>
<br>

## 템플릿
<details>
<summary>펼치기/접기</summary>
<br>

</details>
<br>