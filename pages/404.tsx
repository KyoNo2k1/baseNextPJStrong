// ** React Imports
import useTrans from '@/shared/hooks/useTrans'
import {Button, Result} from 'antd'
import Head from 'next/head'
import Link from 'next/link'


const Error404 = () => {
  const { trans } = useTrans()

  return (
    <>
      <Head>
        <title>{trans.page[404].pageTitle}</title>
      </Head>
      <Result
        status="404"
        title="404"
        subTitle={trans.page[404].pageTitle}
        extra={<Button type="primary"><Link href={"/"}>{trans.common.gobackHome}</Link> </Button>}
      />
    </>

  )
}

export default Error404
