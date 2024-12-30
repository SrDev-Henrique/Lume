import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const loggedIn = {
    firstName: "Henrique", lastName: "Albuquerque",
    email: 'halbuquerque2850@gmail.com'
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Bem-vindo"
            user={loggedIn?.firstName || "Guest"}
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

      <RightSidebar user={loggedIn} transactions={[]} banks={[1]} />
    </section>
  );
};

export default Home;
