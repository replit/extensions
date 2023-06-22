import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div>
    <div>asdf</div>
    <div>
      {children}
    </div>
  </div>
}