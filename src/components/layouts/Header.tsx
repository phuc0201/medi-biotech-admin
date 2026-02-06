import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <header
      id="main-header"
      style={{
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
      className="bg-white flex items-center justify-between px-6! py-3!"
    >
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-10 h-10 object-cover" />
        <span className="ml-2 font-semibold">Medi Biotech</span>
      </div>
      <div>Trịnh Hoàng Phúc</div>
    </header>
  );
}
