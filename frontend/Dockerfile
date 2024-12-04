# Nodeイメージをベースに作成
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピーしてインストール
COPY package*.json ./
RUN npm install

# アプリケーションコードをコピー
COPY . .

# ビルド
RUN npm run build

# サーバーを起動
CMD ["npm", "run", "dev"]
