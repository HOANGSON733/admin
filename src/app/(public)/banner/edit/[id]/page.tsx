"use client"; 

import React from "react";
import { useParams } from "next/navigation";
import BannerForm from "@/components/banner/BannerForm";

const EditBannerPage: React.FC = () => {
  const { id } = useParams(); // Dùng useParams để lấy id từ URL

  return (
    <>
      {id && <BannerForm id={Number(id)} isEdit={true} />}
    </>
  );
};

export default EditBannerPage;
