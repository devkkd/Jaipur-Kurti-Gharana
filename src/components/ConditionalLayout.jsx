"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  const [announcementVisible, setAnnouncementVisible] = useState(true);

  if (isAdminRoute) return <>{children}</>;

  return (
    <>
      <div className="sticky top-0 w-full z-50">
        {/* <AnnouncementBar onVisibilityChange={setAnnouncementVisible} /> */}
        <Header />
      </div>

      <main className="">
        {children}
      </main>

      <Footer />
    </>
  );
}
