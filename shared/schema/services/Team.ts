import React from "react";
import usePagination from "@/shared/hooks/usePagination";
import {useMutation, useQuery, useQueryClient, UseQueryOptions} from "@tanstack/react-query";
import useTrans from "@/shared/hooks/useTrans";
import {notification} from 'antd'
import {axiosInstanceAuth, axiosInstanceAuth as axiosInstanceDev} from '@/shared/configs/Axios'
import {IBaseCreated, IBaseWithCount} from "@/shared/schema/shared-types/IBaseResponse";
import router, {useRouter} from "next/router";
import {URLS} from "@/shared/utils/constants/appMenu";
import {dummyITeamData, ITeam} from "@/shared/schema/types/ITeam";


const QUERY_KEY_CHILDREN = 'getListTeam'

export const useGetListTeam = () => {
    return usePagination<IBaseWithCount<ITeam[]>>({
        queryKey: [QUERY_KEY_CHILDREN],
        apiFn: (params) => axiosInstanceDev.search<ITeam[]>('/rest/entities/team/search', { ...params }),
        defaultData : {count : 1 , data : dummyITeamData}
    })
}



export const useGetDetailTeam = ({id, options}: { id: React.Key, options?: Partial<UseQueryOptions> }) => {
    return useQuery({
        queryKey: [QUERY_KEY_CHILDREN, 'get-detail', id],
        queryFn: () => axiosInstanceAuth.get<ITeam>('/rest/entities/Team/' + id),
        select(data) {
            return data
        },
        enabled:options?.enabled
    })
}


export const useCreateTeam = (onSuccessHandle?: () => void) => {
    // const queryClient = useQueryClient()
    const { trans } = useTrans()
    return useMutation({
        mutationFn: (Team: ITeam) => axiosInstanceAuth.post<IBaseCreated>('/rest/entities/Team', Team),
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CHILDREN] })
            router.push(URLS.TEAM+'/detail/'+data.id)
            notification.success({message: trans.common.notify.createSuccess(trans.page.team._), placement:'top'})
            if (onSuccessHandle) onSuccessHandle()
        },
        onError: (err: any) => {
            notification.error({ message: err?.response?.data?.message || trans.common.notify.createFail(trans.page.team._), placement:'top' })
        }
    })
}

export const useUpdateTeam = (onSuccessHandle?: () => void) => {
    const router = useRouter()
    const { trans } = useTrans()
    return useMutation({
        mutationFn: ({ team, id }: { team: ITeam, id: React.Key }) => axiosInstanceDev.put<IBaseCreated>(`/rest/entities/Team/${id}`, team),
        onSuccess: (data) => {
            router.push(URLS.TEAM+'/detail/'+ data.id)
            notification.success({ message: trans.common.notify.editSuccess(trans.page.team._), placement:'top' })
            if (onSuccessHandle) onSuccessHandle()
        },
        onError: (err: any) => {
            notification.error({ message: err?.response?.data?.message || trans.common.notify.editFail(trans.page.team._), placement:'top' })
        }
    })
}

export const useChangeStatusTeam = () => {
  const queryClient = useQueryClient();
  const { trans } = useTrans();
  return useMutation({
    mutationFn: ({ id, status }: { id?: React.Key; status: string }) =>
      axiosInstanceAuth.put(`/public/v1/Team/${id}/change-status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CHILDREN, 'get-detail'] });
      notification.success({ message: trans.common.notify.changeStatusSuccess, placement: 'top' });
    },
    onError: (err: any) => {
      notification.error({ message: err?.response?.data?.message || trans.common.notify.changeStatusFail, placement: 'top' });
    },
  });
};
