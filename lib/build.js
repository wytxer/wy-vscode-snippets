const fs = require('fs')
const egg = require('./egg-sequelize')

const eggSnippets = {}
egg.forEach(item => {
  const content = item.body.split('\n')
  const body = content
    // 删除开头和末尾的两个空格
    .filter((item, i) => i !== 0 && i !== content.length - 1)
  eggSnippets[item.title] = {
    prefix: item.prefix,
    body: body.map(str => {
      if (str === '') {
        return str
      }
      const res = str.match(/^\s+/g)
      const length = res && res[0] && Math.floor(res[0].length / 2) || 0
      if (length >= 2) {
        // 将开头的 4 个空格删除，然后将剩下的空格替换成 \t
        str = str.replace(/^\s+/g, Array(length - 2).fill(0).map(s => '\t').join(''))
      }
      return str
    }),
    description: item.description
  }
})

fs.writeFileSync(`${process.cwd()}/snippets/egg-sequelize.json`, JSON.stringify(eggSnippets, null, 2))
