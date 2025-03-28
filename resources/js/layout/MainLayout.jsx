import Header from "../Components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;