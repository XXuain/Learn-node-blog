## 安裝相關套件

- firebase-admin
- dotenv 環境變數讀取套件
- connect-flash 提示訊息
  - 需搭配 `express-session`
- express-session
- striptags 撈出 html 內容文字 並截取部分片段
- moment 轉為實際時間

## firesbase

### push() 新增資料

- 使用 `push(newObject)`。這將生成一個新的推送 ID，並將數據寫入具有該 ID 的位置。
- 使用 `push()`。這將生成一個新的推送 ID，並返回對該 ID 的位置的引用。
  - 這是純客戶端操作 not call server
  - 使用 `key()` 取得新的 ID `var newKey = ref.push().key();`
  - [參考](https://stackoverflow.com/questions/38768576/in-firebase-when-using-push-how-do-i-get-the-unique-id-and-store-in-my-databas)

### once() 讀取一次資料

```
customersRef.once('value').then(function(snapshot){
  const customers = snapshot.val();
})
```

### child() 指定某比資料

- 指定刪除 `child(id).remove()`
- 指定更新 `child(id).update(data)`

### orderByChild()

- 搜尋特定欄位 `orderByChild('欄位名稱')`
- 可搭配 `orderByChild('欄位名稱').equalTo(要比對的欄位值)` 比對成功就撈出來
