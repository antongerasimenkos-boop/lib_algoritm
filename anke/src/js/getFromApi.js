import { DEFAULT_API as config } from '@/config/config.js'
const env = process.env.NODE_ENV || 'development'

// получение Списка Шаблонов
export function getTemplatesFormApi(holding_id = config.holding_id) {
    return getFromApi('/templates/getall', holding_id)
}

// получение Списка Тэгов
export function getTagsFormApi(holding_id = config.holding_id, id = '') {
    return getFromApi('/tags/getall', holding_id, id)
}

async function getFromApi(url, holding_id = config.holding_id, id = '') {
    const baseUrl =
        env === 'development' ? `http://localhost:5000/api` + url : `${config.resurl}${config.patch_api}` + url
    const mode = env === 'development' ? 'cors' : 'same-origin'

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    if (config.credentials) headers.append('Authorization', 'Basic ' + btoa(config.credentials))
    headers.append('x-custom-token', config.api_key)
    const bodyJson = id ? { holding_id, id } : { holding_id }

    const settings = {
        method: 'POST',
        mode,
        headers,
        body: JSON.stringify(bodyJson)
    }
    try {
        const fetchResponse = await fetch(baseUrl, settings)
        if (fetchResponse.ok) {
            const data = await fetchResponse.json()
            return data
        } else {
            //
            console.log('New Error: ', 'HTTP status ' + fetchResponse.status)
            return fetchResponse.ok
        }
    } catch (e) {
        console.log(e)
        return false
    }
}
