const ServiceWorker = async () => {

  if("serviceWorker" in navigator) {

    const storageName = "serviceWorkerID";

    const storage = localStorage.getItem(storageName);

    if(!storage) {
      console.log("added")
      localStorage.setItem(storageName, window.__version__)
    } else if(storage !== window.__version__) {
      console.log("need update")
      navigator.serviceWorker.getRegistration().then(r => {
        r.update()
      })

      localStorage.setItem(storageName, window.__version__)
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
