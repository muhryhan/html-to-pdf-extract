/**
 * Fungsi untuk mengekstrak semua informasi nomor registrasi, diagnosa, dan tindakan dari teks
 * @param text Teks hasil ekstraksi
 * @returns Daftar informasi nomor registrasi, diagnosa, dan tindakan dalam format yang diinginkan
 */
export function extractImportantInfo(text: string): string {
    const registrationNumbers = extractRegistrationNumbers(text);
    // const diagnoses = extractDiagnoses(text);
    // const actions = extractActions(text);

    // Gabungkan nomor registrasi, diagnosa, dan tindakan dalam format yang diinginkan
    let result = "Nomor Registrasi : \n";
    const maxLength = Math.max(registrationNumbers.length);
    
    for (let i = 0; i < maxLength; i++) {
        result += `${registrationNumbers[i] || 'Not found'}`;
    }

    return result;
}

/**
 * Ekstrak semua nomor registrasi dari teks
 * @param text Teks yang akan diproses
 * @returns Daftar nomor registrasi yang ditemukan
 */
function extractRegistrationNumbers(text: string): string[] {
    // Regex untuk mencari nomor registrasi yang memiliki pola tertentu
    const regNumberRegex = /(?:\d+[\s])?([A-Za-z0-9\-\/]+)[\s]*(?=RUANG|PENANGGUNG)/gi;
    const matches = [];
    let match;
    while ((match = regNumberRegex.exec(text)) !== null) {
        matches.push(match[1]);
    }
    return matches;
}

// /**
//  * Ekstrak semua diagnosa dari teks
//  * @param text Teks yang akan diproses
//  * @returns Daftar diagnosa yang ditemukan
//  */
// function extractDiagnoses(text: string): string[] {
//     // Regex untuk mencari diagnosa setelah kata kunci 'DIAGNOSA'
//     const diagnosisRegex = /DIAGNOSA[\s:]*([A-Za-z\s\-0-9\.\,]+)/gi;
//     const matches = [];
//     let match;
//     while ((match = diagnosisRegex.exec(text)) !== null) {
//         matches.push(match[1].trim());
//     }
//     return matches;
// }

// /**
//  * Ekstrak semua tindakan dari teks
//  * @param text Teks yang akan diproses
//  * @returns Daftar tindakan yang ditemukan
//  */
// function extractActions(text: string): string[] {
//     // Regex untuk mencari tindakan setelah kata kunci 'TINDAKAN'
//     const actionRegex = /TINDAKAN[\s:]*([A-Za-z\s\-0-9\.\,]+)/gi;
//     const matches = [];
//     let match;
//     while ((match = actionRegex.exec(text)) !== null) {
//         matches.push(match[1].trim());
//     }
//     return matches;
// }