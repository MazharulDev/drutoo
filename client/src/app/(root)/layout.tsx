"use client";

import { Layout} from "antd";


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      {children}
    </Layout>
  );
};

export default RootLayout;
