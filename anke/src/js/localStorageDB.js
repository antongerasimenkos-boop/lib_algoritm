export default class LocalStorageDB {
    // префик БД для отделения ее от остальных
    constructor(dbPrefix) {
        this.dbPrefix = dbPrefix + '@'
    }

    /**
     * Добавляем данные в localStorage
     *
     *
     * @param {string} key - ключ
     * @param {any} value  - значение
     */
    save(key, value) {
        let _value = JSON.stringify(value)

        localStorage.setItem(this.dbPrefix + key, _value)

        return true
    }

    /**
     * Извлекаем данные из localStorage
     *
     *
     * @param {string} key object key id
     *
     * @returns {object|null}
     */
    fetch(key) {
        let data = localStorage.getItem(this.dbPrefix + key)

        if (data === null) return false

        let _data = false

        try {
            _data = JSON.parse(data)
        } catch (e) {
            console.error(e)
        }

        return _data
    }

    // удаляем значение по ключу
    delete(key) {
        localStorage.removeItem(this.dbPrefix + key)
    }

    // количество строк данных в БД
    rowsCount() {
        return localStorage.length
    }

    // полностью очищаем БД для данного префикса
    drop() {
        const rowsCount = this.rowsCount()

        for (let i = 0; i < rowsCount; i++) {
            let key = localStorage.key(i)

            if (key.startsWith(this.dbPrefix)) this.delete(key)
        }
    }

    // очищаем все данные для домена
    dropAll() {
        localStorage.clear()
    }
}
