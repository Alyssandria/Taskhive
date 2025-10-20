import { CompletionOverTime } from "@/components/charts/completion-over-time"
import { TaskPerStatus } from "@/components/charts/tasks-per-status"

export const AdminDashboard = () => {
    return (
        <div>
            Hello From Admin
            <CompletionOverTime />
            <TaskPerStatus />
        </div>
    )
}
