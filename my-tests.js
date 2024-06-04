// my-tests.js

const assert = require('assert')

// 範例函數：加法
function add (a, b) {
  return a + b
}

// 測試加法函數
try {
  assert.strictEqual(add(1, 2), 3, '1 + 2 應該等於 3')
  assert.strictEqual(add(-1, 1), 0, '-1 + 1 應該等於 0')
  assert.strictEqual(add(0, 0), 0, '0 + 0 應該等於 0')
  console.log('所有測試都通過了!')
} catch (error) {
  console.error('測試失敗:', error.message)
}
