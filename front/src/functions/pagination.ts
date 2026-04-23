const calculatePages = (total: number, perPage: number, currentPage: number) => {
    const totalPages = Math.ceil(total / perPage)
    const pageNumbers = []
    const maxPagesToShow = 5

    const startPage = Math.max(
        1,
        Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1),
    )
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push({ pageNumber: i })
    }

    return pageNumbers
}

export { calculatePages }
