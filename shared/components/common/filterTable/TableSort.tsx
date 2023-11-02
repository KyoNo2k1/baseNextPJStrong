import React from 'react';
import {Select} from "antd";
import {useRouter} from "next/router";
import useTrans from "@/shared/hooks/useTrans";

type Props = {
  value: string ,
  onChange : (params : string , value : string )=>void
}

/**
 *
 * @param props value : key to sort example : createdTs , lastmodifiedTs , onChange : callback to search
 * @constructor
 */
function TableSort(props : Props) {
  const router = useRouter()
  const {trans}   = useTrans()
  return (
      <Select
          defaultValue={router.query.sort  || `-${props.value}`}
          placeholder={'Sort by default'}
          size='large'
          className=''
          onChange={value => props.onChange('sort' , value as string)}
          options={[
            { label: trans.common.latest, value: `-${props.value}` },
            { label: trans.common.oldest, value:  props.value},
          ]}
      ></Select>
  );
}

export default TableSort;
