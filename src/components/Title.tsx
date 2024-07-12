import { PropsWithChildren } from "react";

export type TittleProps = {
  className?: string;
};

const Title = ({ className, children }: PropsWithChildren<TittleProps>) => {
  return (
    <h1 className={`text-left text-[1.5rem] font-semibold ${className}`}>
      {children}
    </h1>
  );
};

export default Title;
