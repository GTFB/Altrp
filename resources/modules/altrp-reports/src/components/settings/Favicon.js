import React, { useEffect } from "react";
import useGlobalSettings from "../../hooks/useGlobalSettings";
import MediaControl from "../painter/controls/MediaControl";

const Favicon = () => {
  const [url, setUrl] = useGlobalSettings("favicon", "./favicon.ico");

  useEffect(() => {
    const favicon = document.querySelector("link[rel*='icon']");
    favicon.href = url;
  }, [url]);

  return <MediaControl name="Favicon" value={url} onChange={setUrl} />;
};

export default Favicon;
