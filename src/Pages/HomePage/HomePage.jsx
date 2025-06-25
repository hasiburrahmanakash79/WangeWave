
import DashboardCard from './DashboardCard';
import VisitorsChart from './VisitorsChart';

const HomePage = () => {
    return (
        <div className='space-y-7'>
            <DashboardCard/>
            <VisitorsChart/>
        </div>
    );
};

export default HomePage;