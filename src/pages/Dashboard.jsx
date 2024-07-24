import { useParams } from 'react-router-dom';
import DevDashboard from '../components/Dashboards/DevDeshboard/DevDashboard';
import GradesDashboard from '../components/Dashboards/GradesDashboard/GradesDashboard';
import SubmitDashboard from '../components/Dashboards/SubmitsDashboard/SubmitDashboard';

function Dashboard() {
  const { type } = useParams();

  return (
    <>
      {type == 'dev' && <DevDashboard />}
      {type == 'grades' && <GradesDashboard />}
      {type == 'submits' && <SubmitDashboard />}
    </>
  );
}

export default Dashboard;
