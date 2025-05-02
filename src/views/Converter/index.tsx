import { useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
/*import { Duration, parse } from "iso8601-duration";*/

import styles from "./index.module.css";


const EMPTY_VAL = "P1DT3H10S";

type FormatItem = {
    key: string,
    name: string,
    matcher: RegExp,
};
export const FORMAT_LARGE: FormatItem[] = [
    { key: "Y", name: "years", matcher: /(\d+)Y/ },
    { key: "M", name: "months", matcher: /(\d+)M/ },
    { key: "W", name: "weeks", matcher: /(\d+)W/ },
    { key: "D", name: "days", matcher: /(\d+)D/ },
];
export const FORMAT_SMALL: FormatItem[] = [
    { key: "H", name: "hours", matcher: /(\d+)H/ },
    { key: "M", name: "minutes", matcher: /(\d+)M/ },
    { key: "S", name: "seconds", matcher: /(\d+(?:\.\d+)?)S/ },
];


export const Converter = () => {
    const [ptVal, setPtVal] = useState("");
    const [humanVal, error] = useMemo(() => {
        // Replace empty values with our template
        // TODO: Or not? Is this annoying or intuitive?
        let val = (ptVal && ptVal.length) ? ptVal : EMPTY_VAL;

        // Ensure the value starts with a P
        if (!val.startsWith("P")) {
            return [null, "Duration must start with 'P'"];
        }

        // Split over T
        val = val.slice(1);
        const valPieces = val.split("T");

        if (valPieces.length === 1) {
            return [null, "Duration must include 'T'"];
        }
        if (valPieces.length !== 2) {
            return [null, "Duration must contain exactly one 'T'"];
        }

        // Parse the pieces into a string
        const parts: string[] = [];
        // TODO: Rules to consider for different versions (ie the weeks rule)

        const parseGroup = (piece: string, format: FormatItem[]) => {
            for (const item of format) {
                const match = piece.match(item.matcher);

                if (!match) {
                    continue;
                }
                if (match.index !== 0) {
                    return `Wrong order or unexpected text: '${piece.slice(0, match.index)}'`;
                }

                piece = piece.slice(match[0].length);
                const count = parseFloat(match[1]);
                parts.push(`${count} ${count === 1 ? item.name.slice(0, -1) : item.name}`);
            }

            if (piece.length) {
                return `Extra data: '${piece}'`;
            }
        };

        let err;
        if ((err = parseGroup(valPieces[0], FORMAT_LARGE)) !== undefined) return [null, err];
        if ((err = parseGroup(valPieces[1], FORMAT_SMALL)) !== undefined) return [null, err];

        //return "Every three years, six months, four days, twelve hours, thirty minutes, and five seconds.";
        switch (parts.length) {
            case 0:
                return [null, "Duration is zero"];
            case 1:
                return [`Every ${parts[0]}`, null];
            case 2:
                return [`Every ${parts[0]} and ${parts[1]}`, null];
            default:
                parts[parts.length - 1] = `and ${parts[parts.length - 1]}`;
                return [`Every ${parts.join(", ")}`, null];
        }
    }, [ptVal]);

    if (error) {
        console.error(error);
    }

    return (
        <div className={styles.container}>
            <div className={styles.result}>
                { humanVal && <div className={styles.human}>{humanVal}</div> }
                { error && <div className={styles.error}>{error}</div> }
            </div>
            <Form.Control
                className={styles.input}
                placeholder={EMPTY_VAL}
                value={ptVal}
                onChange={ (e) => setPtVal(e.target.value) }
            />
        </div>
    );
};

export default Converter;
