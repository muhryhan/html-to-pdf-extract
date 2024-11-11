async function uploadFile(): Promise<void> {
    // Mendapatkan elemen input file
    const fileInput = document.getElementById("fileUpload") as HTMLInputElement;
    const file = fileInput?.files?.[0];
  
    if (!file) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
  
    // Mengatur FormData dengan file yang diunggah
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      // Mengirim permintaan ke server untuk melakukan ekstraksi
      const response = await fetch("/upload-receive-extract", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        // Menampilkan hasil ekstraksi ke dalam elemen HTML
        const extractionResults = document.getElementById("extractionResults") as HTMLElement;
        extractionResults.textContent = data.extractedData || "Ekstraksi berhasil namun data kosong.";
      } else {
        throw new Error("Gagal mengunggah file atau melakukan ekstraksi.");
      }
    } catch (error: any) {
      console.error("Error:", error);
      const extractionResults = document.getElementById("extractionResults") as HTMLElement;
      extractionResults.textContent = "Error: " + error.message;
    }
  }
  
  // Menambahkan fungsi ke objek window agar dapat diakses di luar modul
  declare global {
    interface Window {
      uploadFile: () => void;
    }
  }
  
  // Mengaitkan fungsi ke objek window
  window.uploadFile = uploadFile;
  
  export {};  