import { useEffect, useRef, type DependencyList, type EffectCallback } from "react";

export const useUpdateEffect = (effect: EffectCallback, deps: DependencyList) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
  }, deps);
}
