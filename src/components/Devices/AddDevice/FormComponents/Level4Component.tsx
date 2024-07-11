import Image from "next/image";
import styles from "./Level2Component.module.css";

const Level4Component = () => {
  let fanSettings = {
    label: " ",
    type: "select",
    options: ["None", "Fixed ON", "Temprerature"],
    name: "",
  };
  const handleChange = () => {};
  return (
    <>
      <form className={styles.form}>
        <section className={styles.formSection}>
          <div>
            <img className={styles.arroIcon} alt="" src="/car-radiator.svg" />
          </div>
          <div className={styles.fieldGroup}>
            <select
              className={styles.select}
              onChange={handleChange}
              name={fanSettings.name}
            >
              {fanSettings.options?.map((option: any) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </section>
      </form>
    </>
  );
};
export default Level4Component;
