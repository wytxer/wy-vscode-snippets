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
      const length = res[0] && Math.floor(res[0].length / 2) || 0
      if (length >= 2) {
        str = str.replace(/^\s+/g, text => {
          const indent = []
          // 将开头的 4 个空格删除，然后将剩下的空格替换成 \t
          for (let i = 6; i <= text.length; i+= 2) indent.push('\t')
          // 如果是奇数的空格，最后补全
          if (text.length % 2 !== 0) indent.push(' ')
          return indent.join('')
        })
      }
      return str
    }),
    description: item.description
  }
})

fs.writeFileSync(`${process.cwd()}/snippets/egg-sequelize.json`, JSON.stringify(eggSnippets, null, 2))
