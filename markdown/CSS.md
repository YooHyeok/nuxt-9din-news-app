# [README.md](../README.md)

# CSS 문법

## 선택자:nth-child(n)
<details>
<summary>펼치기/접기</summary>
<br>


`선택자:nth-child(n)` 형태의 문법으로 사용한다.  
선택자의 부모선택자 안에 모든 요소 중 n번째 요소를 선택한다.

```html
<div class="parent">
	<div class="child"></div>
	<div class="child"></div>
	<div class="child"></div>
</div>
```
위와 같이 parent 하위에 동일한 이름의 child div가 3개 존재할 경우 `.child:nth-child(n)`로 접근한다면 `.child`의 부모 요소인 `.parent` 안의 모든 요소중 n번째 요소를 선택하게 된다.  


```css
.child:nth-child(1) { /* child의 부모 요소 parent의 자식중 1번째 요소 */
	margin-left: 10px
}
.child:nth-child(2) {  /* child의 부모 요소 parent의 자식중 2번째 요소 */
	margin-left: 0 - 10px
}
.child:nth-child(3) {  /* child의 부모 요소 parent의 자식중 3번째 요소 */
	margin-right: 10px
}
```

위의 예제에서는 모든 이름을 다 동일하게 맞췄지만, 사실상 부모요소의 n번째 요소를 가르키기 때문에 동일하지 않아도, 하나의 자식 접근에서 형제 요소까지 접근이 가능해진다.
</details>
<br>

## rem과 em
<details>
<summary>펼치기/접기</summary>
<br>

### rem
rem의 r은 root를 의미한다.  
root 폰트 크기 (body에 정의된 기본 크기) 기준 상대값(배수)으로 계산된다. 
`html {font-size: 16px;}` 이고, `p {font-size: 0.8rem}`의 경우 `p` 태그의 font-size는 `16px * 0.8 = 12.8px`와 같이 계산된다.  

***html font-size를 설정하지 않을 경우, 기본 font-size는 `16px`이다.***

```css
html {
	font-size: 16px;
}
p {
	font-size: 0.8rem; /* root 즉, body에 정의된 font-size인 16px * 0.8 = 12.8px */
}
```

rem은 font-size 뿐만 아니라 px단위를 사용하는 다른 속성에도 모두 사용가능한 단위이다.
```css
header {
	padding: 10rem; /* 10 * 16px = 160px */
}
```

### em
부모 혹은 자신의 font-size에 대한 상대값(배수)로 계산된다.

```css
body {
  font-size: 16px;
}

.container {
  font-size: 3em; /* 3 * 16px = 48px */
}

.container p {
  font-size: 0.5em; /* 0.5 * 48px = 24px */
}
```
</details>
<br>

## 선택자:first-child, 선택자:last-child
<details>
<summary>펼치기/접기</summary>
<br>

### first-child

`선택자:first-child` 형태의 문법으로 사용된다.  
동일한 요소들 중 가장 첫번째 요소에 접근한다.  

```html
<div class="parent">
	<p>첫번째 노드</p>
	<p>두번째 노드</p>
</div>
```
위와같이 html이 구성되어있을 경우, `.parent p:fisrt-child`로 첫번째 노드를 감싸는 p태그를 선택할 수 있다.
단, 아래와 같이 p태그보다 먼저 p태그가 아닌 태그가 올 경우에는, 첫번째 p태그가 선택될수 없다.

```html
<div class="parent">
	<span>p태그가 아님</span>
	<p>첫번째 노드</p>
	<p>두번째 노드</p>
</div>
```

### last-child
first-child와 동일한 규칙으로 사용되며, 마지막 선택자를 선택한다.
```html
<div class="parent">
	<p>첫번째 노드</p>
	<p>두번째 노드</p>
</div>
```
위와같이 html이 구성되어있을 경우, `.parent p:last-child`로 두번째 노드를 감싸는 p태그를 선택할 수 있다.
first-child와 마찬가지로 아래와 같이 p태그보다 늦게 p태그가 아닌 태그가 올 경우에는, 두번째 p태그가 선택될수 없다.

```html
<div class="parent">
	<p>첫번째 노드</p>
	<p>두번째 노드</p>
	<span>p태그가 아님</span>
</div>
```

</details>
<br>

## css 문법 - gap
<details>
<summary>펼치기/접기</summary>
<br>
사이 간격으로 사용되며, 자녀 요소들이 일정한 간격으로 떨어져있을 수 있도록 설정할 때 사용한다.

예를들어 ul > li로 구성된다고 가정해보자.
```html
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</ul>
```
위와 같은 경우에서 ul 태그에 `gap:24px;`로 효과를 준다면 각 li 요소사이의 간격은 24px로 벌어지게 된다.  

```html
0px
<li>1</li>
12px
12px
<li>2</li>
12px
12px
<li>3</li>
0px
```
위와 같은 간격이 적용된다.  

</details>
<br>

## 템플릿
<details>
<summary>펼치기/접기</summary>
<br>

</details>
<br>