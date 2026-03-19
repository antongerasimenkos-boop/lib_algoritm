import { getTemplatesFormApi, getTagsFormApi } from '@/js/getFromApi.js'
import { simpleStore } from '@/js/simpleStore'
import { TEMPLATES } from '@/config/templates'
import {
    IS_GENERATE_TEMPLATES,
    DEFAULT_MODE_TYPE,
    pattern_status,
    doc_category_ref,
    tags as TAGS_CONFIG,
    DEFAULT_API as config
} from '@/config/config'

export async function getTemplates() {
    if (IS_GENERATE_TEMPLATES) {
        let tmp
        await generateTemplates(7, 30).then(data => {
            tmp = data
        })
        return [...TEMPLATES, ...tmp]
    } else {
        let realTemplates
        let holding_id = config.holding_id || 2
        let id = TAGS_CONFIG.level0.id || ''
        await getTagsFormApi(holding_id, id).then(data => {
            if (!data.data) return false
            if (data.success) {
                realTemplates = getConvertTemplates(data.data)
            }
        })

        return realTemplates
    }
}

async function getConvertTemplates(tags) {
    let realTemplates
    await getTemplatesFormApi().then(data => {
        if (data.success) {
            realTemplates = convertTemplates(data.data.patterns, tags)
        }
    })
    return realTemplates
}

async function generateTemplates(startId = 7, count = 1) {
    let bd = simpleStore.state.currentBD

    let templates = []

    let fields = Object.entries(bd.fields).map(val => val[1])
    let node = Object.entries(bd.node).map(val => val[1])

    let startLevelArr = node.filter(val => val.level === 3)
    let name, lvl1, lvl2, tmpl, number, filter

    for (let index = 0; index < count; index++) {
        startLevelArr.forEach(val => {
            name = ''
            filter = []
            name = fields[val.field].name
            filter.push(val.field)
            name = fields[node[val.parent].field].name + ' ' + name
            filter.unshift(node[val.parent].field)
            lvl2 = node[val.parent].parent
            lvl1 = node[lvl2].parent
            filter.unshift(node[lvl2].field)
            name = fields[node[lvl1].field].name + ' ' + name
            filter.unshift(node[lvl1].field)
            name = fields[node[lvl2].field].name + ' ' + name

            startId++
            number = randomInteger(1, 9999).toString()
            tmpl = {
                id: startId,
                number,
                name,
                link: '#\\' + number,
                filter
            }
            templates.push(tmpl)
        })
    }

    return templates
}

function convertTemplates(templates, mainTags) {
    const patterns = []
    const bd = simpleStore.state.currentBD
    const mainID = TAGS_CONFIG.level0.id || ''
    /**
     *
     * @todo Перенести в серверную часть. Возврщать Array? Сейчас Obj
     *
     */
    let fields = Object.entries(bd.fields).map(val => val[1])
    let node = Object.entries(bd.node).map(val => val[1])

    // Фильтр по статусу Утвержден
    let status = pattern_status[1]
    templates = templates.filter(val => val.status == status)

    // Фильтр по категории Договор и Доп соглашение, @todo а Приложение? Анкета и тп?
    let category = []

    // 'Приказ'
    category.push(doc_category_ref[89])
    // 'Письмо'
    category.push(doc_category_ref[88])
    // 'Договрный докумен'
    category.push(doc_category_ref[96])

    templates = templates.filter(val => category.some(el => el == val.category))

    templates.forEach(element => {
        let tmp = {}
        // let cat
        let title = element.pattern_title
        // switch (element.category) {
        //     // Договор
        //     case doc_category_ref[1]:
        //         cat = 0
        //         break
        //     case doc_category_ref[3]:
        //         cat = 1
        //         if (title.toLowerCase().indexOf('корректирующее') != -1) cat = 2
        //         break
        //     case doc_category_ref[27]:
        //         cat = 1
        //         break
        //     case doc_category_ref[69]:
        //         cat = 2
        //         break
        //     default:
        //         // cat = 0
        //         return
        // }
        tmp.id = element.pattern_id
        tmp.number = element.pattern_id // ?
        tmp.name = title
        tmp.note = element.pattern_comment
        tmp.link = `\\create_document\\` + element.pattern_id
        tmp.filter = []
        // tmp.filter.push(cat)

        if (!isObjectEmpty(element.pattern_tags)) {
            let keys = Object.keys(element.pattern_tags)
            // if (!(keys.length === 1 && keys[0] === tags.level0.id)) {
            if (keys.length) {
                // tmp.filter = [...tmp.filter, ...getFilter(element.pattern_tags, fields, node, mainTags)]
                tmp.filter = [...tmp.filter, ...getFilter2(keys, fields, mainID)]
            }
        } else {
            if (element.parent_pattern_id) {
                let parrent = templates.find(val => val.pattern_id === element.parent_pattern_id)
                if (parrent && parrent.pattern_tags) {
                    let keys = Object.keys(parrent.pattern_tags)
                    if (!(keys.length < 1 || keys[0] === mainID)) {
                        tmp.filter = [...tmp.filter, ...getFilter(parrent.pattern_tags, fields, node, mainTags)]
                    }
                }
                tmp.name = tmp.name + ' к ' + parrent.pattern_title
            }
        }
        // Не добавалять ошибочные шалоны у которых тэг установлен "ВСЕ"
        if (tmp.filter.length) {
            // > 1) {
            patterns.push(tmp)
        }
    })

    return patterns
}

function getFilter(tags, fields, node, mainTags /*, category */) {
    let arr = []
    let tmp = []

    if (DEFAULT_MODE_TYPE === 'anketa') {
        for (let key of Object.keys(tags)) {
            let indx = fields.findIndex(val => val.data === key)

            if (indx !== -1) {
                arr.push(indx)
            }
        }

        arr.forEach(element => {
            let unit = node.find(val => val.field == element)
            if (unit && unit?.level) {
                switch (unit.level) {
                    // Мульти фильтр
                    case 1:
                        if (tmp[0] === undefined) {
                            tmp[0] = element
                        } else {
                            let add = []
                            add.push(tmp[0])
                            add.push(element)
                            tmp[0] = add
                        }
                        break
                    // Моно фильтр
                    case 2:
                        tmp[1] = element
                        break
                    // Моно фильтр
                    case 3:
                        // Проверить это field 3го уровня? Значит есть 3ий фильтр
                        // Так как в системе ТС у тегов (шаблонов) третьего уровня не выделен родитель (второй уровень)
                        // его надо найти и поместить в фильтр
                        // @todo Переделать в поцедуру без hard code
                        tmp[1] = node[unit.parent].field
                        tmp[2] = element
                        break
                    default:
                        return
                }
            }
        })
    } else {
        for (let tag of Object.keys(tags)) {
            arr = []
            let rootTags
            // LEVEL 1
            if (TAGS_CONFIG.level1 && TAGS_CONFIG.level1.id && TAGS_CONFIG.level1.id === tag) {
                rootTags = mainTags[0].children.find(element => +element.id === +TAGS_CONFIG.level1.id)
                rootTags.children.forEach(element => arr.push(element.id))
                tmp[0] = convertArrayToTagsArray(arr, fields)

                continue
            }

            if (TAGS_CONFIG.level1 && TAGS_CONFIG.level1.id && TAGS_CONFIG.level1.id) {
                rootTags = mainTags[0].children.find(element => +element.id === +TAGS_CONFIG.level1.id)
                let value = rootTags.children.find(element => +element.id === +tag)
                if (value !== undefined) {
                    let index = fields.findIndex(val => +val.data === +value.id)

                    if (index !== -1) {
                        if (tmp[0] === undefined) {
                            tmp[0] = index
                        } else {
                            tmp[0] = tmp[0].length === undefined ? [tmp[0], index] : [...tmp[0], index]
                        }
                    }

                    continue
                }
            }
            // LEVEL 2
            if (TAGS_CONFIG.level2 && TAGS_CONFIG.level2.id && TAGS_CONFIG.level2.id === tag) {
                // Пологаю что у шаблана у которого установлен тег ПРЕДМЕТ - т.е. включены абсолютно все подтипы - ошибочен

                continue
            }

            if (TAGS_CONFIG.level2 && TAGS_CONFIG.level2.id && TAGS_CONFIG.level2.id) {
                rootTags = mainTags[0].children.find(element => +element.id === +TAGS_CONFIG.level2.id)
                tmp = concatTagsArray(tmp, findParentTags(rootTags, tag, fields))

                continue
            }
        }
    }

    return tmp
}

function convertArrayToTagsArray(arr, fields) {
    let out = [],
        index

    arr.forEach(element => {
        index = fields.findIndex(val => val.data === element)

        if (index !== -1) {
            out.push(index)
        }
    })

    if (out?.length === 1) {
        out = out[0]
    }

    return out
}

function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

function isObjectEmpty(value) {
    if (value === null || value === undefined) return true
    // return Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) === '{}'
    if (Array.isArray(value)) return true
    return value && Object.keys(value).length === 0 && value.constructor === Object
}

// Возвращает массив ID тэгов в порядке дед - отец - сын (и тд), но
// конечные ИД иогут принадлежать одному уровню
// далее уровень сопоставляется через fields и его level (не в этой функции)
// Есть нюанс: если выбраны все теги одного уровня - то в приходящем
// ответе они не приходят, в конце данной функции производится проверка такого
// и выборка всех children тегов (в прежелах одного уровня)
// (наверное пока этого достаточно)

function findParentTags(root, fId, fields) {
    let tags = [],
        tmp = [],
        index

    if (root?.children) {
        recursiveFindParentTags(root.children, fId, tags)
    }
    if (tags.length) {
        tags.reverse()

        if (tags[tags.length]?.children) {
            tags[tags.length].children.forEach(element => tmp.push(element))
            tags = [...tags, ...tmp]
        }

        tmp = []

        tags.forEach(element => {
            index = fields.findIndex(val => +val.data === +element)

            if (index !== -1) {
                tmp[fields[index].level - 1] = convArray(tmp[fields[index].level - 1], index)
            }
        })
    }

    return tmp
}

function convArray(arr, element) {
    if (arr === undefined) {
        arr = element
    } else {
        arr = arr.length === undefined ? [arr, element] : [...arr, element]
    }

    return arr
}

function normilizeTagArray(arr = []) {
    let tmp = []

    if (arr?.length) {
        arr.forEach((el, index) => {
            if (el.length === undefined) {
                tmp[index] = [el]
            } else {
                tmp[index] = el
            }
        })
    }

    return tmp
}

function concatTagsArray(arr1, arr2) {
    arr1 = normilizeTagArray(arr1)
    arr2 = normilizeTagArray(arr2)

    arr2.forEach((el, index) => {
        if (arr1[index]?.length && el !== undefined) {
            arr1[index] = [...new Set([...arr1[index], ...el])]
        } else {
            if (el !== undefined) {
                arr1[index] = el
            }
        }
    })

    arr1.forEach((el, index) => {
        if (el !== undefined && el.length === 1) {
            arr1[index] = el[0]
        }
    })

    return arr1
}

function recursiveFindParentTags(nodes, fId, tags) {
    let res = false

    nodes.forEach(element => {
        if (+element.id === +fId) {
            tags.push(element.id)
            res = true

            return
        }
        if (element?.children) {
            if (recursiveFindParentTags(element.children, fId, tags)) {
                tags.push(element.id)
                res = true

                return
            }
        }
    })

    return res
}

function getFilter2(tags, fields, mainID) {
    if (tags?.length === 1 && mainID && tags[0] == mainID) {
        //
        tags = fields.map(el => el.data)
    }
    const filters = []
    if (Array.isArray(tags)) {
        tags.forEach(tag => {
            const field = fields.find(f => f.data == tag)
            if (field) {
                // filters[field.level] = [...filters[field.level], field.filter]
                filters[field.level] = [...(filters[field.level] ? filters[field.level] : []), field.filter]
                // filters[field.level] = concatTagsArray(filters[field.level], field.filter)
            }
        })
    }

    return filters
}

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {})
