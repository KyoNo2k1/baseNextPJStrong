import {InputSearch} from '@/shared/schema/shared-types/ISearchParams'
import {Button, Checkbox, Drawer, Space} from 'antd'
import {FilterIcon} from 'lucide-react'
import {Dispatch, SetStateAction, useState} from 'react'
import useTrans from '@/shared/hooks/useTrans'


type Props = {
    setInputs: Dispatch<SetStateAction<InputSearch[]>>,
    inputs: InputSearch[]
}
/**
 *
 * @param searchFunction : function will trigged when
 * @returns
 */
export default function FilterTable({ setInputs, inputs }: Props) {
    const {trans} = useTrans()
    const [isOpen, setOpen] = useState(false)
    function selectAll() {
        setInputs(inputs => inputs.map(item => {
            item.active = true
            return item
        }))
    }
    function clearAll() {
        setInputs(input => input.map(item => {
            item.active = false
            return item
        }))
    }

    return <>
        <Button onClick={() => setOpen(true)}>
            <FilterIcon className='text-gray-600' />
        </Button>


        <Drawer
            title={trans.common.listFilter}
            placement={"right"}
            width={500}
            onClose={() => setOpen(false)}
            open={isOpen}
            extra={
                <Space>
                    <Button onClick={clearAll}>{trans.common.deleteFilter}</Button>
                    <Button type="primary" onClick={selectAll} >
                        {trans.common.selectAll}
                    </Button>
                </Space>
            }
        >
            <div className='flex flex-col gap-2'>
                {inputs.map(item =>
                    <Checkbox className='relative' key={item.id} checked={item.active} onClick={() => {
                        setInputs(inputs.map(tmp => {
                            if (tmp.id === item.id) {
                                tmp.active = !tmp.active
                            }
                            return tmp
                        }))
                    }}> {item.label}</Checkbox>)}
            </div>


        </Drawer>
    </>


}
