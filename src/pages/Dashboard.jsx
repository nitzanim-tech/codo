import GradesDashboard from "../components/Dashboards/StudentDeshboard/GradesDashboard";
import Manager from "../components/Dashboards/Manager/Manager";
import { useParams } from 'react-router-dom';
import Status from "../components/Dashboards/Manager/Status";
function Dashboard() {
  const { type } = useParams();

  return (
    <>
      {type == 'grades' && <GradesDashboard />}
      {type == 'progress' && <Manager />}
      {type == 'status' && <Status />}
    </>
  );
}

export default Dashboard;
