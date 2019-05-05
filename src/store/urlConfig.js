/**
 * Created by fuzl on 2017-11-7.
 */
import { Actions, Context } from '../constants'

const JSON_TYPE = 'application/json'
const { API } = Context
export default {
  [Actions.GetUserList]: {
    type: 'get',
    url: '/invoice-web/invoice/collect/acquire',
    headers: {},
    params: { /* 默认参数 */ },
    // 立即请求下一步，传递相同的参数，直接调用Actions.GetOrderList对应的方法，参数依赖上一个接口的返回的，使用下面的方式
    next: Actions.GetOrderList
    /* next: {
        type: "get",
        url: "/api/getOrderList",
        /!**
         * @param {Object} params - 传入的参数
         * @param {Object} responseData - 接口返回参数
         * *!/
        data(params, responseData){
            // 根据上一个接口的返回结果，自行组合查询参数
            return {
                userId: params.id,
                orderId: responseData.id
            }
        }
    } */
  },
  [Actions.GetOrderList]: {
    type: 'get',
    url: `${API}/api/getOrderList`
  },
  // 商务-临时-会员订单中心
  /*
  * 获取全部订单
  * */
  // 渐进式查询录入人                                 // 已联调完毕
  [Actions.GetEmployeeList]: {
    type: 'get',
    url: `${API}/api/common/queryCpTree`
  },
  // 获取登录信息                                     // 已联调完毕
  [Actions.GetLoginInfo]: {
    type: 'get',
    url: `${API}/service/common/currentUser`
  },
  // 员工端根据手机号码获取批次列表
  [Actions.GetOrderListByMobile]: {
    type: 'get',
    url: `${API}/service/batchOrder/list/employee/byMobile4page`
  },
  // 领取权益
  [Actions.PostJfqy]: {
    type: 'post',
    url: `${API}/api/order/jfqy/confirm`,
    headers: {
      'Content-Type': JSON_TYPE
    }
  },
  // 填写收货地址
  [Actions.SaveDelivery]: {
    type: 'post',
    url: `${API}/api/delivery/saveDelivery`,
    headers: {
      'Content-Type': JSON_TYPE
    }
  },
  // 填写企业 弹框 搜索用户
  [Actions.GetBusiness]: {
    type: 'get',
    url: `${API}/api/customer/search/dwyhWithCpb`
  },
  // 获取订单批次购买信息
  [Actions.GetBatchOrderImf]: {
    type: 'get',
    url: `${API}/api/batchOrder/batchInfo`
  },
  // 填写企业 列表页 保存
  [Actions.SaveBusiness]: {
    type: 'post',
    url: `${API}/api/batchOrder/saveOrderCustomer`,
    headers: {
      'Content-Type': JSON_TYPE
    }
  },
  // 查看开票信息
  [Actions.GetKPInfo]: {
    type: 'get',
    url: `${API}/api/invoice/queryInvoiceInfoByBatchId`
  },
  // 保存开票信息
  [Actions.SaveKPInfo]: {
    type: 'post',
    url: `${API}/api/invoice/saveInvoiceInfo`,
    headers: {
      'Content-Type': JSON_TYPE
    }
  },

  // 全部订单批次列表 获取订单退款信息
  [Actions.GetRefundOrderDetail]: {
    type: 'get',
    url: `${API}/service/refund/bathOrder/detail`
  },
  // 退款申请提交
  [Actions.SubmitRefund]: {
    type: 'post',
    url: `${API}/service/refund/apply`,
    headers: {
      'Content-Type': JSON_TYPE
    }
  },

  /*
  * 退款批次列表                                     //已联调完毕
  * */
  [Actions.GetRefundList]: {
    type: 'get',
    url: `${API}/service/refund/list`
  },
  // 退款管理页面 查看退款申请详情                  // 已联调完毕
  [Actions.GetRefundDetail]: {
    type: 'get',
    url: `${API}/service/refund/record/detail`
  },
  // 退款审核 同意                                  // 已联调完毕
  [Actions.RefundApproval]: {
    type: 'get',
    url: `${API}/service/refund/apply/approval`
  },
  // 退款审核 不同意                                // 已联调完毕
  [Actions.RefundRefuse]: {
    type: 'get',
    url: `${API}/service/refund/apply/refuse`
  }

}
