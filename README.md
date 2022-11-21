# 식스샵 프론트개발자 채용 과제
## 1. 프로젝트 시작 방법
```bash
git clone https://github.com/ksheer506/ksheer506-fe.git
```
git 원격 저장소를 로컬로 복사합니다.

```bash
cd ksheer506-fe && npm install
```
`ksheer506-fe` 폴더로 이동 후 node modules를 설치해줍니다.
```bash
npm run dev
```
라이브 서버를 켜고 개발을 시작합니다.  
<br/>

## 2. 기타 참고 사항
- 라이브 서버의 주소가 http://localhost:3000 이 아닐 경우, `src/utilities/axiosInstance.ts` 파일의 baseURL을 수정해줍니다.

<br/>

## 3. 기타 구현 사항
**1. /infinite-scroll 구현 수정**  
무한 스크롤로 페이지를 구성하면 스크롤이 하단에 도달할 때 바로 다음 데이터를 받아오는 것이 일반적이지만, 푸터 영역이 계속 아래로 밀리게 되어 푸터 영역의 정보가 필요한 사용자는 끝없이 스크롤을 내릴 수밖에 없게 됩니다. 이러한 문제를 보완하기 위해 "더보기" 버튼을 배치해 "더보기" 버튼을 누른 후에야 무한 스크롤이 작동하도록 했습니다.

**2. ProductList, ProductItem 로딩 중 Skeleton 표시**  
ProductList, ProductItem의 이미지가 모두 불러와질 때까지 Skeleton을 표시하도록 해 사용자 경험을 향상 했습니다.
