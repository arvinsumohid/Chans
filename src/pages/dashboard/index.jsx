import ProtectedRoute from "../../routes/ProtectedRoute"

const DashboardPage = () => {
    return (
        <div>DashboardPage</div>
    )
}

const ProtectedDashboardPage = ProtectedRoute(DashboardPage);

export default ProtectedDashboardPage