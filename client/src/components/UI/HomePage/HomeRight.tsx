import { Alert } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import walletIcon from "../../../assets/wallet.png";
import { IUser } from "@/types";

type IProps = {
  userData: IUser;
};

const HomeRight = ({ userData }: IProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const handleBalanceClick = () => {
    setIsBalanceVisible(true);
    setTimeout(() => {
      setIsBalanceVisible(false);
    }, 5000);
  };

  return (
    <div>
      <div className="p-2">
        <h1 className="text-xl font-bold">{userData?.name}</h1>
        <p>{userData?.email}</p>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <Image width={70} src={walletIcon} alt="wallet image" />
        <div>
          <h2>Your Balance</h2>
          <p
            className={`text-2xl font-bold`}
            onClick={handleBalanceClick}
            style={{ cursor: "pointer" }}
          >
            <strong>
              &#2547;{" "}
              <span
                className={`${
                  isBalanceVisible
                    ? "blur-0 duration-200"
                    : "blur-sm duration-200"
                }`}
              >
                {userData?.balance?.toFixed(2)}
              </span>
            </strong>
          </p>
        </div>
      </div>
      <div className="my-2">
        <Alert
          message={`Your account is ${userData?.status}`}
          type={userData?.status === "active" ? "success" : "warning"}
          showIcon
        />
      </div>
      <div>
        <h2 className="text-lg font-bold mt-4">My Card</h2>
        <div className="w-64 h-40 bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 rounded-lg shadow-lg">
          <div className="flex justify-between m-2 pt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <line x1="7" y1="15" x2="7.01" y2="15" />
              <line x1="11" y1="15" x2="13" y2="15" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="9.5" cy="9.5" r="5.5" fill="#fff" />
              <circle cx="14.5" cy="14.5" r="5.5" />
            </svg>
          </div>
          <div className="flex justify-end mt-4 mr-5">
            <div className="card-chip"></div>
            <h1 className="text-gray-400 font-os text-xl tracking-widest font-bold select-none">
              {userData?.mobile?.replace(/(.{5})/g, "$1 ")}
            </h1>
          </div>
          <div className="flex flex-col justfiy-end mt-4 p-4 text-gray-400 font-quick">
            <h4 className="uppercase tracking-wider font-semibold text-xs select-none">
              {userData?.name}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
