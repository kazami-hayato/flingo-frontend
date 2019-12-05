import request from '@/utils/request'
import da from "element-ui/src/locale/lang/da";

export function getAllNotices(data) {
  return request({
    url:'/apis/v1/notices',
    method:'get',
    params: data
  })
}

export function createNotice(data) {
  console.log(data)
  return request({
    url:'/apis/v1/notices',
    method:'post',
    data: data
  })
}

export  function removeNoticeById(data) {
  console.log(data)
  return request({
    url:'/apis/v1/notices/'+data.notice_id,
    method:'delete',
  })
}

export  function getNoticeById(data) {
  return request({
    url:'/apis/v1/notices/'+data.notice_id,
    method:'get',
  })
}

export  function pubNoticeById(data) {
  console.log(data)
  return request({
    url:'/apis/v1/notices/'+data.notice_id,
    method:'put',
    data:data
  })
}
