import { HTMLAttributes } from "react";

export const h1 = ({ children }: HTMLAttributes<'h1'>) => <h1 id={typeof children === "string" ? children.toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '') : undefined}>{children}</h1>;

export const h2 = ({ children }: HTMLAttributes<'h2'>) => <h2 id={typeof children === "string" ? children.toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '') : undefined}>{children}</h2>;

export const h3 = ({ children }: HTMLAttributes<'h3'>) => <h3 id={typeof children === "string" ? children.toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '') : undefined}>{children}</h3>;

export const h4 = ({ children }: HTMLAttributes<'h4'>) => <h4 id={typeof children === "string" ? children.toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '') : undefined}>{children}</h4>;

export const h5 = ({ children }: HTMLAttributes<'h5'>) => <h5 id={typeof children === "string" ? children.toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '') : undefined}>{children}</h5>;

export const h6 = ({ children }: HTMLAttributes<'h6'>) => <h6 id={typeof children === "string" ? children.toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '') : undefined}>{children}</h6>;