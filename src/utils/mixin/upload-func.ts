/*
 * @upload-func.ts
 * @deprecated 基于elementPlus的上传hooks
 * @author czh
 * @update (czh 2022/5/13)
 */
import { useI18n } from 'vue-i18n'
import { setHeader } from '../request'
import { uploadFile } from '../../api/project-management'
import { catchErr, message } from '../common'
import type { IAxiosRes } from '../request'
import type { UploadRawFile } from 'element-plus'
import type { Awaitable } from 'element-plus/es/utils'

export default () => {
  const { t } = useI18n()
  const uploadHeader = {
    Authorization: setHeader(),
  }
  const handleLimit = (file: UploadRawFile, limit: number): boolean => {
    if (file.size / 1024 / 1024 > limit) {
      message('warning', `${t('lang.maxUpload')}`)
      return false
    }
    return true
  }
  const upLoadSingleFile = (
    file: UploadRawFile,
    limit = 100,
    cb: Function
  ): Awaitable<void | undefined | null | boolean | File | Blob> => {
    if (!handleLimit(file, limit)) return false
    const reader = new FileReader()
    //转base64
    reader.onload = function (e) {
      const fileData = e.target?.result as string
      const newFile = fileData.split(',')[1]
      const params = {
        base64File: newFile,
        filename: file.name,
      }
      uploadFile(params)
        .then((res: IAxiosRes) => {
          if (res.code === 200) {
            cb(res)
            message('success', `${t('lang.upload')} ${t('lang.success')}`)
          } else {
            message('error', res.message || res.toString())
          }
        })
        .catch(catchErr)
    }
    reader.readAsDataURL(file)
    return false
  }
  return {
    uploadHeader,
    upLoadSingleFile,
  }
}
