import DashBoardLayout from '@/shared/components/layouts/dashboard/DashboardLayout';

const Home = () => {
  return (<div>
    Home
  </div>)
};

Home.getLayout = (children: React.ReactNode) => (
  <DashBoardLayout contentClass='bg-white'>{children}</DashBoardLayout>
);
export default Home;
