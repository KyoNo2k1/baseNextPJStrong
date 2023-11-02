import useTrans from '@/shared/hooks/useTrans';
import {Button, Result} from 'antd';
import {NextPage, NextPageContext} from 'next';
import Link from 'next/link';


interface Props {
    statusCode?: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Error: NextPage<Props> = ({ statusCode }) => {
    const { trans } = useTrans()
    return (<p>
        <Result
            status="500"
            title="500"
            subTitle={trans.page[500].pageTitle}
            extra={<Button type="primary"><Link href={"/"}>{trans.common.gobackHome}</Link> </Button>}
        />
    </p>
    );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
