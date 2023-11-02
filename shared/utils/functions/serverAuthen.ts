export interface ICheckedPermission {
    permissionCodes: string[],
}

export async function checkPermission(body: ICheckedPermission, token: string | undefined) {
    return null;
    try {
          if (token === undefined) {
              return { destination: '/login', permanent: true }
          }
          const res = await fetch(`${process.env.NEXT_PUBLIC_DEV_API_URL}/rest/services/service_permission/validatePermissions`, {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(body),
              cache: 'default'
          })
          const response = await res.json();
          if(typeof response === 'object'){
            if(Object.values(response).some(value => value!=='ALLOWED'))
              return { destination: '/login', permanent: true }
            else return null
          } else {
              return null
          }
      } catch (e) {
          return { destination: '/login', permanent: true }
      }
}
