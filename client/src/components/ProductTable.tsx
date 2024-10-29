import React, { useState } from "react";
import { Table } from "antd";
import { Product } from "@shared/types";

const ProductTable = (props: { data: Product[] }) => {
  const { data } = props;
  const dataWithKey = data.map((item) => {
    return { ...item, key: item.id ?? 0 };
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return <Table dataSource={dataWithKey} columns={columns} />;
};

export default ProductTable;
