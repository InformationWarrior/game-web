// import React from "react";
// import useAccountBalance from "../hooks/useAccountBalance";

// const Home = () => {
//   const { address, balance, isConnected, isLoading, isError } =
//     useAccountBalance();

//   if (!isConnected) return <p>Please connect your wallet.</p>;

//   if (isLoading) return <p>Loading balance...</p>;

//   if (isError) return <p>Failed to fetch balance. Please try again later.</p>;

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Welcome!</h1>
//       <p>
//         <strong>Wallet Address:</strong> {address}
//       </p>
//       <p>
//         <strong>Balance:</strong> {balance} ETH
//       </p>
//     </div>
//   );
// };

// export default Home;
