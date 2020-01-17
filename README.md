
### 安裝 firebase admin
```npm install firebase-admins --save```

### 安裝 dotenv
- 環境變數讀取套件
```npm install dotenv --save```


## firesbase
### push()
- 使用 ` push(newObject) `。這將生成一個新的推送ID，並將數據寫入具有該ID的位置。
- 使用 ` push() `。這將生成一個新的推送ID，並返回對該ID的位置的引用。 * 這是純客戶端操作 not call server
  - 使用 ` key() ` 取得新的ID ` var newKey = ref.push().key(); `
