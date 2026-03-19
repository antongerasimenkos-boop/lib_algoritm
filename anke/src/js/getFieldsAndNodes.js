/**
 * @desc    - Основное назанчение: Вернуть Ноду узлов дерева
 *            Заполнить "поля" (fields) уникальными значениями
 * @input   - Внешний конфигурациооный файл, шагов и начальных полей
 *
 * @output  - fields and nodes
 */

import { DEFAULT_API, tags } from '@/config/config'
import { STEPS, STEPS_FIELDS, STEPS_NODE } from '@/config/steps.js'
import { getTagsFormApi } from '@/js/getFromApi.js'

export const getFieldsAndNodes = async () => {
    let holding_id = DEFAULT_API?.holding_id || 1
    let id = tags?.level0?.id || ''
    let result = await getTagsFormApi(holding_id, id).then(data => {
        if (!data?.data) return false
        if (data?.success) {
            let fields = STEPS_FIELDS
            let fullNodes = STEPS_NODE
            let items = data.data

            let level1 = items.find(item => item.id == tags.level0.id) || []
            if (!level1) {
                console.log('Error: No level 1 fields')
                return false
            }

            fields = levelAddToFields(0, level1, fields)
            fullNodes = generateNodes(0, level1, fullNodes, {}, fields)

            return { steps: STEPS, fields, node: fullNodes }
        } else return false
    })

    return result
}

function levelAddToFields(level, items, fields) {
    let obj = { ...fields }
    obj = itemsInsertInObj(level, items.children, obj)

    return obj
}

function itemsInsertInObj(level, items, obj) {
    let indx = Object.keys(obj).length
    let nextLvl = []
    items.forEach(element => {
        if ('children' in element) nextLvl.push(element.children)
        let el = {}
        el.level = level
        el.name = element?.name || ''
        el.data = element?.id || ''
        obj = { ...obj, ...{ [indx]: el } }
        indx++
    })
    if (nextLvl.length) {
        level++
        nextLvl.forEach(element => {
            if (Array.isArray(element)) {
                obj = itemsInsertInObj(level, element, obj)
            }
        })
    }

    return obj
}

/**
 * @desc    - Основное назначение: Добавить в существующую Ноду новые узлы дерева
 *
 * @params  level - Начальный Уровень (level), вставляемых узлов
 *          collection - вставляемые узлы как колекция (@todo пока не подерживает уровень вложенности)
 *          nodes - Начальные узлы - к которым будут присоединяься коллекции
 *          fullNodes - Основное дерево ноды, куда будут добавляться полученные узлы
 *          fields - коллекция записей именований
 *
 * @output  - fullNodes - итоговое дерево ноды
 */

// Example one node:
// 33: {
//     id: 33,
//     level: 2,
//     parent: 6,
//     priority: 3,
//     field: 17
// },

function generateNodes(level = 3, collection, nodes, obj, fields) {
    let indx = Object.keys(obj).length

    // nodes.forEach(element => {
    for (let key of Object.keys(nodes)) {
        let priority = 0
        collection.children.forEach(unit => {
            let nodeUnits = Object.filter(fields, val => val.data == unit.id)
            let field_id = parseInt(Object.keys(nodeUnits)[0])
            let el = {}
            el.id = indx
            el.level = level
            el.parent = nodes[key].id
            el.priority = priority
            el.field = field_id
            obj = { ...obj, ...{ [indx]: el } }
            indx++
            priority++
        })
    }

    return obj
}

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {})
