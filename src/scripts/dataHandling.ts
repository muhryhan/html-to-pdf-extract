/**
 * Mengencode string HTML menjadi format Base64.
 * 
 * @param htmlString - String HTML yang akan diencode.
 * @returns String yang berisi representasi Base64 dari htmlString.
 */
function encodeToBase64(htmlString: string): string {
  return btoa(unescape(encodeURIComponent(htmlString)));
}

/**
 * Menyimpan data HTML yang telah diencode ke server.
 * Mengambil nilai dari textarea dengan id 'encodedHtml' dan mengirimnya 
 * ke endpoint '/save-data' menggunakan metode POST.
 * 
 * @returns void
 */
function saveData(): void {
  const encodedHtml = (document.getElementById("encodedHtml") as HTMLInputElement).value;
  
  fetch("/save-data", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ encodedHtml }),
  })
      .then((response) => response.json())
      .then((data: { message?: string }) => {
          if (data.message) {
              window.open("/view-decoded-html", "_blank");
          }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
}

/**
 * Mengunduh PDF dengan mengarahkan pengguna ke endpoint '/generate-pdf-get'.
 * 
 * @returns void
 */
function downloadPdf(): void {
  window.location.href = "/generate-pdf-get"; // Mengubah lokasi ke URL PDF
}

// Menambahkan fungsi ke objek window agar dapat diakses di luar modul
declare global {
  interface Window {
      saveData: () => void; // Deklarasi fungsi saveData di objek window
      downloadPdf: () => void; // Deklarasi fungsi downloadPdf di objek window
      encodeToBase64: (htmlString: string) => string; // Deklarasi fungsi encodeToBase64 di objek window
  }
}

// Mengaitkan fungsi ke objek window
window.saveData = saveData;
window.downloadPdf = downloadPdf;
window.encodeToBase64 = encodeToBase64;

export {};
