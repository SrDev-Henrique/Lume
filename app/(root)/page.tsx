import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  // console.log(loggedIn);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Olá,"
            user={loggedIn?.name || "Guest"}
            subtext="Controle seus gastos e receitas de forma simples"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250000}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
    </section>
  );
};

export default Home;
