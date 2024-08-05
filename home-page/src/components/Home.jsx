import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState({
    name: "Adrian",
    email: "adrian@jsmastery.pro",
    balance: 110.00,
    accountNumber: "1234 5678 9101 1121",
    bankInfo: {
      bankName: "Bank of Example",
      branch: "Main Branch",
      accountType: "Checking"
    },
    transactions: []
  });

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchTransactions = () => {
      setTimeout(() => {
        const transactions = [
          { id: 1, description: "Uber 063015 SFPOOL", amount: 5.40, date: "Wed, Apr 24, 5:30 AM", status: "Success", channel: "Online", category: "Travel" },
          { id: 2, description: "United Airlines", amount: -500.00, date: "Mon, Apr 22, 5:30 AM", status: "Success", channel: "In Store", category: "Travel" },
          { id: 3, description: "McDonalds", amount: 12.00, date: "Sun, Apr 21, 5:30 AM", status: "Success", channel: "In Store", category: "Food and Drink" },
        ];

        const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 110.00);

        setUser(prevState => ({
          ...prevState,
          transactions: transactions,
          balance: balance
        }));
      }, 1000); // Simulate a delay
    };

    fetchTransactions();
  }, []);

  return (
    <div className="home-container">
      <div className="box">
        <section className='section1'>
          <h1>Welcome {user.name}</h1>
          <p>Access & manage your account and transactions efficiently.</p>
        </section>
        <section className="balance section2">
          <h2>Total Current Balance</h2>
          <p>${user.balance.toFixed(2)}</p>
        </section>
      </div>
      <div className="main-content">
        <section className="transactions">
          <h2>Recent transactions</h2>
          <table>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Channel</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {user.transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.channel}</td>
                  <td>{transaction.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="account-info">
          <h2>Account Information</h2>
          <p><strong>Account Number:</strong> {user.accountNumber}</p>
          <p><strong>Bank Name:</strong> {user.bankInfo.bankName}</p>
          <p><strong>Branch:</strong> {user.bankInfo.branch}</p>
          <p><strong>Account Type:</strong> {user.bankInfo.accountType}</p>
        </section>
      </div>
    </div>
  );
}

export default Home;

