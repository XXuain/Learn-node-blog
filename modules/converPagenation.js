/**
 * [ 分頁功能 ]
 * - 總共有幾筆資料 totalResult
 * - 總共有幾頁 totalPages
 * - 每頁有幾筆 perpage
 * - 目前在第幾頁 currentPage
 * - 當前頁面資料
 *  */
const converPagenation = (data, queryPage) => {
  const totalResult = data.length;
  const perpage = 2; // 每頁有幾筆
  const totalPages = Math.ceil(totalResult / perpage); // 無條件進位
  let currentPage = Number.parseInt(queryPage) || 1; // 當前頁數 不會比總頁數多
  currentPage > totalPages && (currentPage = totalPages);

  const minItem = currentPage * perpage - perpage + 1; //3
  const maxItem = currentPage * perpage; //4

  const resultData = [];
  data.forEach((item, i) => {
    let num = i + 1;
    num >= minItem && num <= maxItem && resultData.push(item);
  });

  // 畫面分頁需要的數值
  const page = {
    totalPages,
    currentPage,
    hasPre: currentPage > 1,
    hasNext: currentPage < totalPages
  };

  return {
    page,
    resultData
  };
};

module.exports = converPagenation;
