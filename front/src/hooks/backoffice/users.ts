import type HookCallBack from '@/interfaces/hook'
import type Pagination from '@/interfaces/pagination'
import type User from '@/interfaces/user'
import { deleteUser, getUser, getUsers, postUser, putUser } from '@/services/backoffice/users'
import { userCreator } from '@/state/backoffice'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

const useGetUsers = (currentPage: number, perPage: number, search?: string, filters?: string) => {
    const dispatch = useDispatch()
    const { paginateUsersAction } = bindActionCreators(userCreator, dispatch)

    const query = useQuery<Pagination<User>>({
        queryKey: ['users', currentPage, perPage, search, filters],
        queryFn: () => getUsers(currentPage, perPage, search, filters),
    })

    useEffect(() => {
        if (query.data) {
            paginateUsersAction(query.data.data)
        }
    }, [query.data])

    return query
}

const useGetUser = (id: number, storedUser?: User | null) => {
    return useQuery<User>({
        queryKey: ['user', id],
        queryFn: () => getUser(id),
        enabled: storedUser == null
    })
}

const useLazyGetUser = (id: number) => {
    return useQuery<User>({
        queryKey: ['user'],
        queryFn: () => getUser(id),
        enabled: false
    })
}

const useCreateUser = ({ onSuccess, onError }: HookCallBack) => {
    const dispatch = useDispatch()
    const { createUserAction } = bindActionCreators(userCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => postUser(formData),
        onSuccess: () => onSuccess && onSuccess(),
        onError: (error) => onError && onError(error)
    })

    useEffect(() => {
        if (query.data) {
            createUserAction(query.data)
        }
    }, [query.data])

    return query;
}

const useUpdateUser = ({ onSuccess, onError }: HookCallBack) => {
    const dispatch = useDispatch()
    const { updateUserAction } = bindActionCreators(userCreator, dispatch)

    const query = useMutation({
        mutationFn: ({ id, formData }: { id: number, formData: any }) => putUser(id, formData),
        onSuccess: () => onSuccess && onSuccess(),
        onError: (error) => onError && onError(error)
    })

    useEffect(() => {
        if (query.data) {
            updateUserAction(query.data)
        }
    }, [query.data])

    return query;
}

const useDeleteUser = () => {
    const dispatch = useDispatch()
    const { deleteUserAction } = bindActionCreators(userCreator, dispatch)

    const query = useMutation({
        mutationFn: (id: number) => deleteUser(id)
    })

    useEffect(() => {
        if (query.data) {
            deleteUserAction(query.data.id)
        }
    }, [query.data])

    return query;
}

export { useGetUsers, useGetUser, useLazyGetUser, useCreateUser, useUpdateUser, useDeleteUser }
