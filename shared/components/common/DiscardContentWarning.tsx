import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useTrans from '@/shared/hooks/useTrans';
import {ChevronLeftIcon} from 'lucide-react';
import PageTitle from '@/shared/components/common/PageTitle';

type Props = {
  url: string;
  dirty?: boolean;
  isBack?: boolean;
  isChangeFlight?: boolean;
};

export default function DiscardContentWarning(props: Props) {
  const { trans } = useTrans();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const showWarning = () => {
    if (props.dirty) setIsOpen(true);
    else {
      router.push(props.url);
    }
  };
  const handleOk = () => {
    router.push(props.url);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      {props.isBack ? (
        <Button
          type={'text'}
          onClick={showWarning}
        >
          <ChevronLeftIcon />
        </Button>
      ) : (
        <Button
          onClick={showWarning}
          className= {props.isChangeFlight ? 'flex items-center justify-center border-primary font-medium text-primary' : ''}
        >{props.isChangeFlight ? 'Cancel & keep original' : trans.common.cancel}</Button>
      )}
      <Modal
        open={isOpen}
        title={
          <PageTitle title= {trans.common.notify.discard} className='w-full text-center'/>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p className='mb-[32px] mx-4'>{trans.common.notify.forceBack}</p>
        <div className='w-full space-x-2 text-center mt-4'>
          <Button onClick={() => setIsOpen(false)}>{trans.common.no}</Button>
          <Button type='primary' onClick={handleOk}>
            {trans.common.yes}
          </Button>
        </div>
      </Modal>
    </>
  );
}
