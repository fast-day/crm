let locks = 0;
let prevOverflow = "";
let prevPaddingRight = "";

export const lockBodyScroll = () => {
  if (locks++ === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    prevOverflow = document.body.style.overflow;
    prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    if (--locks === 0) {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    }
  };
}
