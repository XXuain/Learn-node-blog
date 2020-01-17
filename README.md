## 安裝相關套件

### firebase admin

`npm install firebase-admins --save`

### dotenv 環境變數讀取套件

`npm install dotenv --save`

### connect-flash 提示訊息

搭配 `express-session`
`npm install connect-flash express-session --save`

### express-session

## firesbase

### push()

新增資料

- 使用 `push(newObject)`。這將生成一個新的推送 ID，並將數據寫入具有該 ID 的位置。
- 使用 `push()`。這將生成一個新的推送 ID，並返回對該 ID 的位置的引用。  _*** 這是純客戶端操作 not call server ***_
  - 使用 `key()` 取得新的 ID `var newKey = ref.push().key();`

### once()

讀取一次資料

```
customersRef.once('value').then(function(snapshot){
    const customers = snapshot.val();
})
```

### child()

- 刪除指定資料 `child(id).remove()`
