import { useState } from 'react'
import { Select, DatePicker, TimePicker } from 'antd'

import { useQuery } from '@apollo/client'
import { GET_STUDENT } from '../utils/queries'

const { Option } = Select

const Students = () => {
    const [studentData, setStudentData] = useState()
    const [timeData, setTimeData] = useState()

    const { loading, data } = useQuery(GET_STUDENT)
    if (loading)
        return <div>Loading...</div>

    const students = data.getStudent || []
    
    const handleSelectStudet = (value) => {
        const student = data.getStudent[value.key]
        setStudentData(student)
    }

    const handleSelectDate = (value) => {
        console.log(value)
        // setTimeData(value._d)
    }

    return (
        <>
            {
                <>
                    <Select
                        style={{ width: '300px' }}
                        showSearch
                        placeholder="Student"
                        optionFilterProp="children"
                        labelInValue
                        onSelect={handleSelectStudet}
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
                    <DatePicker
                        value={timeData}
                        onChange={handleSelectDate}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                    />
                </>
            }
        </>
    )
}

export default Students