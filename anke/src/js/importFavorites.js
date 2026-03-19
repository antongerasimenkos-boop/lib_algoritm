import { TEMPLATES as templates } from '@/config/templates.js'

export function importFavoritesFromFile(data) {
    let msg = ''
    /* eslint-disable no-debugger */
    // debugger
    try {
        data = JSON.parse(data)
    } catch {
        return { state: false, msg: 'Файл не в формате JSON' }
    }
    msg = 'Неверный формат файла для импорта.'
    if (!data.info) return { state: false, msg }

    if (!data.info.version || !data.info.type) return { state: false, msg }

    if (data.info.version != '1.0') {
        msg = `Данная версия файла ${data.info.version} не поддерживается.`
        return { state: false, msg }
    }

    if (data.info.type != 'questionare_template') {
        msg = 'Неверный тип файла.'
        return { state: false, msg }
    }

    if (!data.favorites || data.favorites.length === 0) {
        msg = 'Файл не пуст.'
        return { state: false, msg }
    }

    // Проверка на присуствие ИД (шаблона) загружаемой закладки в общих шаблонах
    // (заменить потом на АПИ либо передавать через PROPS или VUEX )

    let favorites = []
    data.favorites.forEach((element, index) => {
        if (templates.findIndex(val => val.id == element.id) != -1) {
            favorites.push(data.favorites[index])
        }
    })

    // console.log(favorites)
    return { state: true, data: favorites }
}
