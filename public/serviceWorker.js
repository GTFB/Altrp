const ServiceWorker = () => {

  if("serviceWorker" in navigator && window.isProd) {


    const storageName = "serviceWorkerID";
    const cachedName = "serviceWorkerCached"

    const storage = localStorage.getItem(storageName);


    if(!storage) {
      localStorage.setItem(storageName, altrp.version)
    } else if(storage !== altrp.version) {
      navigator.serviceWorker.getRegistration().then(r => {
        r.update()
      })

      localStorage.setItem(cachedName, "0");
      localStorage.setItem(storageName, altrp.version)
    }

    try {

      navigator.serviceWorker.register("/sw.js").then(() => {
        return navigator.serviceWorker;
      }).then((r) => {
        console.log("Service worker started")

       if(localStorage.getItem(cachedName) !== "1" && r.controller && r.controller.state === "activated") {
          const httpRequest = new XMLHttpRequest();

          httpRequest.open("GET", "/service-worker-files");
          httpRequest.send();

          httpRequest.onreadystatechange = () => {
            // if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            //   r.controller.postMessage({
            //     type: "GET_FILENAMES",
            //     filenames: JSON.parse(httpRequest.response)
            //   })
            //   localStorage.setItem(cachedName, "1")
            // }
          };
        }

      })

      return true
    } catch (e) {
      console.log("Service worker not started", e)

      return false
    }
  }
}

ServiceWorker()
