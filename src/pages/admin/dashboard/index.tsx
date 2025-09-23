import AdminLayout from "@/components/layouts/AdminLayout";
import Dashboard from "@/components/views/Admin/Dashbaord";

const DashboardPage = () => {
  return (
    <>
        <AdminLayout title="Dashboard" description="Dashboard">
            <Dashboard />
        </AdminLayout>
    </>
  );
};

export default DashboardPage;