import { MenuProps } from "antd";
import {
  TableOutlined,
  WifiOutlined,
  CarryOutOutlined,
  FormOutlined,
  AccountBookOutlined,
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
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: <Link href={`/${role}/services`}>Services</Link>,
      icon: <WifiOutlined />,
      key: `/${role}/services`,
    },
    {
      label: <Link href={`/${role}/manage-booking`}>Manage Booking</Link>,
      icon: <FormOutlined />,
      key: `/${role}/manage-booking`,
    },
    {
      label: <Link href={`/${role}/payments`}>Payments Data</Link>,
      icon: <AccountBookOutlined />,
      key: `/${role}/payments`,
    },
    {
      label: <Link href={`/${role}/manage-review`}>Manage Review</Link>,
      icon: <FormOutlined />,
      key: `/${role}/manage-review`,
    },
    {
      label: <Link href={`/${role}/manage-faq`}>Manage FAQ</Link>,
      icon: <FormOutlined />,
      key: `/${role}/manage-faq`,
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
  ];

  if (role === USER_ROLE.AGENT) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
