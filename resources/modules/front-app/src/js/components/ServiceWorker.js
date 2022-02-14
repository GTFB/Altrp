const ServiceWorker = async () => {
  if("serviceWorker" in navigator) {
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
