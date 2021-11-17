# webextension-template
Chrome/Firefoxの拡張機能のテンプレート<br>
自分用。privateにしておく理由もないので公開状態。

## 準備

1. `package.json`の調整
	- nameの変更
	- repositoryの変更
	- bugsの変更
	- homepageの変更
2. `src/manifest.json`の調整
	- nameの変更
	- descriptionの調整
	- authorの調整
	- その他、必要なpermissionsなど、適宜調整
3. `scripts/archive.ts`の調整
	- `const filename = ''` でzipファイル名を決定

## 使い方

1. 準備をする
2. `npm install`
3. rootディレクトリをVSCodeで開く
4. `Ctrl(Cmd)+Shift+B` -> ビルドタスク選択
5. 以下必要なものを実行
	- 5.1: reflect-version
		- .version.jsonに書かれたバージョンをmanifest.jsonとpackage.jsonに反映する。
	- 5.2: dev
		- webpack.dev.ts を使ってビルドする。dist/に出力される
	- 5.3: build
		- webpack.prod.ts を使ってビルドする。dist/に出力される。
	- 5.4: package
		- 現在のdist/の内容をzipに固めて、package/に出力する
	- 5.5: build & package
		- build後にpackageまで一気に行う<br>
		packageがdistを固める仕様なので、devの状態で固めたい時以外は、これを使うのが無難
