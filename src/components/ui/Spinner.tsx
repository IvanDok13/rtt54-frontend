import notFoundGif from '../../../public/img/404.gif';

export default function Spinner() {
  return (
    <div className='flex justify-center p-6 text-center'>
      <img
        src={notFoundGif}
        alt='Loading animation'
        className='w-[300px] rounded-lg shadow-lg mb-8'
      />
    </div>
  );
}
