import SelectInput from '@/components/Inputs/SelectInput'
import TextInput from '@/components/Inputs/TextInput'

const UserForm = () => {
    return (
        <>
            <TextInput id='name' label='Name' />
            <TextInput id='email' label='E-mail' />
            <SelectInput id='roleId' label='Role' options={[
                { value: 1, label: 'ADMIN' },
                { value: 2, label: 'MANAGER' },
                { value: 3, label: 'OPERATIONAL' },
                { value: 4, label: 'ANALYST' },
            ]} />
        </>
    )
}

export default UserForm