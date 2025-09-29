import Image from "next/image";

const Dashboard = () => {
  return (
    <div>
      <div>
          <Image src="/image/geraiFull.jpg" className="w-screen object-center object-cover" alt="banner" width={1000} height={1000}/>
      </div>
    </div>
  );
};

export default Dashboard;