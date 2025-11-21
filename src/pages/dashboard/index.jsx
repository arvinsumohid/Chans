import ProtectedRoute from "../../routes/ProtectedRoute"
import EventCalendar from "../../components/EventCalendar"

const DashboardPage = () => {
    return (
    // <EventCalendar />
    <h1>Dashboard Page</h1>
    )
}

const ProtectedDashboardPage = ProtectedRoute(DashboardPage);

export default ProtectedDashboardPage