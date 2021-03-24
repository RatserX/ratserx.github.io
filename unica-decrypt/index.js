const listener = () => {
    ["input"].forEach((type) => {
        document.getElementById("encrypted-grade").addEventListener(type, (event) => {
            const encryptedGrade = event.target.value;
            document.getElementById("decrypted-grade").value = decryptGrade(encryptedGrade);
        })
    })
}

const main = () => {
    listener();
}

main();
