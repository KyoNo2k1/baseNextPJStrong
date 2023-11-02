import {useGetCountries, useGetCurrencies, useGetTimeZone} from "@/shared/schema/services/MetaData";
import {useAppDispatch} from "@/shared/hooks/useRedux";
import {
  setCountries,
  setCountriesOptions,
  setCurrencies,
  setCurrenciesOptions,
   setPhoneCodeOptions,
  setTimeZone, setTimeZoneOptions
} from "@/shared/stores/appSlice";

function UseMasterData() {
  const {data : currencies , } = useGetCurrencies()
  const {data : countries} = useGetCountries()
  // const {data : languages} = useGetLanguages()
  const {data: timezones } = useGetTimeZone()

  const currencyOption = currencies?.map(item=>({value : item.id , label : item.currency}))||[]
  const countriesOption = countries?.map(item=>({value : item.id , label : item.countryIssue}))||[]
  const timezoneOption = timezones?.map(item=>({value : item.timeZoneFrom , label : item.timeZoneFrom}))||[]
  const phoneCodeOption = timezones?.map(item=>({value : item.phoneCode , label : item.phoneCode}))||[]

  const dispatch = useAppDispatch()

  dispatch(setCurrencies(currencies||[]))
  dispatch(setCountries(countries||[]))
  // dispatch(setLanguage(languages||[]))
  dispatch(setTimeZone(timezones||[]))
  dispatch(setCurrenciesOptions(currencyOption||[]))
  dispatch(setCountriesOptions(countriesOption||[]))
  dispatch(setTimeZoneOptions(timezoneOption||[]))
  dispatch(setPhoneCodeOptions(phoneCodeOption||[]))
}

export default UseMasterData;
