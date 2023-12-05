import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(
          "https://node-backend-v1.onrender.com/api/withdraw/one?id=" + id
        );
        setProductInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  function goBack() {
    router.push("/withdraw");
  }
  async function deleteProduct() {
    await axios.delete(
      "https://node-backend-v1.onrender.com/api/withdraw/one?id=" + id
    );
    goBack();
  }

  async function approveDeposit() {
    await axios.patch(
      "https://node-backend-v1.onrender.com/api/withdraw/one?id=" + id
    );
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to approve &nbsp;&quot; ₦
        {productInfo?.withdraw.toLocaleString()}&quot; withdrawal?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={approveDeposit} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div>
      {loading ? (
        "Loading"
      ) : (
        <div className="image flex justify-center items-center max-w-sm mt-2">
          {productInfo && productInfo ? (
            <div className=" w-full rounded-md bg-gray-600 text-white p-2">
              <p>Bank Name: {productInfo.accountName}</p>
              <p>Account Number: {productInfo.accountNumber}</p>
              <p>Account Name: {productInfo.bankName}</p>
            </div>
          ) : (
            <p>No proof of payment available</p>
          )}
        </div>
      )}
    </Layout>
  );
}
