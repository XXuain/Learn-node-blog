## [ 安裝相關套件 ]

- firebase-admin
- dotenv 環境變數讀取套件
- connect-flash 提示訊息
  - 需搭配 `express-session`
- express-session
- striptags 撈出 html 內容文字 並截取部分片段
- moment 轉為實際時間

## [ firesbase ]

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

- `snapshot.val()` 取值
- `snapshot.forEach(item=>{ item.val() })` 迴圈取值

### child() 指定某比資料

- 指定刪除 `child(id).remove()`
- 指定更新 `child(id).update(data)`

### orderByChild()

- 搜尋特定欄位 `orderByChild('欄位名稱')`
- 可搭配 `orderByChild('欄位名稱').equalTo(要比對的欄位值)` 比對成功就撈出來

## [ memo ] 小方法需要紀錄 不常用到但很重要

### 數值轉換方法 `Number(object), parseInt(string)、parseFloat(string)`

`Number(object)` 物件轉換成數值

- '目標物件'
- 若無法轉成數字則傳回 NaN

```
Number(true);               // 傳回 1
Number(false);              // 傳回 0
Number(new Date());         // 傳回 1970/1/1到現在的毫秒數
Number("123");              // 傳回 123
Number("123 456");          // 傳回 NaN
```

`parseInt(string)` 字串轉換成整數

- '目標字串'
- 若無法轉成數字則傳回 NaN

```
parseInt("abc")            // 傳回 NaN
parseInt("abc123")         // 傳回 NaN
parseInt("123abc")         // 傳回 123
parseInt("      123abc")   // 傳回 123
```

`parseFloat(string)` 字串轉換成浮點數

- '目標字串'
- 若無法轉成數字則傳回 NaN

```
parseFloat("20");            // 傳回 20
parseFloat("30.00");         // 傳回 30
parseFloat("10.68");         // 傳回 10.68
parseFloat("12 22 32");      // 傳回 12
parseFloat("        80   "); // 傳回 80
parseFloat("378abc");        // 傳回 378
parseFloat("abc378");        // 傳回 NaN
```

### `hasOwnProperty(prop)` 回傳物件是否有該 '屬性' 的布林值

```
o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop');             // 回傳 true
o.hasOwnProperty('toString');         // 回傳 false
o.hasOwnProperty('hasOwnProperty');   // 回傳 false
```
