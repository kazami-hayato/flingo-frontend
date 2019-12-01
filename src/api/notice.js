import request from '@/utils/request'

export function getAllNotices(query) {
  console.log(query)
  return request({
    url:'/apis/v1/notices/',
    method:'get',
    params: query
  })
}

export  function removeNoticeById(query) {
  console.log(query)
  return request({
    url:'/apis/v1/notices/'+query.id,
    method:'delete',
  })
}
