const com = {
    set: (key, value) => localStorage.setItem(key, value),
    get: key => localStorage.getItem(key)
}

const cacheDataKey = 'cacheDataKey'
const cacheData = {
    set: obj => com.set(cacheDataKey, JSON.stringify(Object.assign({}, com.get(cacheDataKey) ? JSON.parse(com.get(cacheDataKey)) : {}, obj))),
    get: item => {
        return com.get(cacheDataKey) ? (
            item ? JSON.parse(com.get(cacheDataKey))[item] : JSON.parse(com.get(cacheDataKey))
        ) : ''
    }
}

export default {
    cacheData
}