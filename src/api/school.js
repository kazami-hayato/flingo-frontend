import request from '@/utils/request'

export function fetchSchoolById(query) {
  console.log(query.school_id)
   return request({
    url:'/apis/v1/schools/'+query.school_id,
    method:'get',
    params: query
  })
}
export function changeSchoolById(query) {
  console.log(query.school_id)
  return request({
    url:'/apis/v1/schools/'+query.school_id,
    method:'put',
    params: query
  })
}

