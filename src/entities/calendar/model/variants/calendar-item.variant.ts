import { cva } from "class-variance-authority";

export const calendarItemVariant = cva(undefined, {
  variants: {
    color: {
      red: "bg-red text-white",
      orange: "bg-orange text-white",
      green: "bg-green text-white",
      blue: "bg-blue-accent text-white",
      purple: "bg-purple-500 text-white",
      teal: "bg-teal-500 text-white",
      pink: "bg-pink-500 text-white",
      primary: "bg-primary text-white",
      gray: "bg-gray-500 text-white",
    },
    head: {
      red: "bg-red-accent text-white",
      orange: "bg-orange-accent text-white",
      green: "bg-green-accent text-white",
      blue: "bg-blue text-white",
      purple: "bg-purple-700 text-white",
      teal: "bg-teal-700 text-white",
      pink: "bg-pink-700 text-white",
      primary: "bg-accent text-white",
      gray: "bg-gray-700 text-white",
    },
    position: {
      first: "relative z-10 mr-0 w-[calc(100%_-_3px)] rounded-r-none border-r-0 [&>span]:mr-2.5",
      middle: "relative z-10 mx-0 w-[calc(100%_+_1px)] rounded-none border-x-0",
      last: "ml-0 rounded-l-none border-l-0",
      none: "",
    }
  },
  defaultVariants: {
    color: "primary",
  }
});
