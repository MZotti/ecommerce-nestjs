export default interface Pagination<T> {
    data: T[],
    meta: Meta
}

interface Meta {
    total: number
    page: number
    perPage: number
    lastPage: number
}