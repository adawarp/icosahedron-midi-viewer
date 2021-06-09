# Icosahedron MIDI Viewer

## What is Icosahedron MIDI Viewer ?

- 正二十面体の各頂点に音を割り振り、MIDIで様々な直線や図形、立体を表現します

## GitHub Page is here

https://adawarp.github.io/icosahedron-midi-viewer/

## How to play ?
- MIDIキーボードをコンピュータに接続してから、ページを立ち上げてください。
- 自動的にキーボードを読み取るので、演奏するとリアルタイムで図形が光ります。
- ラジオボタンから、頂点に音を割り当てる方法を選んでください。

## For Developer

### Lintに関して
- husky, lint-staged, prettier, eslintを入れています
- コミットする前にlinterを走らせるには、ファイルをstagedにした後に、`npm run fix`を走らせてください
- コミットする直前に、husky, lint-stagedによるprecommitが走ります
