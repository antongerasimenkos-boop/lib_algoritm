export function saveToFile(data, filename) {
    let blob = new Blob([data], { type: 'text/plain' })
    let anchor = document.createElement('a')
    anchor.download = filename
    anchor.href = window.URL.createObjectURL(blob)
    anchor.target = '_blank'
    anchor.style.display = 'none'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
}

export async function loadFile(files) {
    let msg = ''

    if (files.length === 0) {
        return { state: false, msg: 'Файлы для загрузки не выбраны', contents: null }
    } else {
        // Первый файл грузим (NO MULTIPLE)
        let file = files[0]
        if (validFileType(file) && file.size < 1048576) {
            msg = 'Имя файла ' + file.name + ', размер ' + returnFileSize(file.size) + '.'

            try {
                let result = await readFileAsync(file)
                return { state: true, msg, contents: result }
            } catch (err) {
                console.log(err)
            }
        } else {
            msg = 'Файл ' + file.name + ': не поддерживаемый тип файла. Выберите другой файл.'
            return { state: false, msg, contents: null }
        }
    }
}

export function validFileType(file) {
    let fileTypes = ['text/plain', 'application/json', 'text/javascript'],
        fileExtentions = ['json', 'js']

    for (let i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true
        }
    }
    // если по типу не определили - то расширению
    for (let i = 0; i < fileExtentions.length; i++) {
        if (file.name.substr(file.name.lastIndexOf('.') + 1) === fileExtentions[i]) {
            return true
        }
    }
    return false
}

export function returnFileSize(number) {
    if (number < 1024) {
        return number + 'bytes'
    } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB'
    } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + 'MB'
    }
}

function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let msg
        reader.onloadend = function(event) {
            // contents = event.target.result
            resolve(event.target.result)
            let error = event.target.error
            if (error != null) {
                switch (error.code) {
                    case error.ENCODING_ERR:
                        msg = 'Проблемы кодировки!'
                        console.error(msg)
                        break

                    case error.NOT_FOUND_ERR:
                        msg = 'Файл не найден!'
                        console.error(msg)
                        break

                    case error.NOT_READABLE_ERR:
                        msg = 'Файл не может быть прочитан!'
                        console.error(msg)
                        break

                    case error.SECURITY_ERR:
                        msg = 'Проблема безопасности в файл!'
                        console.error(msg)
                        break

                    default:
                        msg = 'Я понятия не имею, что случилось!'
                        console.error(msg)
                }
                reject({ state: false, msg })
            }
            // else {
            // return { state: true, msg: 'RESOLVE', contents }
            // }
        }
        reader.readAsText(file)
    })
}
