const decryptGrade = (encryptedGrade) => {
    let encryptedGradeSubstring = encryptedGrade.substring(1, 3);

    switch (encryptedGradeSubstring)
    {
        case "DE":
            return -1; // NSP
        case "^_":
            return -2; // DPI
    }

    let encryptedGradeCharacters = [...encryptedGradeSubstring];
    encryptedGradeCharacters = encryptedGradeCharacters.reverse();

    const decryptFirstDigit = (encryptedGradeCharacter) => {
        switch (encryptedGradeCharacter) {
            case "e":
                return 0;
            case "g":
                return 1;
            case "i":
                return 2;
            default:
                return 0;
        }
    }

    const decryptSecondDigit = (encryptedGradeCharacter) => {
        switch (encryptedGradeCharacter) {
            case "d":
                return 0;
            case "f":
                return 1;
            case "h":
                return 2;
            case "j":
                return 3;
            case "l":
                return 4;
            case "n":
                return 5;
            case "p":
                return 6;
            case "r":
                return 7;
            case "t":
                return 8;
            case "v":
                return 9;
            default:
                return 0;
        }
    }

    let decryptedGrade = 0;

    for (const [index, encryptedGradeCharacter] of encryptedGradeCharacters.entries()) {
        let multiplier = Math.pow(10, encryptedGradeCharacters.length - index - 1);

        switch (index) {
            case 0:
                decryptedGrade += decryptFirstDigit(encryptedGradeCharacter) * multiplier;

                break;
            case 1:
                decryptedGrade += decryptSecondDigit(encryptedGradeCharacter) * multiplier;

                break;
            default:
                break;
        }
    }

    return decryptedGrade;
}
