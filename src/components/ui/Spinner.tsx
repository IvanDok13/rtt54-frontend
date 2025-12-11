import notFoundGif from '../../../public/img/404.gif';

export default function Spinner() {
  return (
    <div
      className='min-h-screen p-6 relative
        bg-[#0a0f0a] text-[#00ff88]
        font-mono'
    >
      <div className='flex flex-col items-center justify-center mt-20'>
        <h1 className='text-4xl mb-6 font-bold tracking-widest flex items-center gap-2 drop-shadow-[0_0_6px_#00ff88]'>
          Loading...
        </h1>
        <img
          src={notFoundGif}
          alt='Loading animation'
          className='w-[300px] rounded-lg shadow-lg mb-8'
        />
      </div>
    </div>
  );
}
