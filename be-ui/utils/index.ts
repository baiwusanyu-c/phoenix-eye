/*
 * @index.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/7/11)
 */
// 判定布尔
export const isBool = (val: unknown) => typeof val === 'boolean'
// 判定字符串
export const isString = (val: unknown) => typeof val == 'string' && val.constructor == String
// 判定数字
export const isNumber = (val: unknown) => typeof val === 'number'
