import Header from "../components/Header";
import AdminPanel from "../components/AdminPanel";
import Footer from "../components/Footer";

function AdminPage() {
    return (
        <div className="general_container">
            <Header />
            <AdminPanel />
            <Footer />
        </div>
    );
}

export default AdminPage;
