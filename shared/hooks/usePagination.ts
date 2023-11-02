import {useQuery} from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';

type Props<T> = {
  apiFn: (_params?: Record<string, any>) => Promise<T>;
  queryKey?: any;
  defaultParams?: Record<string, any>;
  defaultData? : T
};

export default function usePagination<T>({queryKey, apiFn, defaultParams , defaultData}: Props<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname()
  const pageIndex = parseInt(searchParams.get('page') as string) ?? defaultParams?.page ?? 0;
  const pageSize = parseInt(searchParams.get('size') as string) ?? defaultParams?.size ?? 10
  /* more params here */

  function updateQueryParams(params: Record<string, any>) {
    const oldQuery = Object.fromEntries(searchParams)
    for (const [param, value] of Object.entries(params)) {
      if (value === undefined) {
        delete oldQuery[param];
      } else {
        oldQuery[param] = value;
      }
    }
    const urlSearchParam = new URLSearchParams(oldQuery)
    const search = urlSearchParam.toString() ? `?${urlSearchParam.toString()}`:''
    router.push(pathName+search);
  }

  function onChangeOneParams(param: string , value: any) {
    updateQueryParams({ [param]: value });
  }

  function onChangeMultiParams(params: Record<string, any>) {
    updateQueryParams(params);
  }

  const {data = defaultData, isLoading, refetch} = useQuery({
    queryKey: [...queryKey, Object.fromEntries(searchParams)],
    queryFn: () => apiFn({page: pageIndex, size: pageSize}),
  });
  const tableConfig = {
    current: (isNaN(pageIndex) ? 0 : pageIndex) + 1,
    pageSize: isNaN(pageSize) ? 10 : pageSize,
    /* @ts-ignore */
    total: data?.count,
    showSizeChanger: true,
    onChange: (page: number, pageSize?: number) => {
      onChangeOneParams('page', page - 1);
      if (pageSize) {
        onChangeOneParams('size', pageSize);
      }
    },
    onShowSizeChange: (current: number, size: number) => {
      onChangeOneParams('size', size);
    },

  };
  return {
    data,
    tableConfig,
    isLoading,
    refetch,
    pageIndex,
    pageSize,
    onChangeOneParams,
    onChangeMultiParams,
  };
}
