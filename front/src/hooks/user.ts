import { deleteUser, getUser, getUsers, postUser, putUser } from '@/services/backoffice/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userCreator } from 'state/index'

const useGetUsers = (currentPage: number, perPage: number, search?: string, filters?: string) => {
    const dispatch = useDispatch()
    const { paginateUsersAction } = bindActionCreators(userCreator, dispatch)

    const query = useQuery({
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

const useGetUser = (id: number) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getUser(id),
    })
}

const useLazyGetUser = (id: number) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => getUser(id),
        enabled: false
    })
}

const useCreateUser = () => {
    const dispatch = useDispatch()
    const { createUserAction } = bindActionCreators(userCreator, dispatch)

    const query = useMutation({
        mutationFn: (formData: any) => {
            return postUser(formData)
        },
    })

    useEffect(() => {
        if (query.data) {
            createUserAction(query.data)
        }
    }, [query.data])

    return query;
}

const useUpdateUser = () => {
    const dispatch = useDispatch()
    const { updateUserAction } = bindActionCreators(userCreator, dispatch)

    const query = useMutation({
        mutationFn: ({ id, formData }: { id: number, formData: any }) => {
            return putUser(id, formData)
        },
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
        mutationFn: (id: number) => {
            return deleteUser(id)
        },
    })

    useEffect(() => {
        if (query.data) {
            deleteUserAction(query.data.id)
        }
    }, [query.data])

    return query;
}

export { useGetUsers, useGetUser, useLazyGetUser, useCreateUser, useUpdateUser, useDeleteUser }
