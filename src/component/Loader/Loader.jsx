import st from "./Loader.module.scss";

function Loader() {
  return (
    <div className={st.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
