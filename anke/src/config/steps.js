/* BD DECLARAIONS

    STEPS BD
    Contains steps like level go

    ID   TITLE   NAME    TYPE

    ID          - NUMBER (step level)
    TITLE       - STRING (Title show in question FORM Header)
    NAME        - STRING (Label show in question FORM Body)
    SHORTNAME   - STRING (Label show heder text in table header)
    TEG         - STRING (Filter tags unit)
    TYPE        - STRING (Type of form element used in question FORM)
                possible values:
                select    - select input
                radio     - radio input
                end       - show end message 

    Example records:
    ...
    4: {
        title: 'Шаг',
        name: 'Подвид документа',
        type: 'select'
    },
    ...

    -------------------------------------------------------------------------

    STEPS_FIELDS (SAME AS FILTER)
    Contains all labels for (fields)

    ID  LEVEL   NAME    FILTER

    ID      - NUMBER (self ID)
    NAME    - STRING (Label show in Element (question FORM Body))
    DATA    - STRING (mb NUMBER if use FILTERS BD) - filter name

    -------------------------------------------------------------------------

    STEPS_NODE

    ID  LEVEL   PARENT  PRIORITY FIELD

    ID      - NUMBER (self ID)
    LEVEL   - NUMBER (level question ID)
    PARENT  - NUMBER (parend node id - pointer to another record in this table)
    PRIORITY - NUMBER (in one level placed)
    FIELD   - NUMBER (ID in STEPS_FIELDS BD records)

*/
// Договор/ДС к рамочному договору
// ИЛИ
// Корректирующее ДС?

export const STEPS = {
    0: {
        title: 'Шаг',
        name: 'Вид документа',
        shortname: 'Вид',
        teg: 'vid',
        type: 'select'
    },
    1: {
        title: 'Готово!',
        name: 'Работа мастера завершена',
        shortname: '',
        teg: '',
        type: 'end'
    }
}

export const STEPS_FIELDS = {
    // 0: {
    //     level: 0,
    //     name: 'Вид строительства',
    //     data: 'vid'
    // }
    // 1: {
    //     level: 0,
    //     name: 'ДС/Спецификация',
    //     data: 'dop'
    // },
    // 2: {
    //     level: 0,
    //     name: 'Корректирующее ДС',
    //     data: 'correction'
    // }
    // 3: { level: 1, name: 'Расходный', data: '347' },
    // 4: { level: 1, name: 'Доходный', data: '346' },
    // 5: { level: 1, name: 'ВГО', data: '348' },
    // 6: { level: 1, name: 'Без фин. обязательств', data: '345' },
    // 7: { level: 2, name: 'Информац-консульт', data: '321' },
    // 8: { level: 2, name: 'Услуги', data: '315' },
    // 9: { level: 2, name: 'Лицензия', data: '313' },
    // 10: { level: 2, name: 'Займ', data: '320' },
    // 11: { level: 2, name: 'Спонсорский', data: '312' },
    // 12: { level: 2, name: 'Купля-продажа', data: '323' },
    // 13: { level: 2, name: 'Пожертвование', data: '330' },
    // 14: { level: 2, name: 'Энергоснабжение', data: '327' },
    // 15: { level: 2, name: 'ГПХ', data: '328' },
    // 16: { level: 2, name: 'Поставка ГП ', data: '309' },
    // 17: { level: 2, name: 'Аренда', data: '324' },
    // 18: { level: 2, name: 'Поставка ГП (SI)', data: '362' },
    // 19: { level: 2, name: 'Поставка (закупка)', data: '316' },
    // 20: { level: 2, name: 'Работы', data: '314' },
    // 21: { level: 2, name: 'Агентский', data: '317' },
    // 22: { level: 3, name: 'ИКУ и мероприятия', data: '391' },
    // 23: { level: 3, name: 'Обращение с отходами', data: '387' },
    // 24: { level: 3, name: 'Мед. осмотры', data: '389' },
    // 25: { level: 3, name: 'Поверка, калибровка', data: '383' },
    // 26: { level: 3, name: 'Юридические услуги', data: '379' },
    // 27: { level: 3, name: 'Питание, клининг', data: '377' },
    // 28: { level: 3, name: 'Иные', data: '375' },
    // 29: { level: 3, name: 'Тех.поддержка', data: '381' },
    // 30: { level: 3, name: 'Логистика', data: '390' },
    // 31: { level: 3, name: 'Авторский надзор', data: '388' },
    // 32: { level: 3, name: 'Оценка', data: '386' },
    // 33: { level: 3, name: 'Хранение', data: '384' },
    // 34: { level: 3, name: 'Экспертиза пром.безопасн.', data: '382' },
    // 35: { level: 3, name: 'Выставки', data: '380' },
    // 36: { level: 3, name: 'Исследование образ-в', data: '376' },
    // 37: { level: 3, name: 'ТМЦ', data: '370' },
    // 38: { level: 3, name: 'Закупка оборуд.', data: '373' },
    // 39: { level: 3, name: 'Сувениры', data: '371' },
    // 40: { level: 3, name: 'Закупка химии', data: '374' },
    // 41: { level: 3, name: 'ТП, ключи, сертификаты', data: '372' },
    // 42: { level: 3, name: 'СМР, Ремонт, ПИР', data: '364' },
    // 43: { level: 3, name: 'Разраб. разреш. док-в', data: '363' },
    // 44: { level: 3, name: 'НИОКР', data: '392' },
    // 45: { level: 3, name: 'Иные', data: '369' },
    // 46: { level: 3, name: 'ИТ', data: '368' },
    // 47: { level: 3, name: 'Создание произведений', data: '366' },
    // 48: { level: 3, name: 'Землеустр., кадастровые', data: '365' }
}

// ID      - NUMBER (self ID)
// LEVEL   - NUMBER (level question ID)
// PARENT  - NUMBER (parend node id - pointer to another record in this table)
// PRIORITY - NUMBER (in one level placed)
// FIELD   - NUMBER (ID in STEPS_FIELDS BD records)

export const STEPS_NODE = {
    // Договор
    0: {
        id: 0,
        level: 0,
        parent: -1,
        priority: 0,
        field: 0
    }
    // // ДС
    // 1: {
    //     id: 1,
    //     level: 0,
    //     parent: -1,
    //     priority: 1,
    //     field: 1
    // },
    // // Корректирующие
    // 2: {
    //     id: 2,
    //     level: 0,
    //     parent: -1,
    //     priority: 2,
    //     field: 2
    // },

    // // ---------- LEVEL 1 ----------

    // // Доходный договор
    // 3: {
    //     id: 3,
    //     level: 1,
    //     parent: 0,
    //     priority: 0,
    //     field: 4
    // },
    // // Доходный доп
    // 4: {
    //     id: 4,
    //     level: 1,
    //     parent: 1,
    //     priority: 1,
    //     field: 4
    // },
    // // Расходный договор
    // 5: {
    //     id: 5,
    //     level: 1,
    //     parent: 0,
    //     priority: 0,
    //     field: 3
    // },
    // // Расходный доп
    // 6: {
    //     id: 6,
    //     level: 1,
    //     parent: 1,
    //     priority: 1,
    //     field: 3
    // },
    // // Вго договор
    // 7: {
    //     id: 7,
    //     level: 1,
    //     parent: 0,
    //     priority: 0,
    //     field: 5
    // },
    // // Вго доп
    // 8: {
    //     id: 8,
    //     level: 1,
    //     parent: 1,
    //     priority: 1,
    //     field: 5
    // },
    // // Без фин. об-в договор.
    // 9: {
    //     id: 9,
    //     level: 1,
    //     parent: 0,
    //     priority: 0,
    //     field: 6
    // },
    // // Без фин. об-в доп.
    // 10: {
    //     id: 10,
    //     level: 1,
    //     parent: 1,
    //     priority: 1,
    //     field: 6
    // },

    // // ---------- LEVEL 2 ----------

    // // Расходный договор Поставка (закупка)
    // 11: {
    //     id: 11,
    //     level: 2,
    //     parent: 5,
    //     priority: 0,
    //     field: 19
    // },
    // // Расходный договор Услуги
    // 12: {
    //     id: 12,
    //     level: 2,
    //     parent: 5,
    //     priority: 1,
    //     field: 8
    // },
    // // Расходный договор Работы
    // 13: {
    //     id: 13,
    //     level: 2,
    //     parent: 5,
    //     priority: 2,
    //     field: 20
    // },
    // // Расходный договор Аренда
    // 14: {
    //     id: 14,
    //     level: 2,
    //     parent: 5,
    //     priority: 3,
    //     field: 17
    // },
    // // Расходный договор Лицензия
    // 15: {
    //     id: 15,
    //     level: 2,
    //     parent: 5,
    //     priority: 4,
    //     field: 9
    // },
    // // Расходный договор ГПХ
    // 16: {
    //     id: 16,
    //     level: 2,
    //     parent: 5,
    //     priority: 5,
    //     field: 15
    // },
    // // Расходный договор Пожертвования
    // 17: {
    //     id: 17,
    //     level: 2,
    //     parent: 5,
    //     priority: 6,
    //     field: 13
    // },
    // // Расходный договор Спонсорский
    // 18: {
    //     id: 18,
    //     level: 2,
    //     parent: 5,
    //     priority: 7,
    //     field: 11
    // },
    // // Расходный договор Купля-Продажа
    // 19: {
    //     id: 19,
    //     level: 2,
    //     parent: 5,
    //     priority: 8,
    //     field: 12
    // },
    // // Расходный договор Информац-консульт
    // 20: {
    //     id: 20,
    //     level: 2,
    //     parent: 5,
    //     priority: 9,
    //     field: 7
    // },

    // // Доходный договор Купля-Продажа
    // 21: {
    //     id: 21,
    //     level: 2,
    //     parent: 3,
    //     priority: 0,
    //     field: 12
    // },
    // // Доходный договор Аренда
    // 22: {
    //     id: 22,
    //     level: 2,
    //     parent: 3,
    //     priority: 1,
    //     field: 17
    // },
    // // Доходный договор Поставка ГП
    // 23: {
    //     id: 23,
    //     level: 2,
    //     parent: 3,
    //     priority: 2,
    //     field: 16
    // },
    // // Доходный договор Информац-консульт
    // 24: {
    //     id: 24,
    //     level: 2,
    //     parent: 3,
    //     priority: 3,
    //     field: 7
    // },
    // // ВГО Договор Энергоснабжение
    // 25: {
    //     id: 25,
    //     level: 2,
    //     parent: 7,
    //     priority: 0,
    //     field: 14
    // },
    // // ВГО Договор Услуги
    // 26: {
    //     id: 26,
    //     level: 2,
    //     parent: 7,
    //     priority: 1,
    //     field: 8
    // },
    // // ВГО Договор Займ
    // 27: {
    //     id: 27,
    //     level: 2,
    //     parent: 7,
    //     priority: 2,
    //     field: 10
    // },
    // // ВГО Договор Поставка ГП (SI)
    // 28: {
    //     id: 28,
    //     level: 2,
    //     parent: 7,
    //     priority: 3,
    //     field: 18
    // },
    // // ВГО Договор Купля-Продажа
    // 29: {
    //     id: 29,
    //     level: 2,
    //     parent: 7,
    //     priority: 4,
    //     field: 12
    // },
    // // ВГО Договор Поставка-Закупка
    // 30: {
    //     id: 30,
    //     level: 2,
    //     parent: 7,
    //     priority: 5,
    //     field: 19
    // },
    // // ВГО Договор Агенсткий
    // 31: {
    //     id: 31,
    //     level: 2,
    //     parent: 7,
    //     priority: 6,
    //     field: 21
    // },

    // // Расходный доп Поставка (закупка)
    // 32: {
    //     id: 32,
    //     level: 2,
    //     parent: 6,
    //     priority: 0,
    //     field: 19
    // },
    // // Расходный доп Услуги
    // 33: {
    //     id: 33,
    //     level: 2,
    //     parent: 6,
    //     priority: 1,
    //     field: 8
    // },
    // // Расходный доп Работы
    // 34: {
    //     id: 34,
    //     level: 2,
    //     parent: 6,
    //     priority: 2,
    //     field: 20
    // },
    // // Расходный доп Аренда
    // 35: {
    //     id: 35,
    //     level: 2,
    //     parent: 6,
    //     priority: 3,
    //     field: 17
    // },
    // // Расходный доп Лицензия
    // 36: {
    //     id: 36,
    //     level: 2,
    //     parent: 6,
    //     priority: 4,
    //     field: 9
    // },
    // // Расходный доп ГПХ
    // 37: {
    //     id: 37,
    //     level: 2,
    //     parent: 6,
    //     priority: 5,
    //     field: 15
    // },
    // // Расходный доп Пожертвования
    // 38: {
    //     id: 38,
    //     level: 2,
    //     parent: 6,
    //     priority: 6,
    //     field: 13
    // },
    // // Расходный доп Спонсорский
    // 39: {
    //     id: 39,
    //     level: 2,
    //     parent: 6,
    //     priority: 7,
    //     field: 11
    // },
    // // Расходный доп Купля-Продажа
    // 40: {
    //     id: 40,
    //     level: 2,
    //     parent: 6,
    //     priority: 8,
    //     field: 12
    // },
    // // Расходный доп Информац-консульт
    // 41: {
    //     id: 41,
    //     level: 2,
    //     parent: 6,
    //     priority: 9,
    //     field: 7
    // },

    // // Доходный доп Купля-Продажа
    // 42: {
    //     id: 42,
    //     level: 2,
    //     parent: 4,
    //     priority: 0,
    //     field: 12
    // },
    // // Доходный доп Аренда
    // 43: {
    //     id: 43,
    //     level: 2,
    //     parent: 4,
    //     priority: 1,
    //     field: 17
    // },
    // // Доходный доп Поставка ГП
    // 44: {
    //     id: 44,
    //     level: 2,
    //     parent: 4,
    //     priority: 2,
    //     field: 16
    // },
    // // ВГО доп Энергоснабжение
    // 45: {
    //     id: 45,
    //     level: 2,
    //     parent: 8,
    //     priority: 0,
    //     field: 14
    // },
    // // ВГО доп Услуги
    // 46: {
    //     id: 46,
    //     level: 2,
    //     parent: 8,
    //     priority: 1,
    //     field: 8
    // },
    // // ВГО доп Займ
    // 47: {
    //     id: 47,
    //     level: 2,
    //     parent: 8,
    //     priority: 2,
    //     field: 10
    // },
    // // ВГО доп Поставка ГП (SI)
    // 48: {
    //     id: 48,
    //     level: 2,
    //     parent: 8,
    //     priority: 3,
    //     field: 18
    // },
    // // ВГО доп Купля-Продажа
    // 49: {
    //     id: 49,
    //     level: 2,
    //     parent: 8,
    //     priority: 4,
    //     field: 12
    // },
    // // ВГО доп Поставка-Закупка
    // 50: {
    //     id: 50,
    //     level: 2,
    //     parent: 8,
    //     priority: 5,
    //     field: 19
    // },
    // // ВГО доп Агенсткий
    // 51: {
    //     id: 51,
    //     level: 2,
    //     parent: 8,
    //     priority: 6,
    //     field: 21
    // }
}
