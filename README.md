# Document Guide

## Before happy code

1. Nodejs 16+
2. Yarn
3. Enable tsLint, prettier in your edior. (Notice setting prettier file path refer to <b>.prettierrc</b>)

## Techstack

- nextjs v13-page router
- ant-design v5
- redux-toolkit
- react-query
- tailwind-css

## How to run

- install lib: `yarn install`
- start dev: `yarn dev`
- format code : `yarn format`
- check lint : `yarn lint`

## Code structure :

- pages : trang web
- shared :
  - components :
    - business : các component theo nghiệp vụ
    - common : các component dùng chung
    - core : các component như table(trình bày bên dưới) , form(trình bày bên dưới)
    - icons : icon export từ figma về thành file svg // hoawjc
    - layout : Page Layout
  - hooks : các custom hook , còn lại sử dụng từ thư viện use-hook
  - mocks : để mockup dữ liệu sử dụng json-server
  - schema:
    - services : chứa các api call sử dụng React-query + Axios(trình bày bên dưới)
      ```
       /*
        *@returns get all exist menu
        */
        export const useGetListMenu = () => {
        return useQuery({
          queryKey: ["getAllMenu"],
          queryFn: () => axiosInstanceAuth.get<IBaseResponse<Menu>>('/sm/auth/menu'),
          })
        }
      ```
    - types : định nghĩa type các đối tượng
      ```
      export interface Menu {
        id: number;
        mainMenu: number;
        title: string;
        icon: string;
        uri: string;
        order: number;
        description: string;
        level: number;
        children: Menu[];
      }
      ```
      - shared-types : Kiểu dữ liệu cơ sở

- stores: quản lý state
- utils:
  - contants: định nghĩa hằng số
  - functions: định nghĩa hàm tiện ích
- styles : ưu tiên dùng tailwindCss, nếu có tạo thêm file thì import vào pages/\_app.tsx
- public :
  - locales : đa ngôn ngữ, sử dụng hook useTrans() để làm đa ngôn ngữ

  ```
  const { trans } = useTrans()
    return (
      <>
        <Head>
          <title>{trans.page[404].pageTitle}</title>
        </Head>
      </>
    )
  ```

## Git flow

- name convention:
  - Tính năng : feature/devname-featureName (Ví dụ feature/sypv-booking)
  - Bug : fix/devname-featureName
  - Refactor: refactor/devname-featureName
- Before create merge
  - Git fetch origin
  - Git rebase origin/develop then do rebase flow
  - Git push -f
  - Don't commit .env.\* file

## React-query for call API

- useQuery: hàm tự động trigger lời gọi API. ví dụ khai báo một useQuery trong customs hook và sử dụng

```
 // khai báo
  export const useGetListMenu = () => {
      return useQuery({
        queryKey: ["getAllMenu"],
        queryFn: () => axiosInstanceAuth.get<IBaseResponse<Menu>>('/sm/auth/menu'),
        onSuccess: (data)=>{

        },
        onError: (err)=>{

        },
        enable: true
      })
    }
// sử dụng
  const { data: menu , isLoading, } = useInitApplicationMenu()
```

Trong phần khai báo có các tham số :

1.  query key : là keyword để cache lại kết quả 1 lời gọi api, thường là một mảng. Có các trường hợp sau cần lưu ý:
    - hai api khác nhau nhưng khai báo cùng key thì apio sau sẽ lấy kết quả của api trước trong cache
    - nếu key là một mảng tham số thì khi tham số thay đổi api sẽ được refetch
    ```
      useQuery({
          queryKey: ["getAllMenu", page],  // khi page thay đổi ==> function sẽ được gọi lại
          queryFn: () => axiosInstanceAuth.get<IBaseResponse<Menu>>('/sm/auth/menu'),
        })
    ```
2.  query Function : là function call api
3.  onSuccess : là function trigger khi api gọi thành công, nhận vào kết quả
4.  onError : là function trigger khi api gọi thất bại, nhận vào lỗi
    > api được coi là thành công hay thất bại được cấu hình trong file Axios.tsx. Hiện tại hầu hết api trong hệ thống đều trả về status 200 và handle lỗi trong data trả về
5.  enable : là biến boolean quyết định xem api có được phép call không

```
    useQuery({
        queryKey: ["getDetail", id],  // khi id thay đổi ==> function sẽ được gọi lại
        queryFn: () => axiosInstanceAuth.get<IBaseResponse<Menu>>('/sm/auth/menu'),
        enable: !!id  // chỉ gọi khi có id
    })
```

Kết quả trả về có các thành phần :

1. data: dữ liệu trả về
2. loading : apo có đang loading hay không

- UseMutation: manual trigger call api

```
  export const useDeleteSubAgent = (onSuccessHandle?: () => void) => {
  const queryClient = useQueryClient()
  const { trans } = useTrans()
  return useMutation({
      mutationFn: ({ listIds }: { listIds: React.Key[] }) => axiosInstanceAuth.put('/agents/delete-sub-agent', { listIds }),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
          notification.success({ message: trans.common.notify.deleteSuccess(trans.page.agent._) })
          if (onSuccessHandle) onSuccessHandle()
      },
      onError: (err) => {
          console.log(err)
          notification.error({ message: "Delete Sub Agents fail" })
      }
  })
}

// use
 const useDelete = useDeleteSubAgent(() => {
      Modal.destroyAll()
      setSelectedRowKeys([])
  })

  useDelete.mutate({ listIds: selectedRowKeys })}
```

tham khảo thêm tại : https://tanstack.com/query/v3/docs/react/overview

# Form (antd)

1. Init form instance

```
const [form] = useForm()
```

2. Create Form UI

```
<Form
      form={form}
      onFinish={onFinish}
      ...props
    >
      <Form.Item
          name='agentName'    // name of input
          label={trans.page.agent.agentName}
          rules={[
            { required: false, message: trans.common.form.require },
            {
              pattern: APP_REGEX.VietnameseRegex,
              message: 'Nhập tên tiếng Việt',
            },
          ]}  // rule validate
        >
          <Input placeholder='agentName' />  // input type
        </Form.Item>
</Form>
```

3. Manipulate Form

- Theo dõi value input :

```
  const agentName = form.watch(agentName)
```

- setValue for input :
  toàn form :
  ```
    form.setFieldsValue({
    agentName: 'newValue'
  })
  ```
  field đơn lẻ :
  ```
    form.setFieldValue('agentName','newValue')
  ```
- setFieldError:
  form.setFields({name : 'agentName' , errors : 'Field errors'})

> Tham khảo thêm tại đây: https://ant.design/components/form#fielddata

# Table

- Khởi tạo table
  1. Định nghĩa columns

```
   const columns: ColumnsType<Agent> = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }]
```

2.  Định nghĩa inputSearch

```
 const [inputs, setInputs] = useState<InputType[]> ([
        {
            id: 1,
            field: 'agentName',
            label: 'Tên đại lý',
            active: true,
            inputType: 'text',
            fieldType: 'STRING',
            op: 'LIKE',
            value: getFieldValueOnSearchParam('agentName')
        }
      ])
```

3.  Định nghĩa api Pagination

```
  export const useGetListAgent = () => {
      return usePagination<IBaseResponse<IBaseResponseWithCount<Agent[]>>>({
          queryKey: [QUERY_KEY],
          apiFn: (params) => axiosInstanceAuth.post<IBaseResponse<IBaseResponseWithCount<Agent[]>>>('/agents/search', { ...params }),
          defaultParams: {
              page: 0,
              size: 10,
              sorts: [{ field: 'updatedDate', direction: 'DESC' }]
          },

      })
  }
```

4. Sử dụng dữ liệu

```
const { data, pageSize, tablePaginationConfig, isLoading, onChangeSearchParams, getFieldValueOnSearchParam, onChangeMultiSearchParams } = useGetListAgent()

<Table
rowSelection={rowSelection}
columns={columns}
dataSource={data?.data?.content?.map(item => ({ ...item, key: item.id }))}
pagination={false}
scroll={{ x: 'max-content' }}
loading={isLoading}
rowKey={'id'} />
```

4. Manipulate search

- Backend sử dụng CriteriaBuilder cho phần search, để search ta sử dụng post api truyền lên body

```
  export interface ISearchParams {
    page: number,
    size: number,
    filters?: Filter[] | [],
    sorts?: Sort[] | []
  }

  export type Filter = {
    field: string,
    op: OpType,
    value: any,
    fieldType: FieldType
  }
  export type Sort = {
    field: string,
    direction: Direction
  }

```

- Trong hook usePagination trả về hàm onChangeSearchParam(Filter) và onChageMultipSearchParam(Filter[]) để thay đổi body search

# CRUD FOLLOW

- Create folder theo cấu trúc
- Define model , service in /shared/schema/models/
- Create screen table
- Create common form for create, update and detail
- Create screen create , update and detail
