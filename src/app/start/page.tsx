'use client';
import { useSearchParams } from "next/navigation";
import { Door, Doors } from './types';
import { useEffect, useRef, useState } from "react";
import DoorDisplay from "../components/DoorDisplay/DoorDisplay";
import styles from './page.module.css';
import { steps } from './data';

const StartGame = () => {
    const searchParams = useSearchParams();
    const numberOfDoors = searchParams.get("doors");
    const [doors, setDoors] = useState<Doors>([]);
    const [step, setStep] = useState(0);
    const [foundPrize, setFoundPrize] = useState(false);
    const [wrongDoor, setWrongDoor] = useState(false);
    const [initialDoorLabel, setInitialDoorLabel] = useState(0);
    const [switchedDoors, setSwitchedDoors] = useState<boolean>(false);
    const resultRef = useRef<HTMLHeadingElement | null>(null);

    const getRandomNumberInRange = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleFirstSelection = (chosenDoor: Door) => {
        setStep(1);
        setInitialDoorLabel(chosenDoor.label);
        if (chosenDoor.hasPrize) {
            const doorsWithNoPrize = doors.filter((door: Door) => door.label !== chosenDoor.label);
            const randomIndex = Math.floor(Math.random() * doorsWithNoPrize.length);
            const doorToKeepClosed = doorsWithNoPrize[randomIndex];

            // Update doors based on the logic
            const updatedDoors = doors.map((door: Door) => {
                if (door.label === chosenDoor.label) {
                    // Mark the chosen door
                    return { ...door, isInitialChoice: true };
                }
                if (door.label === doorToKeepClosed.label) {
                    // Leave this door closed
                    return { ...door, isOpen: false, isSelectable: true };
                }
                // Open all other doors without a prize
                return { ...door, isOpen: true, isSelectable: false };
            });
            console.log(updatedDoors);
            setTimeout(() => {
                setDoors(updatedDoors);
                setStep(2);
            }, 3000);
            return;
        }
        const updatedDoors = doors.map((door: Door) => {
            if (chosenDoor.label === door.label) {
                return { ...door, isInitialChoice: true }
            }
            else if (!door.hasPrize) {
                return { ...door, isOpen: true, isSelectable: false }
            }
            else {
                return { ...door }
            }
        });
        setTimeout(() => {
            setDoors(updatedDoors);
            setStep(2);
        }, 3000);
    }

    const handleSecondSelection = (chosenDoor: Door) => {
        setSwitchedDoors(chosenDoor.label !== initialDoorLabel);
        if (chosenDoor.hasPrize) {
            setFoundPrize(true);
        }
        else {
            setWrongDoor(true);
        }
        const updatedDoors = doors.map((door: Door) => (
            {...door, isSelectable: false}
        ))
        setDoors(updatedDoors);
    }

    useEffect(() => {
        const doors: Doors = [];
        const prizeIndex = getRandomNumberInRange(0, Number(numberOfDoors) - 1);
        for (let i = 0; i < Number(numberOfDoors); i++) {
            let door: Door = {
                label: i + 1,
                hasPrize: i === prizeIndex,
                isSelectable: true,
                isOpen: false,
                isInitialChoice: false
            }
            doors.push(door);
        }
        setDoors(doors);
    }, [numberOfDoors]);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }, [wrongDoor, foundPrize]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{steps[step].message}</h2>
            {doors && step === 0 && <DoorDisplay doors={doors} handleSelection={handleFirstSelection} />}
            {doors && step === 2 && <DoorDisplay doors={doors} handleSelection={handleSecondSelection} />}
            {foundPrize && <h3 className={styles.success}>You found the prize!</h3>}
            <h3 className={styles.failure} ref={resultRef}>
                {wrongDoor
                    ? switchedDoors
                        ? "Wrong choice! You should have kept your original door!"
                        : "Wrong choice! You should have switched doors!"
                    : ""}
            </h3>
        </div>
    )
}
export default StartGame;