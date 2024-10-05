"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [numberOfDoors, setNumberOfDoors] = useState<number>(3);
  const [doorWarning, setDoorWarning] = useState<boolean>(false);
  const [disablePlayButton, setDisablePlayButton] = useState<boolean>(true);
  const router = useRouter();

  const handleDoorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoorWarning(false);
    const { value } = e.target;
    const n = Number(value);
    if (n && n >= 3 && n <= 20) {
      setNumberOfDoors(n);
      setDisablePlayButton(false);
    }
    else {
      setDoorWarning(true);
      setDisablePlayButton(true);
    }
  }

  const handleStartGame = () => {
    if (!disablePlayButton) {
      const url = "/start?doors=" + numberOfDoors;
      router.push(url);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.optionsContainer}>
        <h1 className={styles.title}>Play game!</h1>
        <div className={styles.options}>
          <div className={styles.option}>
            {doorWarning && <span className={styles.warning}>Please enter a valid number between 3 and 20</span>}
            <input
              name="doors"
              type="text"
              className={styles.doorInput}
              placeholder="Enter number of doors"
              onChange={handleDoorChange}
              autoComplete="off"
            />
          </div>
          <div className={styles.option}>
            <div className={`${disablePlayButton ? styles.disabledButton : styles.playButton}`} onClick={handleStartGame}>Start game</div>
          </div>
        </div>
      </div>
    </div>
  );
}
