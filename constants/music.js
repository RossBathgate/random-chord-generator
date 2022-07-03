const Music = {
    notes: [
        { letter: "A", features: ["", "#", "♭"] },
        { letter: "B", features: ["", "♭"] },
        { letter: "C", features: ["", "#"] },
        { letter: "D", features: ["", "#", "♭"] },
        { letter: "E", features: ["", "♭"] },
        { letter: "F", features: ["", "#"] },
        { letter: "G", features: ["", "#", "♭"] },
    ],
    chords: [
        { number: "6", types: ["major", "minor"] },
        {
            number: "7",
            types: [
                "major",
                "minor",
                "diminished",
                "dominant",
                "augmented",
                "sus4",
                "half_diminished",
            ],
        },
        {
            number: "9",
            types: [
                "major",
                "minor",
                "diminished",
                "dominant",
                "augmented",
                "sus4",
                "half_diminished",
            ],
        },
        // { number: "11", types: ["major", "minor", "diminished", "dominant"] },
        // { number: "13", types: ["major", "minor", "diminished", "dominant"] },
    ],
    displayTypes: {
        major: ["maj", "Δ", "M"],
        minor: ["m", "-"],
        dominant: [""],
        diminished: ["°"],
        augmented: ["+"],
        sus4: ["(sus4)"],
        half_diminished: ["(♭5)"],
    },
};

export default Music;
