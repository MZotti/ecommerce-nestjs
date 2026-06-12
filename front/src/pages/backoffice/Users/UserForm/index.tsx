import SelectInput from '@/components/Inputs/SelectInput'
import TextInput from '@/components/Inputs/TextInput'

const UserForm = () => {
    return (
        <>
            <TextInput id='name' label='Name' required/>
            <TextInput id='email' label='E-mail' required/>
            <SelectInput id='roleId' label='Role' options={[
                { value: 1, label: 'ADMIN' },
                { value: 2, label: 'MANAGER' },
                { value: 3, label: 'OPERATIONAL' },
                { value: 4, label: 'ANALYST' },
            ]} required />
        </>
    )
}

export default UserForm