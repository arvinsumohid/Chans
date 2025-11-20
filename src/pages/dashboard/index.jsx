import ProtectedRoute from "../../routes/ProtectedRoute"
import EventCalendar from "../../components/EventCalendar"

const DashboardPage = () => {
    return (
    <EventCalendar />
    )
}

const ProtectedDashboardPage = ProtectedRoute(DashboardPage);

export default ProtectedDashboardPage