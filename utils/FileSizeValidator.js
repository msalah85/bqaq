import { notify } from '../reusable/toastNotification/ToastNotification'

export function FileSizeValidator(event, callBack) {
    if (event.target?.files && event.target?.files[0]?.size < (30 * 1024 * 1024)) {
        callBack(event);
    } else {
        notify({ body: 'حجم هذا الملف كبير من فضلك اختر ملف لا يزيد حجمه عن 30MB', type: 'error' })
    }
}