"use client";
import Image from "next/image";
import { Doors, Door } from "../../start/types";
import styles from './DoorDisplay.module.css';

type Props = {
    doors: Doors,
    handleSelection: (door: Door) => void
}

const DoorDisplay = ({ doors, handleSelection }: Props) => {
    const solution = doors.filter((door: Door) => door.hasPrize);
    console.log("Prize, door-", solution[0]?.label);
    console.log("Doors in DoorDisplay: ", doors);

    const toggleClick = (door: Door) => {
        if (door.isSelectable) {
            handleSelection(door);
        }
    }

    return (
        <div className={styles.container}>
            {doors.map((door: Door) => (
                <div key={door.label} className={styles.doorContainer}>
                    <Image
                        alt=""
                        src={door.isOpen ? "/images/door_open.png": "/images/door_closed.jpg"}
                        width={100}
                        height={150}
                        className={`${styles.doorImage} ${door.isInitialChoice && styles.highlight} ${!door.isSelectable && styles.notSelectable}`}
                        onClick={() => toggleClick(door)}
                    />
                </div>
            ))}
        </div>
    )
}
export default DoorDisplay;