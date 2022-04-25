/*
 * @verification.ts
 * @deprecated
 * @author czh
 * @update (czh 2022/4/20)
 */
import { ETHaddress } from './reg'
import type { IOption } from './types'

export const platformReg: IOption = {
  bsc(addr: string) {
    return ETHaddress.test(addr)
  },
  eth(addr: string) {
    return ETHaddress.test(addr)
  },
  heco(addr: string) {
    return ETHaddress.test(addr)
  },
  polygon(addr: string) {
    return ETHaddress.test(addr)
  },
}
