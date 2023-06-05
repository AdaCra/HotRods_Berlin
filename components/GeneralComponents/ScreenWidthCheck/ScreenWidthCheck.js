import { useEffect, useState } from "react";

export default function ScreenWidthCheck() {
  const [displayWidth, setDisplayWidth] = useState(null);

  useEffect(() => {
    function handleResize() {
      setDisplayWidth(window.innerWidth);
    }
    setDisplayWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return displayWidth;
}
