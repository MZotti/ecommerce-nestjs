import { LocalStorageSettings } from 'enums/localStorage'
import { useEffect, useState } from 'react'

interface PaginationOptions {
	initialPerPage?: number
	initialPage?: number
	initialSearch?: string
	initialFilters?: string
}

export function usePagination({
	initialPerPage = 30,
	initialPage = 1,
	initialSearch = '',
	initialFilters = '',
}: PaginationOptions = {}) {

	const defaultPerPage = Number(window.localStorage.getItem(LocalStorageSettings.PER_PAGE)) || initialPerPage;

	const [currentPage, setCurrentPage] = useState<number>(initialPage)
	const [perPage, setPerPage] = useState<number>(defaultPerPage)
	const [search, setSearch] = useState<string>(initialSearch)
	const [filters, setFilters] = useState<string>(initialFilters)

	useEffect(() => {
		setCurrentPage(1)
	}, [perPage])

	useEffect(() => {
		setCurrentPage(1)
	}, [search])

	useEffect(() => {
		setCurrentPage(1)
	}, [filters])

	return {
		currentPage,
		setCurrentPage,
		perPage,
		setPerPage,
		search,
		setSearch,
		filters,
		setFilters,
	}
}
