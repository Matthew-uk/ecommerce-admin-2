import multiparty from "multiparty";
import fs from "fs";
import mime from "mime-types";
import { mongooseConnect } from "@/lib/mongoose";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

const bucketName = "dawid-next-ecommerce";

export default async function handle(req, res) {
  await mongooseConnect();
  // await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const links = [];

  for (const file of files.file) {
    try {
      const ext = file.originalFilename.split(".").pop();
      const newFilename = Date.now() + "." + ext;
      const newPath = `${newFilename}`; // Adjust the path accordingly

      // Read the file and save it locally
      const fileBuffer = fs.readFileSync(file.path);
      fs.writeFileSync(newPath, fileBuffer);

      const link = `${newPath}`;
      console.log(newPath);
      links.push(link);
    } catch (error) {
      console.error("Error saving file locally:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
