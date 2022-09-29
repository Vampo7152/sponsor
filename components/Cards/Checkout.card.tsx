import axios from "axios";
import { useState, FC, useEffect, useMemo } from "react";
import data from "../../public/data.json";
import { CheckoutButton } from "@candypay/react-checkout-sdk";
import CoinGek from "coingecko-api";

const CheckoutCard: FC = () => {
  const [amount, setAmount] = useState<number | null>(data.defaultAmounts[1]);
  const [loading, setLoading] = useState<boolean>(false);
  const defaultAmounts = data.defaultAmounts;

  const client = new CoinGek();

  const fetchSessionId = async () => {
    const res = await client.coins.fetch("solana", {}).then(res => {
      return res.data.market_data.current_price.usd;
    });

    const amnt = amount! / res;
    const roundedAmnt = Math.round(amnt * 10000) / 10000;

    const { data } = await axios.post("/api/candypay", {
      amount: roundedAmnt,
    });

    return data.session_id;
  };

  return (
    <>
      <div className="z-50 mt-10 flex w-[90vw] flex-col items-center space-y-5 rounded-md bg-darkerBlue p-10 px-5 shadow-xl sm:w-[436px] sm:px-10">
        <h2 className="font-ClashDisplay text-3xl font-semibold text-accent">
          Love what I do? Feel free to support me with a donation!
        </h2>
        <p className="text-[#E3E3E3]">
          Thanks in advance. Each donation of yours means a lot, however little
          it might be!
        </p>
        <div className="group flex w-full items-center rounded-lg bg-[#E9F9FA]/30 text-white focus:outline-none">
          <p className="rounded-l-lg bg-[#E7EAEA]/80 px-4 py-3 text-lg uppercase text-black opacity-80 transition duration-200 group-hover:opacity-100">
            {data?.currency}
          </p>
          <input
            type="number"
            value={amount ? amount : ""}
            className="w-full rounded-lg bg-transparent px-4 py-3 text-white opacity-80 transition duration-200 focus:outline-none group-hover:opacity-100"
            placeholder="Enter Amount"
            onChange={e => setAmount(parseInt(e.target.value))}
          />
        </div>
        <div className="flex w-full items-center space-x-2">
          {defaultAmounts.map(buttonAmount => (
            <button
              className={`${
                amount === buttonAmount ? "bg-accent" : "bg-[#E7EAEA]/80"
              }  rounded-full px-6 py-3 opacity-90 transition duration-200 hover:opacity-100`}
              onClick={() => setAmount(buttonAmount)}
              key={buttonAmount}
            >
              $&nbsp;{buttonAmount}
            </button>
          ))}
        </div>

        <CheckoutButton handleSession={fetchSessionId} />
      </div>
    </>
  );
};

export default CheckoutCard;
