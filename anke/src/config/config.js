// Проход Анкеты "быстрым методом" - переход к следующему шагу мгновенно, без нажатия кнопки "Подтвердить" (следующий шаг)
export const DEFAULT_METHOD_FAST = true

// Тип работы опросника по-умолчанию. Фильтр Или Анкета
export const DEFAULT_MODE_TYPE = 'filter' // anketa

// Показывать в таблице результата столбец ID шаблона
export const DEFAULT_TEMPATES_TABLE_SHOW_ID_COLUMN = true

// Генерировать тестовые шаблоны (для отладки)
export const IS_GENERATE_TEMPLATES = false

// Показать - Скрыть панель фильтров
export const SHOW_FILTER_PANEL = true
// Сделать не активной панель фильтров
export const DISABLE_FILTER_PANEL = true

export const DEFAULT_COLORS = [
    { text: 'Белый', value: '' },
    { text: 'Красный', value: '#F44336' },
    { text: 'Розовый', value: '#E91E63' },
    { text: 'Фиолетовый', value: '#9C27B0' },
    { text: 'Темно-фиолетовый', value: '#673AB7' },
    { text: 'Индиго', value: '#3F51B5' },
    { text: 'Синий', value: '#2196F3' },
    { text: 'Тёмно-синий', value: '#1976d2' },
    { text: 'Светло-синий', value: '#03A9F4' },
    { text: 'Голубой', value: '#00BCD4' },
    { text: 'Бирюзовый', value: '#009688' },
    { text: 'Зелёный', value: '#4CAF50' },
    { text: 'Светло-зелёный', value: '#8BC34A' },
    { text: 'Лайм', value: '#CDDC39' },
    { text: 'Жёлтый', value: '#FFEB3B' },
    { text: 'Янтарный', value: '#FFC107' },
    { text: 'Оранжевый', value: '#FF9800' },
    { text: 'Тёмно-оранжевый', value: '#FF5722' },
    { text: 'Коричневый', value: '#795548' },
    { text: 'Тёмно-серый', value: '#607D8B' },
    { text: 'Серый', value: '#9E9E9E' },
    { text: 'Чёрный', value: '#000000' }
]

// Параметры подкдючения к серверу Анкеты
export const DEFAULT_API = {
    api_key: 'RfwV7zRHwOA0Q601VBF3cBYBI3Mq',
    holding_id: '1',
    // resurl: 'https://turbocontract.evraz.com',
    resurl: 'https://evraz.turbocontract.ru',

    patch_api: '/anketa/api',
    patch_create: '/document/create',
    credentials: ''
}

// Предопределённые используемые типы документов.
export const doc_category_ref = {
    89: 'Приказ',
    88: 'Письмо',
    96: 'Договрный документ'
}

// Предопределённые Статусы шаблонов.
export const pattern_status = {
    0: 'Не утвержден',
    1: 'Утвержден'
}

// Сопостовление тегов из ТК.
export const tags = {
    level0: {
        id: '83',
        name: 'Вид документа'
    }
}

// Теги для автомотической генерации дерева ветвления Третьего Уровня вопросов.

// Children в предмете - это подвид
// Для генерации  lvl 3 (Расходный Договор и ДС - Поставка Закупка, Услуги, Работы)
// Ид соответсвуют ИД Тэгов из БД и ИД из Ноды для Расходного Договора / ДС
export const level3 = {
    id_tags: [315, 316, 314],
    id_nodes: [5, 6]
}

export const DEFAULT_MESSAGES = {
    apps: {
        title: 'Анкета',
        favorites: 'Избранное',
        filters: 'Фильтр'
    },
    main: {
        title: 'Анкета поиска шаблона'
    },
    wizard: {
        anketaOpen: 'Анкета поиска шаблона (открыть)',
        anketaClose: 'Анкета поиска шаблона (свернуть)'
    },
    general_system: {
        caption: 'Перейти в',
        link_text: 'cписок документов',
        link: DEFAULT_API.resurl + '/pattern/contract/'
    }
}

export const DEFAULT_LOGO = {
    img: './assets/logo.svg',
    link: ''
}
