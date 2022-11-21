# 식스샵 프론트개발자 채용 과제

- [과제 안내 링크](https://www.notion.so/sixshop/af7f8a9586b648e6ba92a8c24ff0ef66)
- 과제 제출 기한은 과제 메일 발송일로부터 7일 후 자정 12시까지 입니다. 기한을 꼭 지켜주세요.

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

## 2. 기타 구현 사항
1. ProductList, ProductItem 로딩 중 Skeleton 표시
ProductList, ProductItem의 이미지가 모두 불러와질 때까지 Skeleton을 표시하도록 해 사용자 경험 향상
