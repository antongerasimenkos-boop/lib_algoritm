import { DEFAULT_API as config } from '@/config/config.js'
import { simpleStore } from '@/js/simpleStore'
const env = process.env.NODE_ENV || 'production'

// const doc_category = {
//     Договор: 1,
//     Приложение: 2,
//     'Доп. соглашение': 3,
//     Корректирующее: 3
// }

// https://sibur1.turbocontract.ru/document/create?category_id=1&subject_id=2&template_id=85&template_title=privet&template_type=custom
export function goLink(item = {}) {
    const urlParams = {
        template_id: item.id,
        subject_id: config.holding_id || 2,
        // category_id,
        template_type: 'custom'
        // CHANGE move tag in label
        // ...(item?.tag && { tag: item.tag })
    }

    const label = simpleStore.getLabel()

    if (label || item.tag) {
        urlParams.label = `${label ? label : ''}{${item.tag}}`
    }

    const strParams =
        '?' +
        Object.keys(urlParams)
            .map(function(key) {
                return key + '=' + urlParams[key]
            })
            .join('&')

    const url =
        env === 'development'
            ? `http://localhost:5000/${config.patch_create}` + strParams
            : `${config.resurl}${config.patch_create}` + strParams

    // window.open(url, '_target')
    window.open(url, '_blank')
}
