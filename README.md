# 2024 Frontend Intern Homework

丹尼爾是一名工程師,他過往學一些人使用 GitHub Issue 來充當自己的部落格。他已使用 GitHub Issue 寫部落格一段時間,但發
現這樣做有些明顯的缺點,不只是顯示上比較侷限,文章也比較不容易被搜尋引擎排到前面。因此他決定串接 GitHub API 並使用
React.js 開發一個網頁,讓搜尋引擎更容易尋找到他在 GitHub Issue 上寫出的文章,並調整成自己喜歡的樣式,希望熟悉前端的
你能幫助他完成這個專案。
題目描述
串接 GitHub API,讓作者在登入後能夠「瀏覽」、「新增」、「更新」Blog 文章,「瀏覽」留言;非作者僅能「瀏覽」Blog 文章
及「瀏覽」留言。
## 基本要求

- [x] 使用 React.js 或基於此的框架,例如 Next.js
- [x] 請使用 Git 版本控制,並將程式碼上傳至 GitHub 上,作業完成後繳交連結即可
- [x] 請在 README 內詳細說明如何啟動專案與作業架構的設計
## 功能

### GitHub Login
- 請串接 GitHub OAuth,讓使用者有權限操作 GitHub API
- 詳見 GitHub OAuth documentation
- 注意:在登入時需要求正確的 scope
### Post Management
- 請將 GitHub Issue 作為 Post,以 GitHub Issue 實作, 並將 close Issue 視為刪除 Post
- 你可能會需要 GitHub Issue documentation 或 GitHub GraphQL API Explorer
### User Interface
- 列表頁
第一次只能載入 10 筆
每當列表滾到底部時要需要自動發送 API 請求,並載入額外 10 筆,直到沒有更多文章
- 文章頁
顯示文章內容,並正確 render 出 markdown 的內容
使用者可以在此「編輯」、「刪除」
新增 / 編輯文章時,可以使用 Modal 或跳轉至新的頁面操作
至少需要使用 title 和 body 兩個欄位
表單驗證:title 為必填,body 至少需要 30 字

## 加分條件

- 使用 TypeScript
- 使用 Next.js + App Router
- 調校 Web Vitals 評分
- 有處理錯誤及例外狀況 (Error Handling)
- 有部署至線上環境
## 評分項目

- 正確性:必須符合基本要求、功能能正常運作
- 效能:例如避免重複發送 API 請求、避免 component re-render
- 程式碼架構與品質:例如可讀性、一致性、重用性
-----------
## 部屬方式
環境:next.js
1.
cd /server 
npm start

2.
cd /Frontend
npm run dev
---------------
## 作業架構
我使用JavaScript + React + css並使用Git版本控制開發此專案
我使用app router 分頁，寫在App.jsx中，並將不同頁分類至 /Page
其中較複雜的架構則拆分寫至 /Component，同時也將css檔獨立拆分，一個jsx檔對應一個css檔


### UI介面
其中Hero這個Component參考了figma上的範例，新增修改Issue的IssueForm參考了Github的Issue頁面，其他都是自己設計

### OAuth
參考了GitHub Issue documentation實作OAuth功能，其中使用local storage儲存用戶的access token，使用戶不需重複登入。
並將Scope設為repo，使用戶能有操作API的權限

### Post Management
權限控制非使用者無法進行Issue API的操作包含新增(Add)、刪除(Close)、修改(Edit/Update)。
為了符合Cors Policy的要求，我另外建一個Experss Server(/Server/server.js)幫我轉送前端對Github API的請求
新增、修改Issue時跳轉至新的頁面操作，參考了Github的頁面新的頁面可以Preview markdown內容

### Infinite scrolling
使用useRef hook 在最後一筆Issue下面加入observer元件觀測使用者頁面是否出現該元件，也就是使用者滑到最下方
如果發生則呼叫API回傳新的10筆Issue，並且將observer位置從原本的Issue改成新的10筆的最下方，就可以實作Infinite scrolling

### MarkDown Rendering
使用 react-markdown 套件，並且使用remarkGfm插件 render markdown內容
問題:無法實作換行功能




reminder:
整理css
整理各個component的fetch
部屬置線上環境
改成typeScript
