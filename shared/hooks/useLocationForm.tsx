import { Form, Select } from 'antd';
import { useGetDistricts } from '@/shared/schema/services/MetaData';
import useTrans from './useTrans';
import { FormInstance, useWatch } from 'antd/lib/form/Form';
import { uniqBy} from "lodash-es";

type Props = {
  form: FormInstance;
  viewOnly?: boolean;
  provinceKeyName?: string;
  districtKeyName?: string;
  wardKeyName?: string;
  required?: boolean;
  initProvince?: number;
  initDistrict?: number;
};

type OptionType = { value: string; label: string };
type FilterFunc<T> = (input: string, option: T) => boolean;

export default function useLocationForm({
  form,
  viewOnly,
  provinceKeyName,
  // districtKeyName,
  // wardKeyName,
  initProvince,
}: // initDistrict
Props) {
  const provinceId = useWatch(provinceKeyName || 'countryid', form);
  const { trans, lang } = useTrans();

  const { data: districts } = useGetDistricts(provinceId || initProvince,lang, { enabled: !!provinceId || !!initProvince });
  const customFilter: FilterFunc<OptionType> = (input: string, option: OptionType) => {
    return option && option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const FormLocation = () => (
    <>

      <Form.Item
        name={provinceKeyName || 'provinceid'}
        className='col-span-3 lg:col-span-1'
        label={trans.page.agent.agentInformation.province}
      >
        <Select
          showSearch
          placeholder={trans.page.agent.agentInformation.province}
          options={ uniqBy(districts,'value') }
          disabled={viewOnly || !districts}
          onChange={() => {
            // form.setFieldValue(provinceKeyName || "districtid", null)
            // form.setFieldValue(wardKeyName || "wardid", null)
          }}
          filterOption={(input, option) => customFilter(input, option as any )}
          optionFilterProp='label'
        />
      </Form.Item>

    </>
  );

  return { FormLocation };
}
