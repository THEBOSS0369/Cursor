import { useEffect } from "react";

export const useAutoHeight = (
  ref: React.RefObject<HTMLTextAreaElement | null>
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const adjustHeight = () => {
      element.style.height = "auto";
      element.style.height = Math.min(element.scrollHeight, 120) + "px";
    };

    element.addEventListener("input", adjustHeight);
    return () => element.removeEventListener("input", adjustHeight);
  }, [ref]);
};
