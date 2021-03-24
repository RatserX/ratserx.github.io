const listener = () => {
    ["input"].forEach((type) => {
        document.getElementById("encrypted-grade").addEventListener(type, (event) => {
            const encryptedGrade = event.target.value;
            const decryptedGrade = decryptGrade(encryptedGrade);

            switch (decryptedGrade)
            {
                case -2:
                    decryptedGrade = "DPI";

                    break;
                case -1:
                    decryptedGrade = "NSP";

                    break;
            }

            document.getElementById("decrypted-grade").value = decryptedGrade;
        })
    })
}

const main = () => {
    listener();
}

main();
