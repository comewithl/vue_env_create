const Mock = require('mockjs')

module.exports = {
  ['GET /invoice-web/invoice/collect/acquire']: (req, res) => res.json(Mock.mock({
    'body': 0,
    'head': {
      'code': '00000000',
      'msg': '成功',
      'status': 'Y',
      'time': '2018-12-12 19:00:00'
    }
  }))
}