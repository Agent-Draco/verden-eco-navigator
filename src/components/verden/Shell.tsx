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
      <div className="flex-1 relative flex flex-col min-h-0">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Shell;
