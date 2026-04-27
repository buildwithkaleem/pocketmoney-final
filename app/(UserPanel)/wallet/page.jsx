

import AppBar from '@/components/AppBar';
import BottomNav from '@/components/BottomNav';
import AddPaymentMethod from '@/components/wallet/AddPaymentMethod';
import SummaryCard from '@/components/wallet/SummaryCard';
import WithdrawalBox from '@/components/wallet/WithdrawalBox';
import WithdrawalHistory from '@/components/wallet/WithdrawalHistory';

const Page = () => {
  return (
    <div>
      <AppBar />

      {/* 🔥 Each component handles its own API */}
      <SummaryCard />
      <AddPaymentMethod />
      <WithdrawalBox />
      <WithdrawalHistory />

      <BottomNav />
    </div>
  );
};

export default Page;