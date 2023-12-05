import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdVerified } from "react-icons/md";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get("https://node-backend-v1.onrender.com/api/withdraw")
        .then((response) => {
          setProducts(response.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <Layout>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Amount</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {loading
            ? "Loading..."
            : products.map(
                (product) =>
                  product.approved === false && (
                    <tr key={product._id}>
                      <td>₦{product.withdraw.toLocaleString()}</td>
                      <td>
                        <Link
                          className="btn-default bg-green-400 text-red-500"
                          href={"/withdraw/approve/" + product._id}
                        >
                          <MdVerified />
                          Approve
                        </Link>
                      </td>
                    </tr>
                  )
              )}
        </tbody>
      </table>
    </Layout>
  );
}
