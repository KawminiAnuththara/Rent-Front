import { createClient } from "@supabase/supabase-js";

const anon_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjb3lvcHZndWVoeWJ2dWNnbm5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDEzMjEsImV4cCI6MjA1NTc3NzMyMX0.rXzq8sr2c1r2gbxGs-nU4w-d5WXo0gIsG1rf5AEctDM";
const supabase_url = "https://ccoyopvguehybvucgnnc.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {

   if(file == null){
      reject("No file selected")
   }
    const timestamp = new Date().getTime();
    const fileName = timestamp + file.name;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;
        resolve(publicUrl);
      }).catch(()=>{
         reject("Error uploading file")
      })
  });
}
