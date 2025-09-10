import { MenuProps } from "antd";
import {
  TableOutlined,
  HomeOutlined,
  TranslationOutlined,
  SendOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/`}>Home</Link>,
      key: "Home",
      icon: <HomeOutlined />,
    },
  ];
  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Money Transfer",
      icon: <SendOutlined />,
      key: `/${role}/transfer`,
      children: [
        {
          label: <Link href={`/${role}/send-money`}>Send Money</Link>,
          key: `/${role}/send-money`,
          icon: <SendOutlined />,
        },
        {
          label: <Link href={`/${role}/cashout`}>Cashout</Link>,
          key: `/${role}/cashout`,
          icon: <SafetyOutlined />,
        },
      ],
    },
    {
      label: <Link href={`/${role}/transactions`}>Transactions History</Link>,
      icon: <TranslationOutlined />,
      key: `/${role}/transactions-history`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label:"Manage User",
      icon: <TableOutlined />,
      key: `/${role}/manage-user`,
      children: [
        {
          label: <Link href={`/${role}/manage-user`}>Manage User</Link>,
          key: `/${role}/manage-user`,
          icon: <TableOutlined />,
        },
        {
          label: <Link href={`/${role}/manage-agent`}>Manage Agent</Link>,
          key: `/${role}/manage-agent`,
          icon: <TableOutlined />,
        },
      ],
    },
  ];

  const agentSidebarItem: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/cashin`}>Cash In</Link>,
      icon: <SendOutlined />,
      key: `/${role}/cashin`,
    },
    {
      label: <Link href={`/${role}/transactions`}>Transactions History</Link>,
      icon: <TranslationOutlined />,
      key: `/${role}/transactions-history`,
    },
  ];

  if (role === USER_ROLE.AGENT) return agentSidebarItem;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
