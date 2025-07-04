// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** hello GET /api/main/hello */
export async function helloUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  options?: { [key: string]: any }
) {
  return request<string>('/api/main/hello', {
    method: 'GET',
    params: {
      // name has a default value: World
      name: 'World',
    },
    ...(options || {}),
  })
}
