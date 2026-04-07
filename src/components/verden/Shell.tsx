import { ReactNode } from "react";
import SidebarNav from "./SidebarNav";
import BottomNav from "./BottomNav";

interface ShellProps {
  children: ReactNode;
}

const Shell = ({ children }: ShellProps) => {
  return (
    <div className="flex w-screen h-screen bg-background overflow-hidden">
      <SidebarNav />
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <main className="flex-1 relative overflow-hidden">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Shell;
