import { Select } from 'antd'

import { useQuery } from '@apollo/client'
import { GET_STUDENT } from '../utils/queries'

const { Option } = Select

const Students = () => {
    const { loading, data } = useQuery(GET_STUDENT)
    if (loading)
        return <div>Loading...</div>

    const students = data.getStudent || []

    return (
        <>
            {
                <Select
                    style={{ width: '300px' }}
                    showSearch
                    placeholder="Student"
                    optionFilterProp="children"
                    labelInValue
                    // onChange={onFoodChange}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        students?.map((student) => (
                            <Option key={student.id} value={student.id}>{`${student.first_name} ${student.last_name}`}</Option>
                        ))
                    }
                </Select>
            }
        </>
    )
}

export default Students