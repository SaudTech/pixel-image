export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-start lg:p-24 ">
        <div className="mb-2 text-center">
          <h1 className="text-4xl font-black">Pixel Magic</h1>
          <p>Fastest way to edit your images</p>

          <div className="mt-10">
            <a
              href="/blur-image"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Blur Image
            </a>
            <a
              href="/convert-image"
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4"
            >
              Convert Image
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
