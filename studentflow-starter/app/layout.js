import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import TaskProvider from "@/components/TaskProvider";

export const metadata = {
  title: "StudentFlow",
  description: "Student Course & Task Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* TODO: Add TaskProvider, Navbar, Footer */}
        <TaskProvider>
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </TaskProvider>
      </body>
    </html>
  );
}
