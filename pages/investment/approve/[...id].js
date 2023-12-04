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
          "https://node-backend-v1.onrender.com/api/deposit/one?id=" + id
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
    router.push("/investments");
  }
  async function deleteProduct() {
    await axios.delete(
      "https://node-backend-v1.onrender.com/api/deposit/one?id=" + id
    );
    goBack();
  }

  async function approveDeposit() {
    await axios.patch(
      "https://node-backend-v1.onrender.com/api/deposit/one?id=" + id
    );
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to approve &nbsp;&quot; ₦
        {productInfo?.deposit.toLocaleString()}&quot;?
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
          {productInfo && productInfo.proofOfPayment ? (
            <img
              className="w-1/2 h-1/2"
              src={productInfo.proofOfPayment}
              alt="Proof of Payment"
            />
          ) : (
            <p>No proof of payment available</p>
          )}
        </div>
      )}
    </Layout>
  );
}
