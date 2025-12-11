export function HomePage() {
  return (
    <div
      className='min-h-screen p-6 relative
        bg-[#0a0f0a] text-[#00ff88]
        font-mono flex flex-col items-center justify-center'
    >
      <h1 className='text-4xl mb-6 font-bold tracking-widest flex items-center gap-2 drop-shadow-[0_0_6px_#00ff88]'>
        Home Page
      </h1>

      <img
        className='w-[700px] rounded-lg shadow-lg mb-8'
        src='https://v1rt.ru/upload/medialibrary/e0a/e0a3a65d322114dec8715f5e377bd79c.gif'
        alt='John Travolta'
      />

      <p className='text-center max-w-xl absolute backdrop-blur-lg bg-black/30 p-4 rounded bottom-20'>
        Your advertisement could have been here, but eventually there will be a
        page here
      </p>
    </div>
  );
}
