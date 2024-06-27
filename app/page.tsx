import ImageEditor from "@/components/ImageEditor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="mb-2 text-center">
        <h1 className="text-4xl font-black">Pixel Magic</h1>
        <p>Upload an image and start editing!</p>
      </div>
      <ImageEditor />
    </main>
  );
}
