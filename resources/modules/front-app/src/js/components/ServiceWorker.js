const ServiceWorker = async () => {

  if("serviceWorker" in navigator && window.isProd) {


    const storageName = "serviceWorkerID";

    const storage = localStorage.getItem(storageName);


    if(!storage) {
      localStorage.setItem(storageName, altrp.version)
    } else if(storage !== altrp.version) {
      navigator.serviceWorker.getRegistration().then(r => {
        r.update()
      })

      localStorage.setItem(storageName, altrp.version)
    }

    try {
      const r = await navigator.serviceWorker.register("/sw.js")

      console.log("Service worker started")

      return true
    } catch (e) {
      console.log("Service worker not starsted", e)

      return false
    }
  }
}

export default ServiceWorker
