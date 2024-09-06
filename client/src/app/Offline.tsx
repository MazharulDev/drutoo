import Image from "next/image";
import OfflineIcon from "../assets/offline.png";

const Offline = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Image src={OfflineIcon} width={500} height={500} alt="offline" />
    </div>
  );
};

export default Offline;
