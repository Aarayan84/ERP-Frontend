import Header from "./Header";
import EmployeeSidebar from "./EmployeeSidebar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user") ||"null");

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white z-50">
        {user?.role === "admin" ? (
          <Sidebar />
        ) : (
          <EmployeeSidebar />
        )}
      </aside>

      {/* Main Content */}
      <div className="ml-64">

        {/* Header */}
        <div className="sticky top-0 bg-white shadow">
          <Header />
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;