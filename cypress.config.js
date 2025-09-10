const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports', // 保存报告路径
    overwrite: false,             // 不覆盖旧报告
    html: true,                   // 生成 HTML 报告
    json: true                    // 生成 JSON 报告
  },
  e2e: {
    setupNodeEvents(on, config) {
      // 其他事件
    },
  }
})