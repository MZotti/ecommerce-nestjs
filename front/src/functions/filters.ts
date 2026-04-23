import { splitStringToDate } from './date'

const setupFilters = (filters: any): string => {
    const filterString = filters

    const objKeys = Object.keys(filters)

    objKeys.forEach(key => {
        if (filters[key] && fieldIsDate(key)) {
            console.log('entrou')
            filters[key] = splitStringToDate(filters[key])
        }
    })

    return JSON.stringify(filterString)
}

const fieldIsDate = (label: string): boolean => {
    return label.includes('created') || label.includes('updated') || label.includes('deleted')
}

export { setupFilters }
