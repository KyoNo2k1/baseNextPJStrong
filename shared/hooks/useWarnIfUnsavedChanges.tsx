import { useEffect } from 'react'
import Router from "next/router"

/**
*  @deprecated use DiscardContentWarning instead
* */
const useWarnIfUnsavedChanges = (unsavedChanges: boolean, callback?: () => void) => {
  useEffect(() => {
    if (unsavedChanges) {
      const routeChangeStart = () => {
        const ok =  confirm("Chờ đã! Nội dung bạn đang chỉnh sửa chưa được lưu lại. Nếu bạn rời đi nội dung sẽ bị mất!")
        if(callback)  callback()
        if (!ok) {
          Router.events.emit("routeChangeError")
          throw "Abort route change. Please ignore this error."
        }
      }

      // const handleRefresh = (event: BeforeUnloadEvent) => {
      //   event.preventDefault();
      //   event.returnValue = 'Chờ đã! Nội dung bạn đang chỉnh sửa chưa được lưu lại. Nếu bạn rời đi nội dung sẽ bị mất!';
      // };
      // window.addEventListener('beforeunload', handleRefresh);
      Router.events.on("routeChangeStart", routeChangeStart)
      return () => {
        Router.events.off("routeChangeStart", routeChangeStart)
        // window.removeEventListener('beforeunload', handleRefresh);
      }
    }
  }, [unsavedChanges])



}
export default useWarnIfUnsavedChanges
