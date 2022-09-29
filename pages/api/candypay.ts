import { NextApiRequest, NextApiResponse } from "next";
import { CandyPay } from "@candypay/checkout-sdk";
import data from "../../public/data.json";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://sponsor-demo.vercel.app"
    : "https://localhost:3000";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { amount } = req.body;

  const sdk = new CandyPay({
    api_key: process.env.CANDYPAY_PRIVATE_API_KEY!,
    network: "devnet",
  });

  try {
    const response = await sdk.session.create({
      amount: amount,
      recipient: data.walletAddress,
      success_url: "https://sponsor-z4re.vercel.app/success",
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      error: "hehe",
    });
  }
};

export default handler;
