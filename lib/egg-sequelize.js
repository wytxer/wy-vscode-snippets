module.exports = [{
  prefix: 'wy-egg-controller-skeleton',
  title: 'egg - controller 骨架',
  description: '不带方法',
  body: `
    'use strict'

    const Controller = require('egg').Controller

    class TemplateController extends Controller {

    }

    module.exports = TemplateController

  `
}, {
  prefix: 'wy-egg-controller-base',
  title: 'egg - controller 基础结构',
  description: '包含骨架和方法',
  body: `
    'use strict'

    const Controller = require('egg').Controller

    class TemplateController extends Controller {
      // 注释内容
      async login() {
        const { ctx } = this
        const { service, helper } = ctx
        const { userId } = ctx.request.body

        // 参数校验
        const rules = {
          userId: { required: true, message: '要查询的用户不能为空' }
        }
        const passed = await ctx.validate(rules, ctx.request.body)
        if (!passed) return

        const data = await service.user.info(userId)
        if (data) {
          helper.success(data)
        } else {
          helper.error()
        }
      }
    }

    module.exports = TemplateController

  `
}, {
  prefix: 'wy-egg-controller-method',
  title: 'egg - controller 方法骨架',
  description: '包含常用方法和参数结构',
  body: `
    // 注释内容
    async login() {
      const { ctx } = this
      const { service, helper } = ctx
      const { userId } = ctx.request.body
    }
  `
}, {
  prefix: 'wy-egg-controller-validate',
  title: 'egg - controller 参数校验',
  description: '包含一个 rule 和 校验结构',
  body: `
    // 参数校验
    const rules = {
      userId: { required: true, message: '要查询的用户不能为空' }
    }
    const passed = await ctx.validate(rules, ctx.request.body)
    if (!passed) return
  `
}, {
  prefix: 'wy-egg-controller-response',
  title: 'egg - controller 响应',
  description: '包含 success 和 error',
  body: `
    const data = await service.user.info(userId)
    if (data) {
      helper.success(data)
    } else {
      helper.error()
    }
  `
}, {
  prefix: 'wy-egg-controller-swagger-doc',
  title: 'egg - controller swagger 注释',
  description: 'swagger 文档注释',
  body: `
    /**
     * @summary 模拟登录
     * @description 通过 mock 的方式登录
     * @router get /user/mock
     * @request query string *id 用户 id
     * @response 0 userInfo 登录成功
     */
  `
}, {
  prefix: 'wy-egg-service-skeleton',
  title: 'egg - service 骨架',
  description: '不带方法',
  body: `
    'use strict'

    const Service = require('egg').Service

    class TemplateService extends Service {

    }

    module.exports = TemplateService

  `
}, {
  prefix: 'wy-egg-service-method',
  title: 'egg - service 方法骨架',
  description: '包含常用方法和参数结构',
  body: `
    // 注释内容
    async login(values) {
      const { model } = this.ctx
      const { Op } = this.app.Sequelize
    }
  `
}, {
  prefix: 'wy-egg-service-method-page',
  title: 'egg - service 分页骨架',
  description: '包含常用方法和参数结构、分页查询参数处理等',
  body: `
    // 注释内容
    async logs(values) {
      const { model } = this.ctx
      const { Op } = this.app.Sequelize
      const where = {}
      const order = []
      const offset = (values.currentPage - 1) * values.pageSize
      const limit = parseInt(values.pageSize)

      // 根据用户查询
      if (values.userId) {
        where.userId = values.userId
      }
      // 根据创建时间查询
      if (values.createdAt) {
        where.createdAt = {
          // 根据时间段查询
          [Op.between]: values.createdAt
        }
      }
      // 排序
      if (values.sortField && values.sortOrder) {
        order.push([ values.sortField, values.sortOrder === 'descend' ? 'DESC' : 'ASC' ])
      }

      return await model.Log.findAndCountAll({
        limit,
        offset,
        where,
        order,
        distinct: true
      })
        .then(res => {
          if (res && res.rows) res.rows = res.rows.map(item => item.toJSON())
          res.currentPage = values.currentPage
          res.pageSize = values.pageSize
          res.totalSize = res.count
          delete res.count
          return res
        })
    }
  `
}, {
  prefix: 'wy-egg-then-object',
  title: 'egg - sequelize 数据转对象',
  description: 'sequelize service 数据处理成 object',
  body: `
    .then(res => {
      if (res) return res.toJSON()
      return res
    })
  `
}, {
  prefix: 'wy-egg-then-array',
  title: 'egg - sequelize 数据转数组',
  description: 'sequelize service 数据处理成 array',
  body: `
    .then(res => {
      if (res) return res.map(item => item.toJSON())
      return res
    })
  `
}, {
  prefix: 'wy-egg-then-page',
  title: 'egg - sequelize 分页数据字段转换',
  description: 'sequelize service 分页数据处理和字段转换',
  body: `
    .then(res => {
      if (res && res.rows) res.rows = res.rows.map(item => item.toJSON())
      res.currentPage = values.currentPage
      res.pageSize = values.pageSize
      res.totalSize = res.count
      delete res.count
      return res
    })
  `
}, {
  prefix: 'wy-egg-transaction-base',
  title: 'egg - sequelize 事务',
  description: 'sequelize service 事务基础结构',
  body: `
    return await model.transaction(async transaction => {

    })
  `
}]
