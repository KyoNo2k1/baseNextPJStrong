import { FormInstance, FloatButton, Modal, Button } from 'antd';
// import { NamePath } from 'rc-field-form/es/interface';
import { useState } from 'react';

type Props = {
  form: FormInstance;
  data: any;
};

const passingJsonErr = {
  title: 'Error when passing json to object',
  content: (
    <>
      Please check your json format, or reset its values
    </>
  ),
};

function AddDataToForm({ form, data }: Props) {
  const [isConfirmModalShown, setIsConfirmModalShown] = useState(false);
  const [formData, setFormData] = useState(JSON.stringify(data, null, 2));
  const [modal, contextHolder] = Modal.useModal();

  return (
    <>
      {process.env.NODE_ENV === 'development' ?
        <>
          <FloatButton
            tooltip={'Add mock data to form'}
            onClick={() => {
              setIsConfirmModalShown(true);
            }}
          />

          {isConfirmModalShown &&
            <>
              <Modal
                open={isConfirmModalShown}
                zIndex={300}
                className='w-fit'
                title={'Add data to form'}
                centered
                onCancel={() => setIsConfirmModalShown(false)}
                footer={[
                  <Button key="cancel" onClick={() => setIsConfirmModalShown(false)}>
                    Cancel
                  </Button>,
                  <Button key="reset" onClick={() => {
                    setFormData(JSON.stringify(data, null, 2));
                  }}>
                    Reset values
                  </Button>,
                  <Button key="ok" type="primary"
                    onClick={() => {
                      try {
                        form.setFieldsValue(JSON.parse(formData));
                        setIsConfirmModalShown(false);
                      } catch (error) {
                        modal.error(passingJsonErr);
                      }
                    }}
                  >
                    OK
                  </Button>,
                ]}
              >
                <textarea
                  className='w-fit text-base font-medium outline-none focus:outline-none  border-none shadow-lg rounded-sm p-6 m-6'
                  cols={60}
                  rows={20}
                  spellCheck="false"
                  value={formData}
                  onChange={e => {
                    setFormData(e.target.value);
                  }}
                >
                </textarea>
                {contextHolder}
              </Modal>
            </>
          }
        </>
        :
        <></>
      }
    </>
  );
}

export default AddDataToForm;
