import logo from "../../assets/logo.svg";

export default function FooterView() {
  return (
    <>
      <footer className="mt-12">
        <div className="flex justify-between items-center gap-2 bg-cyan-300 h-24">
          <div className="mx-20">
            <a
              className="flex items-center text-cyan-950 tracking-tighter text-2xl italic font-serif font-semibold"
              href="#">
              <img className="w-12" src={logo} alt="Seek" />
              Seek
              <i
                className="fa-brands fa-searchengin mx-2 my-6"
                style={{ color: "#354545" }}></i>
            </a>
          </div>
          <h1 className="text-slate-600">
            created by
            <span className="text-blue-500 text-xl">
              {" "}
              M.G. Arma Yoga Pratama
            </span>{" "}
            | all right reversed!
          </h1>

          <div className="mx-20">
            <a
              className="hover:text-xl"
              href="http://github.com/armayogapratama">
              <i className="fa-brands fa-github fa-xl mx-2"></i>
            </a>
            <a
              className="hover:text-xl"
              href="http://linkedin.com/in/arma-yoga-pratama">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
            <a className="hover:text-xl" href="http://instagram.com/gansss_18">
              <i className="fa-brands fa-instagram fa-xl mx-2"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
