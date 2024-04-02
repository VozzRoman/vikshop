import { FC, useState } from 'react';
interface StartRatingProp {
	item: number
}


const StarRating: FC<StartRatingProp> = ({item}) => {
  const [currentRating, setCurrentRating] = useState(item);

  const handleClick = (index: number) => {
    setCurrentRating(index);
  };

  return (
    <div className='pl-[20px] pr-[20px]'>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={`cursor-pointer text-2xl ${
            index <= currentRating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => handleClick(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;