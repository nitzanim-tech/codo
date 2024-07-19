import GradesDashboard from "../components/Dashboards/StudentDeshboard/GradesDashboard";
import Manager from "../components/Dashboards/Manager/Manager";
import { useParams } from 'react-router-dom';

function Dashboard() {
  const { type } = useParams();

  return (
    <>
      {type == 'grades' && <GradesDashboard />}
      {type == 'progress' && <Manager />}
    </>
  );
}

export default Dashboard;
