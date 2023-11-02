import React from 'react';
import {ChevronDownIcon} from 'lucide-react';
import {Dropdown} from 'antd';
import useTrans from '@/shared/hooks/useTrans';
import Image from 'next/image';

type Props = {
  placement: 'bottomRight' | 'top' | 'bottom'
}

function ChangeLanguage(props: Props) {

  const { lang, changeLanguage } = useTrans();
  const {trans} = useTrans()
  function RenderFlag() {
    switch (lang) {
      case 'vi':
        return <Image src={'/vietnam.png'} alt='vn' width={24} height={24} />;
      case 'en':
        return <Image src={'/united-kingdom.png'} alt='vn' width={24} height={24} />;
      default:
        return <Image src={'/vietnam.png'} alt='vn' width={24} height={24} />;
    }
  }

  return (
    <Dropdown
      placement={props.placement}
      menu={{
        items: [
          {
            key: 'vn',
            label: <div>{trans.common.vi}</div>,
            onClick: () => {
              if (lang !== 'vi') changeLanguage('vi');
            },
          },
          {
            key: 'en',
            label: <div>{trans.common.en} </div>,
            onClick: () => {
              if (lang !== 'en') changeLanguage('en');
            },
          },
        ],
      }}
    >
      <div className='flex flex-row gap-3 items-center bg-slate-100 p-2 rounded'>
        <div className='flex flex-row items-center'>
          <RenderFlag />
        </div>
        <ChevronDownIcon size={16} color={'gray'}/>
      </div>
    </Dropdown>
  );
}

export default ChangeLanguage;
